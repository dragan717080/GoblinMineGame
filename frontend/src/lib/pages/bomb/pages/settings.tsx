import { useState } from "react";
import { OptionButton } from "@/lib/layout/components/option-button";
import { BananaIcon, BombIcon } from "@/assets/images";
import { StakeSelection } from "@/lib/layout/components/stake-selection";

interface SettingsProps {
  setIsSettingGame: (boolean) => void;
  bombsAmount: number;
  setBombsAmount: (number) => void;
  stake: number;
  setStake: (number) => void;
}

export const Settings = ({ setIsSettingGame, bombsAmount, setBombsAmount, stake, setStake }: SettingsProps) => {
  // How many hits, out of `25 - bombsAmount`
  const [hits, setHits] = useState<number>(0);

  const startGame = () => {
    setIsSettingGame(false);
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

  const increaseBombsAmount = () => {
    if (bombsAmount < 10) {
      setBombsAmount((prevAmount: number) => prevAmount + 1);
    }
  }

  const decreaseBombsAmount = () => {
    if (bombsAmount > 1) {
      setBombsAmount((prevAmount: number) => prevAmount - 1);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="mt-16 md:mt-0 py-6 px-5 font-semibold text-lg">
        <div className="flex justify-between">
          <div className="row space-x-2">
            <img src={BombIcon} height={30} width={30} alt="Bombs" />
            <span className="text-lg">{`${bombsAmount * 4}%`}</span>
          </div>
          <div>СТАВКА</div>
        </div>
        <div className="flex justify-between">
          <div className="row space-x-2">
            <img src={BananaIcon} height={30} width={30} alt="Bombs" />
            <span>0 / {25 - bombsAmount}</span>
          </div>
          <div>{stake.toString().padEnd(6)}</div>
        </div>
      </div>
      <div className="flex-1 row-v">
        <div>
          <h3 className="text-center mb-3">СТАВКА</h3>
          <StakeSelection
            stake={stake}
            decreaseStake={decreaseStake}
            increaseStake={increaseStake}
            setStake={setStake}
          />
        </div>
        <div className="mt-16">
          <h3 className="text-center mb-3">КОЛИЧЕСТВО БОМБ</h3>
          <div className="row-h">
            <OptionButton text="3" onClick={() => setBombsAmount(3)} />
            <OptionButton text="-" onClick={decreaseBombsAmount} />
            <div className="row bg-neutral-200">
              <input
                type="number"
                readOnly
                value={bombsAmount}
                className="
                  w-40 h-10
                  -mt-1
                  rounded-lg
                  text-center 
                bg-neutral-200
                  text-black 
                  shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3),_inset_0px_-1px_1px_rgba(255,255,255,0.8),_0px_4px_6px_rgba(0,0,0,0.2)]
                  border-none
                  outline-none
                "
              />
            </div>
            <OptionButton text="+" onClick={increaseBombsAmount} />
            <OptionButton text="10" onClick={() => setBombsAmount(10)} />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => startGame()}
        className="my-4 mx-6 text-white bg-[linear-gradient(to_right,_#F3BE07,_#E57260)] hover:bg-[linear-gradient(to_right,_#D89C06,_#C45750)] row-h rounded-xl px-3 py-5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-w-full bold text-xl uppercase"
      >
        Начни игру
      </button>
    </div>
  )
};
