import { BulletSlide } from "./templates/BulletSlide";

export function MechanisticInterpretabilitySlide() {
  return (
    <BulletSlide
      title="Mechanistic Interpretability"
      items={[
        "Oltre l'output: analisi delle rappresentazioni intermedie",
        "Decodifica dei meccanismi interni della rete neurale",
        "Ogni parola generata è un punto lungo una traiettoria in uno spazio vettoriale ad alta dimensionalità",
      ]}
      background="black"
      backgroundImage="assets/bg-layers.png"
      transition="zoom"
    />
  );
}
