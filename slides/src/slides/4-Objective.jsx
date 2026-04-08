import { BulletSlide } from "./templates/BulletSlide";

export function ObjectiveSlide() {
  return (
    <BulletSlide
      title="Obbiettivo"
      items={["Item 1", "Item 2", "Item 3"]}
      backgroundImage="assets/bg-compass.png"
    />
  );
}
