import { useState } from "react";
import { Game } from "./pages/game";
import { Settings } from "./pages/settings";
import { SteamPunkFrame } from "@/assets/images";
import '@/lib/styles/bomb.css';

const BombPage = () => {
  const [isSettingGame, setIsSettingGame] = useState<boolean>(true);
  const [bombsAmount, setBombsAmount] = useState<number>(1);
  const [stake, setStake] = useState<number>(10_000);

  return (
    <section className="rounded-3xl bg-beige relative">
      <div className="flex-1 row flex-col min-h-[60vh] mt-28">
        {/* Frame */}
        <div className="absolute -top-16 md:-top-24 2xl:-top-32 rounded-2xl text-uppercase frame-container flex items-center z-10">
          <img
            src={SteamPunkFrame}
            className="min-w-[10rem] w-[14rem] md:w-[19rem] 2xl:w-[24rem] z-10"
            alt="Header Frame"
          />
          <div className="absolute row min-h-[5rem] md:min-h-[8rem] lg:min-h-[10rem] min-w-[10rem] md:min-w-[13rem] lg:min-w-[15rem] 2xl:min-w-[17rem] px-5 uppercase left-1/2 -translate-x-1/2 whitespace-nowrap text-xl md:text-3xl lg:text-4xl bembo-semibold bg-[#D5CEC1]">Bomb</div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full flex flex-col text-dark dark:text-black">
          {isSettingGame
            ? <Settings setIsSettingGame={setIsSettingGame} bombsAmount={bombsAmount} setBombsAmount={setBombsAmount} stake={stake} setStake={setStake} />
            : <Game setIsSettingGame={setIsSettingGame} stake={stake} bombsAmount={bombsAmount} />
          }
        </div>
      </div>
    </section>
  );
};

export default BombPage;
