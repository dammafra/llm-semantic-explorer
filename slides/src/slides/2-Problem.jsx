import { Icon } from "@iconify/react";
import { Slide } from "@revealjs/react";

export function ProblemSlide() {
  return (
    <Slide transition="zoom">
      <h3 className="text-left">Problema</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 font-mono">
          <p>prompt</p>
          <Icon icon="solar:arrow-right-linear" fontSize="100px" />
        </div>
        <div className="shadow size-100 bg-black text-white rounded-md p-4">
          <h3 className="text-white!">LLM</h3>
          <ul className="text-xl">
            <li>Architettura Transformer</li>
            <li>Self-attention</li>
            <li>Training su ampi corpora testuali</li>
            <li>Complessità parametrica</li>
            <li>...</li>
          </ul>
          <p className="text-3xl">Cosa succede nel mezzo?</p>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <Icon icon="solar:arrow-right-linear" fontSize="100px" />
          <p>output</p>
        </div>
      </div>

      <aside className="notes">
        Tutti noi oggi utilizziamo modelli basati sull'architettura Transformer.
        Grazie al meccanismo di self-attention e all'addestramento su enormi
        quantità di dati, questi modelli mostrano capacità straordinarie di
        comprensione e generazione del testo. Tuttavia, l'aumento vertiginoso
        del numero di parametri ha reso queste reti neurali sempre più opache.
        Noi inseriamo un prompt e otteniamo un output testuale semanticamente
        coerente, ma l'esatto processo computazionale che avviene nel mezzo ci è
        in gran parte sconosciuto.
      </aside>
    </Slide>
  );
}
