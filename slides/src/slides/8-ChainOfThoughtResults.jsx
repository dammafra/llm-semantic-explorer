import { ResultSlide } from "./templates/ResultSlide";

export function ChainOfThoughtResultsSlide() {
  return (
    <ResultSlide
      index={2}
      title="Chain of Thought"
      dataset="chain-of-thought"
      trustworthiness={94.2}
      conceptualFootprint={{
        "Person Names (1)": [100, 42.1],
        "Directional Terms": [0, 21.1],
        "Person Names (2)": [0, 19.3],
        "Conditional Reasoning": [0, 17.5],
      }}
      description="  A differenza del collasso totale su un singolo concetto del prompt zero,
        il CoT costringe il modello a spostare progressivamente il proprio
        focus, navigando tra molteplici cluster semantici man mano che
        costruisce la risposta finale"
    />
  );
}
