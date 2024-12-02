import { SadPenguin } from "@/assets/images";
import type { LostModalProps } from "@/../interfaces";

const LostModal = ({ isOpen, setIsOpen, startGame, multiplier, isBombPage = false }: LostModalProps) => {
  return (
    <>
      <div
        id="myModal"
        className={`
        modal ${isOpen ? 'block' : 'hidden'}
        ${!isBombPage ? 'absolute w-full bottom-0' : ''}
      `}
      >
        <div className={`wrapper text-white md:mt-[5%] ${isBombPage ? 'mt-[10%]' : 'pt-40'}`}>
          <div className="modal-content row flex-col bg-coffee rounded-[1.25rem]">
            <div className="row flex-col">
              <div className="mt-6 mb-4 row">
                <img src={SadPenguin} height={100} width={74} alt="CorrectGuessIcon" />
              </div>
              <h3 className="bold text-red-500 mb-4">
                Ты проиграл
              </h3>
              <p className="text-center text-lg max-w-2/3">
                <span className="tracking-tight text-gray-500 text-center">
                  Ты пытался выиграть с множителем&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                  x{multiplier}
                  <span className="tracking-tight text-gray-500 text-center">
                  , но не удалось.
                </span>
                  </p>
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
    </>
  )
}

export { LostModal };
