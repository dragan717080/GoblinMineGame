import type { OptionButtonProps } from "@/../interfaces";

export const OptionButton = ({ text, onClick }: OptionButtonProps) => {
  return (
    <button
      type="button"
      className="row w-12 h-12 bg-neutral-200 rounded-lg shadow-[0px_5px_8px_rgba(0,0,0,0.13),0px_-1.5px_2.5px_rgba(0,0,0,0.07)] text-gray-700 font-medium relative transition-transform transform active:scale-110 focus:outline-none focus:ring-neutral-500"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-400 via-neutral-200 to-neutral-100 rounded-lg" />
      <span className="relative">{text}</span>
    </button>
  )
};
