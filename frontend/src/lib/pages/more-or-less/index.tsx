import { useCallback, useEffect, useRef, useState } from "react";
import { SteamPunkFrame, Wheel } from '@/assets/images'
import { OptionButton } from "@/lib/layout/components/option-button";
import { GameSelection } from "./components/game-selection";
import { StakeSelection } from "@/lib/layout/components/stake-selection";
import CustomButton from "@/lib/layout/components/custom-button";
import { CashedOutModal } from "../bomb/components/cashed-out-modal";
import { HistoryModal } from "./components/history-modal";
import { LostModal } from "./components/lost-modal";
import type { MoreLessGameHistory, GameOption } from "@/../interfaces";

const MoreOrLessPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stake, setStake] = useState<number>(10_000);
  const [option, setOption] = useState<GameOption | null>(null);
  // Number that is chosen at start of game
  const [knownNumber, setKnownNumber] = useState<number>(0);
  const [numberToGuess, setNumberToGuess] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [gamesHistory, setGamesHistory] = useState<MoreLessGameHistory[]>([] as MoreLessGameHistory[]);
  const [lost, setLost] = useState<boolean>(false);

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isCashedOutModalOpen, setIsCashedOutModalOpen] = useState<boolean>(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState<boolean>(false);

  const numberToGuessRef = useRef<HTMLSpanElement | null>(null);
  const numberToGuessContainerRef = useRef<HTMLSpanElement | null>(null);
  const wheelRef = useRef<HTMLImageElement | null>(null);
  const wheelCenterRef = useRef<HTMLDivElement | null>(null);
  // Only allow selecting option when known number has loaded
  const [canSelectOption, setCanSelectOption] = useState<boolean>(false);

  const OPTIONS = { even: "ЧЁТ", lt: "<", eq: "=", gt: ">", odd: "НЕЧЁТ" };
  const moreOrLessUrl = `${import.meta.env.VITE_API_BASE_URL}/more-or-less`;

  const startGame = (selectedOption: GameOption) => {
    // Disallow selecting new option until later on, when result of game is known
    setCanSelectOption(false);
    numberToGuessContainerRef!.current.classList.remove('border-peach');

    console.log('option:', selectedOption);

    makeElementCounter(numberToGuess, numberToGuessRef.current, false, selectedOption);

    console.log('To evaluate game');
  }

  const openCashedOutModal = () => {
    setIsCashedOutModalOpen(true);
  }

  const openHistoryModal = () => {
    console.log('opening history modal')
    setIsHistoryModalOpen(true);
  }

  /**
   * This function will also be passed to `CashedOutModal`.
   */
  const resetGame = () => {
    // 2 - 98, to allow for `lt` and `gt` options
    setKnownNumber(Math.floor(Math.random() * (98 - 2 + 1)) + 2);
    // 1 - 99
    setNumberToGuess(Math.floor(Math.random() * 99) + 1);
    setLost(false);
    numberToGuessRef.current!.classList.add("opacity-25");
    numberToGuessRef.current!.innerText = "?";
    wheelCenterRef.current!.classList.remove("block");
    wheelCenterRef.current!.classList.add("hidden");
    wheelCenterRef.current!.classList.remove("bg-red-500");
    wheelCenterRef.current!.classList.remove("bg-limegreen");
    wheelCenterRef.current!.classList.add("bg-peach");
    numberToGuessContainerRef.current!.classList.remove("border-red-500");
    numberToGuessContainerRef.current!.classList.remove("border-limegreen");
    numberToGuessContainerRef.current!.classList.add("border-peach");
  }

  /**
   * Send game stats to the API.
   */
  const sendGameStats = async (selectedOption: GameOption, won: boolean, multiplier: number) => {
    const response = await fetch(moreOrLessUrl, {
      method: 'POST',
      body: JSON.stringify({
        known: knownNumber,
        option: selectedOption,
        guessed: numberToGuess,
        stake,
        multiplier,
        payoff: (stake * multiplier).toFixed(2)
      })
    });
  }

  const evaluateGame = async (selectedOption: GameOption) => {
    let won;

    switch (selectedOption) {
      case "even":
        won = numberToGuess % 2 === 0;
        break;
      case "lt":
        won = numberToGuess < knownNumber;
        break;
      case "eq":
        won = numberToGuess === knownNumber;
        break;
      case "gt":
        won = numberToGuess > knownNumber;
        break;
      case "odd":
        won = numberToGuess % 2 === 1;
        break;
      default:
        console.error('Unknown option');
    }

    console.log('Won game:', won);
    // Get multiplier for selected option
    const selectedOptionIndex = Object.keys(OPTIONS).indexOf(selectedOption);
    // `slice(1)` since it starts with `x`
    const newMultiplier = document.getElementsByClassName('selection-multiplier')[selectedOptionIndex].innerText.slice(1);
    setMultiplier(newMultiplier);
    sendGameStats(selectedOption, won, newMultiplier);

    if (won) {
      numberToGuessContainerRef.current!.classList.add('border-limegreen');
      wheelCenterRef.current!.classList.add('bg-limegreen');
      console.log('New multiplier:', newMultiplier);
      await wait(700);
      openCashedOutModal();
    } else {
      numberToGuessContainerRef.current!.classList.add('border-red-500');
      wheelCenterRef.current!.classList.add('bg-red-500');
      setLost(true);
      await wait(700);
      console.log('opening lost modal')
      setIsLostModalOpen(true);
    }

    setCanSelectOption(true);
  }

  /**
   * 
   * Change inner text and styling of wheel center upon spin start.
   * @param {GameOption} selectedOption
   */
  const changeWheelCenterStyle = (selectedOption: GameOption) => {
    wheelRef.current!.classList.add("spin-wheel");
    wheelCenterRef.current!.classList.remove("hidden");
    wheelCenterRef.current!.classList.add("block");
    console.log('text will be:', OPTIONS[selectedOption]);
    wheelCenterRef.current!.getElementsByTagName("div")[0].innerText = OPTIONS[selectedOption];
  }

  /**
   * Set multipliers for options, depending of known number
   * (e.g. high number will have high odds for `lt` and low for `gt`)
   */
  const setMultipliers = () => {
    console.log('SETTING MULTIPLIERS');
    const optionSelectionElements = document.getElementsByClassName('selection-multiplier');
    const [ltElement, gtElement] = [optionSelectionElements[1], optionSelectionElements[3]];
    const probLess = (knownNumber - 1) / 99;
    // If odds is at `1.05` or less, don't reduce odds
    // Adding `+0.01` to avoid `1.00` odds
    let newProb = (1 / probLess - 0.05) >= 1 ? (1 / probLess - 0.05) + 0.01 : 1 / probLess;
    const oddsLess = newProb.toFixed(2); // With bookie -0.05

    // Calculate probability for greater than knownNumber
    const probGreater = (99 - knownNumber) / 99;
    const k = 1 / probGreater - 0.05;
    // Adding `+0.01` to avoid `1.00` odds
    newProb = (1 / probGreater - 0.05) >= 1 ? (1 / probGreater - 0.05) + 0.01 : 1 / probGreater;
    const oddsGreater = newProb.toFixed(2); // With bookie -0.05

    console.log(`Odds for number less than ${knownNumber}: ${oddsLess}`);
    console.log(`Odds for number greater than ${knownNumber}: ${oddsGreater}`);

    ltElement.innerText = `x${oddsLess}`;
    gtElement.innerText = `x${oddsGreater}`;
  }

  /**
   * Update the counter (can run either the one known at start or
   * the one selected via option).
   * 
   * @param {number} num - Number to compare with
   * (either `knownNumber` or `numberToGuess`).
   * @param {HTMLSpanElement} element - element whose `innerText` to update.
   * @param {isKnown} - Whether to update `knownNumber` or `numberToGuess` and their
   * respective UI `innerText`. Defaults to true.
   * @param {GameOption} [selectedOption]
   */
  const makeElementCounter = (num: number, element: HTMLSpanElement, isKnown: boolean = true, selectedOption) => {
    let k = 1;
    // Start spin for guessing number
    if (!isKnown) {
      changeWheelCenterStyle(selectedOption);

      // Visual effect on guessed number to appear fully brighted
      element.classList.remove("opacity-25");
    }

    const incrementCounter = () => {
      // Slower speed when closer to target
      const diff = num - k;
      const ms = diff < 3 ? 310 : diff < 7 ? 100 : diff < 15 ? 15 : 7;

      if (k < num) {
        element.innerText = ++k;

        // Call `incrementCounter` again after a delay
        setTimeout(incrementCounter, ms);
      } else {
        // Finished picking number
        console.log('wheel:', wheelRef.current)
        wheelRef.current!.classList.remove("spin-wheel");

        if (isKnown) {
          setCanSelectOption(true);
        } else {
          // Finished picking number
          // Since `setTimeout` is asynchronous, must be called inside of this function,
          // and after `incrementCounter` loops
          evaluateGame(selectedOption);
          console.log('wheel center:', wheelCenterRef.current)
          //wheelCenterRef.current!.classList.remove("block");
          //wheelCenterRef.current!.classList.add("hidden");


        }
      }
    };

    // Start the counter
    incrementCounter();
  }

  /**
   * Prevent stake from going over 1 000 000.
   */
  const increaseStake = () => {
    if (stake < 1_000_000) {
      setStake((prevStake: number) => prevStake + 10_000)
    }
  }

  /**
   * Prevent stake from going below 10 000.
   */
  const decreaseStake = () => {
    if (stake > 10_000) {
      setStake((prevStake: number) => prevStake - 10_000);
    }
  }

  /**
   * Create counter for the known number (from 1 to its value).
   */
  const makeKnownNumberCounter = useCallback(async (node) => {

    // Wait for `useEffect` to update `knownNumber`, also, although refs are updated before `useEffect` which calls this function,
    // still it's good to be sure
    while (knownNumber === 0 || node === null) {
      await wait(5);
    }

    makeElementCounter(knownNumber, node);
  }, [knownNumber]);

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    setKnownNumber(Math.floor(Math.random() * (98 - 2 + 1)) + 2);
    setNumberToGuess(Math.floor(Math.random() * 99) + 1);
  }, []);

  useEffect(() => {
    setMultipliers();
  }, [knownNumber]);

  useEffect(() => {
    const getGamesHistory = async () => {
      try {
        const response = await fetch(moreOrLessUrl);
        const historyResponse = await response.json();
        const history = historyResponse.data;
        console.log('Games history:', history);
        setGamesHistory(history);
      } catch (err) {
        console.error(err);
      }
    }

    getGamesHistory();
  }, []);

  /**
 * Close modal when wherever is clicked.
 */
  useEffect(() => {
    if (typeof (window) !== 'undefined') {
      window.addEventListener('click', (e: MouseEvent) => {
        // Don't close same time as opened (`CustomButton` clicked)
        if (!(Array.from(e.target.classList).includes('focus-visible:outline-2'))) {
          setIsHistoryModalOpen(false);
        }
      });
    }
  }, []);

  return (
    <>
      <section className="rounded-3xl bg-beige relative text-[#333] dark:text-black">
        <div className="flex-1 row flex-col min-h-[60vh] mt-12 lg:mt-20 xl:mt-28 2xl:mt-40">

          {/* Frame */}
          <div className="absolute -top-16 md:-top-24 2xl:-top-32 rounded-2xl text-uppercase frame-container flex items-center z-10">
            <img
              src={SteamPunkFrame}
              className="min-w-[10rem] w-[14rem] md:w-[22rem] 2xl:w-[24rem] z-10"
              alt="Header Frame"
            />
            <div className="absolute row min-h-[5rem] md:min-h-[8rem] lg:min-h-[10rem] min-w-[10rem] md:min-w-[14rem] 2xl:min-w-[17rem] px-5 uppercase left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-3xl lg:text-4xl bembo-semibold bg-[#D5CEC1]">More Less</div>
          </div>

          {/* Content */}
          <div className="flex-1 w-full flex flex-col text-dark dark:text-black md:mt-10 lg:mt-0">
            <h3 className="mt-20 md:mt-24 lg:mt-28 xl:mt-32 mb-3 text-center">СТАВКА</h3>
            <StakeSelection stake={stake} decreaseStake={decreaseStake} increaseStake={increaseStake} setStake={setStake} />
            <div className="grid grid-flow-col md:grid-flow-row grid-rows-2 md:grid-rows-1 md:grid-cols-2 w-fit my-10 mx-auto text-6xl bold bembo text-peach">
              <div ref={numberToGuessContainerRef} className="relative size-52 lg:size-[220px] 2xl:size-[240px] m-auto border-4 border-peach rounded-[1.25rem]">
                <div className="row size-full bg-gradient-to-b from-black via-[#3e342f] to-black rounded-2xl">
                  <span ref={numberToGuessRef} className="opacity-25">?</span>
                </div>
                <img
                  ref={wheelRef}
                  src={Wheel}
                  className="absolute block size-[105px] md:size-[120px] top-3/4 md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 left-1/2 md:left-3/4"
                  alt="Wheel"
                />
                <div
                  ref={wheelCenterRef}
                  className="absolute hidden size-[64px] md:size-[70px] top-[calc(75%+1.25rem)] md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 left-1/2 md:left-[calc(75%+1.5rem)] bg-peach text-dark dark:text-black rounded-full"
                >
                  <div className="row size-full text-lg bold" />
                </div>
              </div>
              <div className="row lg:size-[220px] 2xl:size-[240px] border-4 border-peach bg-gradient-to-b from-black via-[#3e342f] to-black rounded-2xl">
                <span ref={makeKnownNumberCounter}>1</span>
              </div>
            </div>
            <div className="w-3/5 md:w-[68%] mx-auto">
              <CustomButton type="button" onClick={() => openHistoryModal()} isFullWidth>История игр</CustomButton>
            </div>
            <div className={`wrapper grid grid-rows-5 md:grid-rows-1 md:grid-cols-5 md:space-x-2 space-y-5 md:space-y-0 ${!canSelectOption ? 'pointer-events-none' : 'pointer'}`}>
              <GameSelection onClick={() => startGame("even")} canSelectOption={canSelectOption} text="Чёт" multiplier={1.90} />
              <GameSelection onClick={() => startGame("lt")} canSelectOption={canSelectOption} text="&lt;" multiplier={1} />
              <GameSelection onClick={() => startGame("eq")} canSelectOption={canSelectOption} text="=" multiplier={96} />
              <GameSelection onClick={() => startGame("gt")} canSelectOption={canSelectOption} text="&gt;" multiplier={1} />
              <GameSelection onClick={() => startGame("odd")} canSelectOption={canSelectOption} text="Нечёт" multiplier={1.90} />
            </div>
          </div>
        </div>
        <CashedOutModal isOpen={isCashedOutModalOpen} setIsOpen={setIsCashedOutModalOpen} startGame={resetGame} multiplier={multiplier} payoff={Math.round(stake * multiplier)} isBombPage={false} />
        <LostModal isOpen={isLostModalOpen} setIsOpen={setIsLostModalOpen} startGame={resetGame} multiplier={multiplier} isBombPage={false} />
        <HistoryModal isOpen={isHistoryModalOpen} setIsOpen={setIsHistoryModalOpen} games={gamesHistory} />
      </section>
    </>
  )
}

export default MoreOrLessPage;
