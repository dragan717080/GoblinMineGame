import { MenuCard } from "./components/menu-card";
import { Bomb, Crown, Dices } from '@/assets/images';

const Home = () => {
  return (
    <div className="row-v">
      {/* Since Vercel doesn't support dark and light, add `text-white for now*/}
      <h1 className="text-center md:text-left text-white">ИГРЫ</h1>
      {/* Same here */}
      <h3 className="text-center md:text-left mt-5 mb-8 text-white">Играй с удовольствие и зарабатывай монеты!</h3>
      <section className="row">
        <div className="rounded-md grid md:grid-cols-3 md:space-x-5 space-y-5 md:space-y-0">
          <MenuCard title="MORE LESS" image={Dices} subtitle="new" linkTo="/more-or-less" />
          <MenuCard title="BOMB" image={Bomb} subtitle="new" linkTo="/bomb" />
          <MenuCard title="VIP" image={Crown} subtitle="no risk" linkTo="/dices" isSecondary />
        </div>
      </section>
    </div>
  );
};

export default Home;
