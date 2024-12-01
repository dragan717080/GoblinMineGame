import type { GameSelectionProps } from "@/../interfaces"

export const GameSelection = ({ onClick, canSelectOption, text, multiplier }: GameSelectionProps) => {
  return (
    <div className={`
      row
      flex-col
      max-w-[5.5rem]
      px-3.5
      py-2.5
      bg-[#D5CEC1]
      rounded-2xl
      font-semibold
      pointer
      ${!canSelectOption ? 'opacity-50' : ''}
    `}
      onClick={onClick}
    >
      <div className="pt-3 pb-4 text-xl font-lg">{text}</div>
      <div className="
        selection-multiplier
        min-w-[3.75rem]
        mb-0
        py-1.5
        px-4
        bg-[#747169]
        text-darkpeach
        opacity-75
        text-center
        rounded-3xl
      "
      >
        x{multiplier}
      </div>
    </div>
  )
}
