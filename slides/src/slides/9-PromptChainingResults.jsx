import { ResultSlide } from "./templates/ResultSlide";

export function PromptChainingResultsSlide() {
  return (
    <ResultSlide
      index={3}
      title="Prompt Chaining"
      dataset="prompt-chaining"
      trustworthiness={93.9}
      conceptualFootprint={{
        "Cyber Warfare Operations": [9.09, 56.5, 0, 0],
        "Disaster Movie Villain": [0, 0, 18.75, 6.52],
        "Story Protagonist Figure": [0, 0, 15.62, 0],
        "Number Sequence": [0.9, 1.73, 15.62, 2.17],
      }}
      description="Mentre l'approccio monolitico porta a un'attivazione confusa su molteplici aree, la scomposizione in catene sequenziali costringe il modello a modulare chiaramente il focus cognitivo e ad attraversare domini semantici ben distinti in ogni fase"
    />
  );
}
