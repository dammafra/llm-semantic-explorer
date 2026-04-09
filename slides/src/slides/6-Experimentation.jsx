import { Icon } from "@iconify/react";
import { Slide } from "@revealjs/react";

export function ExperimentationSlide() {
  return (
    <Slide
      className="text-left"
      backgroundImage="assets/bg-ai-chat.png"
      backgroundOpacity={0.5}
    >
      <h3>Sperimentazione</h3>
      <p>Il Prompt Engineering come Caso d'uso</p>
      <ul>
        <li>
          Costruzione di un dataset controllato: <br /> confronto con{" "}
          <span className="text-nowrap italic">zero-shot</span> sullo stesso
          compito
        </li>
        <li>
          Validazione
          <Icon icon="solar:arrow-right-linear" className="mx-8 inline-block" />
          Trustworthiness
        </li>
        <li>
          Analisi
          <Icon
            icon="solar:arrow-right-linear"
            className="ml-30 mr-8 inline-block"
          />
          Attivazione Concettuale
        </li>
        <li>
          Osservazione dello <span className="italic">steering</span>
        </li>
      </ul>
    </Slide>
  );
}
