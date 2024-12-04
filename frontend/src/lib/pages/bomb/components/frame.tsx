export const Frame = ({ isSettingGame }: { isSettingGame: boolean }) => {
  return (
    <div className="min-h-[12vh] min-w-[40vw] md:min-w-[12vw] row-v">
      <div className="bg-dark rounded-xl">
        <div className="col-lg-12 text-center">
          <h1 className="text-uppercase text-white countach text-6xl">Bomb</h1>
          <p className="lead text-primary pt-4 px-3 heading-pro-trial tracking-wider text-2xl">
            {isSettingGame ? 'Настрой свою игру' : 'Выиграй приз'}
          </p>
        </div>
      </div>
    </div >
  )
};
