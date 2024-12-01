import { OptionButton } from "./option-button";
import type { StakeProps } from "@/../interfaces";

/**
 * Row with options for settings stake amount.
 * 
 * @param {number} stake
 * @param {() => void} decreaseStake
 * @param {() => void} increaseStake
 * @param {(newStake: number) => void} setStake
 */
export const StakeSelection = ({ stake, decreaseStake, increaseStake, setStake }: StakeProps) => {
  return (
      <div className="row-h">
        <OptionButton text="Min" onClick={() => setStake(10_000)} />
        <OptionButton text="-" onClick={() => decreaseStake()} />
        <div className="row bg-neutral-200">
          <input
            type="number"
            readOnly
            value={stake}
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
        <OptionButton text="+" onClick={() => increaseStake()} />
        <OptionButton text="Max" onClick={() => setStake(1_000_000)} />
      </div>
  )
}
