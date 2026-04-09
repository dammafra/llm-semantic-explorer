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

      <aside className="notes">
        Per garantire la validità scientifica dell'analisi, ho costruito un
        dataset sperimentale ad hoc, rigorosamente controllato. Volevo infatti
        misurare e rendere direttamente osservabile l'impatto spaziale di
        diverse tecniche di Prompt Engineering avanzato, come il Few-Shot
        Prompting o il Chain of Thought. La domanda di base era: quando forniamo
        a un modello una tecnica di ragionamento più strutturata, cosa succede
        fisicamente all'interno del suo spazio decisionale? Per rispondere a
        questa domanda, in ogni scenario testato, il compito generativo di base
        richiesto al modello è rimasto invariato. L'unica variabile che andavo a
        modificare era la tecnica di istruzione: affiancavo un prompt "di base",
        o zero-shot, a prompt avanzati come Persona Prompting, Chain of Thought
        o Tree of Thoughts. Inoltre, per isolare il ragionamento ed evitare
        rumore derivante da convenzioni colloquiali, ho utilizzato un system
        prompt molto rigido.
      </aside>
    </Slide>
  );
}
