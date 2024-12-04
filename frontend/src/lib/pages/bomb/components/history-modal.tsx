import type { HistoryModalProps } from "@/../interfaces";

const HistoryModal = ({ isOpen, games }: HistoryModalProps) => {
  console.log('Games:', games);
  return (
    <>
      <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
        <div className="wrapper mt-[10%]">
        <div className="modal-content max-h-[37rem] overflow-y-scroll h-full bg-coffee rounded-[1.25rem]">
          <div className="">
            <h3 className="bold text-center text-white mt-6 mb-4 uppercase">
              История
            </h3>
            {/* Table Header */}
            <div className="my-8 mx-3.5 md:mx-7 py-1.5 history-modal-table-row bg-lightcoffee text-sm md:text-md text-[#bd5887] bold rounded-xl">
              <div className="text-center">
                No.
              </div>
              <div className="text-center">
                Bombs
              </div>
              <div className="text-center">
                Multiplier
              </div>
              <div className="text-center">
                Payoff
              </div>
            </div>

            {/* Table body */}
            <div className="mx-3.5 md:mx-7">
              {games.map((game, index) => (
                <div className="history-modal-table-row my-3 py-2.5 rounded-2xl bg-[#746F6E]" key={Math.random()}>
                  <div className="text-center">{index + 1}</div>
                  <div className="text-center">{game.bombs}</div>
                  <div className="text-center">x{game.multiplier}</div>
                  <div className="text-center text-yellow-600">{game.payoff}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export { HistoryModal };
