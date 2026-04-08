import { Deck, Slide, Stack } from "@revealjs/react";
import {
  ChainOfThoughtResultsSlide,
  ConclusionsSlide,
  ExperimentationSlide,
  FewShotPromptingResultsSlide,
  MechanisticInterpretabilitySlide,
  ObjectiveSlide,
  PipelineSlide,
  ProblemSlide,
  PromptChainingResultsSlide,
  TitleSlide,
} from "./slides";

export function Presentation() {
  return (
    <Deck
      config={{
        hash: true,
        navigationMode: "linear",
        slideNumber: "c/t",
        showSlideNumber: "all",
        preloadIframes: true,
      }}
    >
      <TitleSlide />
      <Stack>
        <ProblemSlide />
        <MechanisticInterpretabilitySlide />
      </Stack>
      <ObjectiveSlide />
      <PipelineSlide />
      <ExperimentationSlide />
      <Stack>
        <FewShotPromptingResultsSlide />
        <ChainOfThoughtResultsSlide />
        <PromptChainingResultsSlide />
      </Stack>
      <ConclusionsSlide />
      <Slide>
        <h2 className="r-fit-text">Grazie per l'attenzione</h2>
      </Slide>
    </Deck>
  );
}
