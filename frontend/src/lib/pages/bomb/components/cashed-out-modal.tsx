import { BananaIcon } from "@/assets/images";
import type { CashedOutModalProps } from "@/../interfaces";

const CashedOutModal = ({ isOpen, setIsOpen, startGame, multiplier, payoff, isBombPage = true }: CashedOutModalProps) => {
  return (
    <div
      id="myModal"
      className={`
        modal z-20 ${isOpen ? 'block' : 'hidden'}
        ${!isBombPage ? 'absolute w-full bottom-0' : ''}
      `}
    >
      <div className={`wrapper text-white md:mt-[5%] ${isBombPage ? 'mt-[10%]' : 'pt-40'}`}>
        <div className="modal-content row flex-col bg-coffee rounded-[1.25rem]">
          <div className="">
            <div className="my-6 row">
              <img src={BananaIcon} height={70} width={70} alt="CorrectGuessIcon" />
            </div>
            <h3 className="bold">
              Твой выигрыш!
            </h3>
            <h2 className="my-4 bold text-center">{payoff}</h2>
            <p className="text-center text-lg"><span className="tracking-tight text-gray-500 text-center">Множитель&nbsp;&nbsp;&nbsp;&nbsp;</span>x{multiplier}</p>
          </div>
          <button
            className="w-3/4 md:w-1/2 mt-9 mb-4 mx-6 row-h rounded-xl px-3 py-2 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-w-full bold text-xl uppercase bg-[linear-gradient(to_right,_#F3BE07,_#E57260)] hover:bg-[linear-gradient(to_right,_#D89C06,_#C45750)]"
            onClick={() => {
              startGame();
              setIsOpen(false);
            }}
            type="submit"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  )
}

export { CashedOutModal };
