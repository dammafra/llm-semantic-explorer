import { ResultSlide } from "./templates/ResultSlide";

export function FewShotPromptingResultsSlide() {
  return (
    <ResultSlide
      index={1}
      title="Few-Shot Prompting"
      dataset="few-shot-prompting"
      trustworthiness={91.6}
      conceptualFootprint={{
        "Customer Order Issue": [92.8, 15.8],
        "Customer Information": [0, 42.1],
        "Damaged Tablet": [0, 42.1],
      }}
      description="La divisione in due poli primari riflette geometricamente l'alternanza
        tra la sintassi vincolante del formato richiesto e l'inserimento dei
        dati estratti dal contesto"
    />
  );
}
