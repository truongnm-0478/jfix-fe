import { FlameAnimation } from "./components/FlameAnimation";

export const StreakDay = () => {
  return (
    <div>
      <FlameAnimation oldStreak={6} newStreak={7} cardCount={10} />
    </div>
  );
};
