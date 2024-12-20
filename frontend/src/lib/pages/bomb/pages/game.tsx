import { useEffect, useState } from "react";
import { BananaIcon, BombIcon } from "@/assets/images";
import CustomButton from "@/lib/layout/components/custom-button";
import { HistoryModal } from "../components/history-modal";
import { CashedOutModal } from "../components/cashed-out-modal";
import type { BombGameProps, GameHistory } from "@/../interfaces";
import '@/lib/styles/modal.css';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: strange complexity warning lint/correctness/noUnusedFunctionParameters: Passes it to modals
export const Game = ({ setIsSettingGame, stake, bombsAmount }: BombGameProps) => {
  /**
   * Starts a new game.
   */
  const startGame = (): void => {
    setFlipped(Array(5).fill(null).map(() => Array(5).fill(false)));
    setBombPositions(getBombPositions());
    setTotalGuesses(0);
    setPayoff(stake);
    setGameWasLost(false);
  }

  /**
   * Complete the game when ended successfully, by paying off.
   */
  const completeGame = async (): Promise<void> => {
    setIsLoading(true);

    await fetch(bombURL, {
      method: 'POST',
      body: JSON.stringify({
        bombs: bombsAmount,
        multiplier: multipliers[totalGuesses - 1],
        payoff
      })
    });

    setIsLoading(false);
    openCashedOutModal();
  }

  const [flipped, setFlipped] = useState(Array(5).fill(null).map(() => Array(5).fill(false)));
  const [bombPositions, setBombPositions] = useState<Array<number>>(Array(bombsAmount).fill(-1));
  const [totalGuesses, setTotalGuesses] = useState<number>(0);
  const [payoff, setPayoff] = useState<number>(stake);
  const [gameWasLost, setGameWasLost] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isCashedOutModalOpen, setIsCashedOutModalOpen] = useState<boolean>(false);
  const [gamesHistory, setGamesHistory] = useState<Array<GameHistory>>([] as Array<GameHistory>);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //bombsAmount = 23;

  // @ts-ignore
  const bombURL = `${import.meta.env.VITE_API_BASE_URL}/bombs`;

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  }

  const openCashedOutModal = () => {
    setIsCashedOutModalOpen(true);
  }

  const multipliers = [1.08, 1.23, 1.42, 1.64, 1.92, 2.25, 2.68, 3.21, 3.9, 4.8, 6, 6.9, 7.94, 9.13, 10.51, 12.08, 13.87, 15.95, 18.33, 21.01, 24.02, 27.47, 31.32, 35.62, 40.5, 45.6, 50.81, 56.00, 61.26];

  const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to handle the card click event
  const handleCardClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    // Make all other cards unclickable until animation has finished
    const cardFronts = Array.from(document.getElementsByClassName('front'));
    for (const cardFront of cardFronts) {
      cardFront.classList.remove("pointer");
      cardFront.classList.add("pointer-events-none");
    };

    const newFlipped = [...flipped];

    let currentElement = e.target!;
    while (!(Array.from((currentElement as HTMLDivElement).classList).includes('clickcard'))) {
      currentElement = (currentElement as HTMLElement).parentNode! as HTMLDivElement;
    }

    if (!(Array.from((currentElement as HTMLDivElement).classList).includes('flipped'))) {
      (currentElement as HTMLDivElement).classList.add('flipped');
      // Wait for the animation
      await wait(500);

      for (const cardFront of cardFronts) {
        cardFront.classList.remove("pointer-events-none");
        cardFront.classList.add("pointer");
      }
    } else {
      // Prevent proceeding if already flipped
      return;
    }

    newFlipped[row][col] = true;

    // Position that clicked card has among 25 cards
    const cardIndex = row * 5 + col;

    // Lost game
    if (bombPositions.includes(cardIndex)) {
      setIsLoading(true);
      setGameWasLost(true);
      // If lost on first guess, use first multiplier
      const response = await fetch(bombURL, {
        method: 'POST',
        body: JSON.stringify({
          bombs: bombsAmount,
          multiplier: multipliers[totalGuesses - 1] ?? 1.00,
          payoff: 0
        })
      });

      setIsLoading(false);
    } else {
      // Current guess was correct, proceed
      // If completed game, finish
      if (totalGuesses + 1 + bombsAmount === 25) {
        completeGame();
      }

      setTotalGuesses((totalGuesses: number) => totalGuesses + 1);
      setPayoff(Math.round(stake * multipliers[totalGuesses]));
    }

    // Set the new flipped state
    setFlipped(newFlipped);
  };

  /**
   * At start of game, assign bombs to random positions.
   * 
   * @returns {Array<number>} - Bomb positions.
   */
  const getBombPositions = (): Array<number> => {
    const arr: Array<number> = [];

    while (arr.length < bombsAmount) {
      const num = Math.floor(Math.random() * 25);

      if (!(arr.includes(num))) {
        arr.push(num);
      }
    }

    return arr;
  }

  const getGamesHistory = async () => {
    try {
      const response = await fetch(bombURL);
      const historyResponse = await response.json();
      const history = historyResponse.data;
      history.reverse();

      setGamesHistory(history);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    // Define the async function to reset bomb positions and fetch game history
    const resetBombPositions = async () => {

      // If the game was lost, get games history
      if (gameWasLost) {
        await getGamesHistory();
      } else {
        setBombPositions(getBombPositions());
      }
    };

    resetBombPositions(); // Call the async function

  }, [gameWasLost]);

  /**
   * Close modal when wherever is clicked.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClick = (e: MouseEvent) => {
        // Don't close same time as opened (`CustomButton` clicked)
        // Can ignore rather than type check if it is button, for performance
        // @ts-ignore
        if (!(Array.from(e.target.classList).includes('focus-visible:outline-2'))) {
          setIsHistoryModalOpen(false);
        }
      };

      window.addEventListener('click', handleClick);

      // Clean up the event listener on component unmount
      return () => {
        // @ts-ignore
        window.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className={`md:mt-0 py-6 px-5 font-semibold text-lg ${gameWasLost ? 'md:mt-16 lg:mt-28' : 'mt-16'}`}>
          {!gameWasLost
            ? <><div className="flex justify-between">
              <div className="row space-x-2">
                <img src={BombIcon} height={30} width={30} alt="Bombs" />
                <span className="text-lg">{bombsAmount * 4}%</span>
              </div>
              <div>СТАВКА</div>
            </div>
              <div className="flex justify-between">
                <div className="row space-x-2">
                  <img src={BananaIcon} height={30} width={30} alt="Correct Guesses" />
                  <span>{totalGuesses} / {25 - bombsAmount}</span>
                </div>
                <div>{stake.toString().padEnd(6)}</div>
              </div></>
            : <div className="mt-16 md:mt-0 lg:-mt-1 xl:-mt-3 2xl:-mt-5">
              <CustomButton type="button" onClick={() => openHistoryModal()} isFullWidth>История игр</CustomButton>
            </div>}
        </div>
        <div className="flex-1 mx-6 grid grid-rows-5 gap-y-2 grid-flow-row">
          {Array.from({ length: 5 }).map((_, row) => (
            <div className="grid grid-cols-5 gap-x-3 min-h-12" key={Math.random()}>
              {Array.from({ length: 5 }).map((_, col) => (
                <div className="card-container" key={Math.random()}>
                  <div className={`card clickcard ${flipped[row][col] ? 'flipped' : ''}`}>
                    {!gameWasLost &&
                      <div
                        className="front face rounded-2xl bg-dark row text-white bold text-3xl pointer"
                        onClick={(e) => handleCardClick(e, row, col)}
                      >
                        ?
                      </div>}
                    <div className={`back rounded-2xl row ${bombPositions.includes(row * 5 + col) ? 'bg-red' : 'bg-white'} ${gameWasLost ? 'h-full w-full brightness-50' : 'face'}`}>
                      <img
                        src={bombPositions.includes(row * 5 + col) ? BombIcon : BananaIcon}
                        height={40}
                        width={40}
                        alt="Card Back"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Multipliers */}
        {!gameWasLost &&
          <div className={`mt-3 mx-6 flex space-x-1 text-white text-xs md:text-md xl:text-lg ${gameWasLost ? 'opacity-0' : ''}`}>
            {Array.from({ length: 4 }, (_, index) => {
              // Since it starts from `1.08`, reduce by 1
              const multiplierIndex = totalGuesses - 5 + index; // Calculates the correct index (from totalGuesses - 6 to totalGuesses - 1)
              // Check if the multiplier exists (i.e., the index is within bounds)
              if (multiplierIndex >= -1 && multiplierIndex < multipliers.length) {
                return (
                  <div key={Math.random()} className="py-1.5 px-2 rounded-lg bg-dark">
                    {multipliers[multiplierIndex] ? multipliers[multiplierIndex].toFixed(2) : '1.00'}
                  </div>
                );
              }
              return null; // If the multiplier does not exist, return nothing
            })}
            <div className="py-1.5 px-2 rounded-lg bg-red-500">
              {totalGuesses === 0 ? '1.00' : multipliers[totalGuesses - 1].toFixed(2)}
            </div>
            {/* Multipliers after */}
            {/* Ensure there is at least 1 element with `Math.max`}*/}
            {Array.from({ length: Math.max(6 - totalGuesses - 1, 1) }, (_, index) => {
              return (
                <div key={Math.random()} className="py-1.5 px-2 rounded-lg bg-dark opacity-50">
                  {multipliers[totalGuesses + index]}
                </div>
              );
            })}
          </div>}

        <button
          type="button"
          onClick={() => gameWasLost ? startGame() : completeGame()}
          className={`my-4 mx-6 row-h min-h-[68px] rounded-xl px-3 py-5 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-w-full bold text-xl uppercase
          ${gameWasLost ? 'bg-red-500 hover:brightness-75' : 'bg-[linear-gradient(to_right,_#F3BE07,_#E57260)] hover:bg-[linear-gradient(to_right,_#D89C06,_#C45750)]'}
          ${totalGuesses === 0 && !gameWasLost ? 'pointer-events-none brightness-75' : 'pointer'}`}
          disabled={totalGuesses === 0 && !gameWasLost}
        >
          {isLoading
            ? <div className="lds-spinner translate-x-[-0.5rem] translate-y-[-0.375rem] scale-[0.5]"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
            : totalGuesses === 0
              ? gameWasLost ? 'Ты проиграл' : 'Найди бананы'
              : gameWasLost
                ? 'Ты проиграл'
                : `Выплата ${payoff}`}
        </button>
      </div>
      <HistoryModal isOpen={isHistoryModalOpen} setIsOpen={setIsHistoryModalOpen} games={gamesHistory} />
      <CashedOutModal isOpen={isCashedOutModalOpen} setIsOpen={setIsCashedOutModalOpen} startGame={startGame} multiplier={multipliers[totalGuesses - 1] ?? 1} payoff={payoff} />
    </>
  )
}
