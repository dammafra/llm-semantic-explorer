import { Icon } from "@iconify/react";
import { Slide } from "@revealjs/react";

export function PipelineSlide() {
  const stepClass =
    "shadow content-center text-2xl w-56 h-44 bg-slate-300 rounded-md last:w-53 px-2";
  const Separator = (
    <Icon
      icon="solar:menu-dots-bold"
      fontSize="100px"
      className="text-slate-400"
    />
  );
  return (
    <Slide>
      <h3 className="text-left">Pipeline</h3>

      <div className="flex flex-wrap gap-y-4 items-center my-10">
        <div className={stepClass}>
          Generazione output <br />+<br /> hidden states (4096D)
        </div>
        {Separator}
        <div className={stepClass}>
          Filtraggio da <span className="text-nowrap">stop-words</span>,
          punteggiatura, token speciali
        </div>
        {Separator}
        <div className={stepClass}>Riduzione dimensionale con UMAP (30D)</div>
        {Separator}
        <div className={stepClass}>Clustering con HDBSCAN</div>
        {Separator}
        <div className={stepClass}>Generazione etichette</div>
        {Separator}
        <div className={stepClass}>Riduzione dimensionale con UMAP (3D)</div>
      </div>
      <div className="flex items-center gap-4">
        <Icon icon="boxicons:chip" fontSize="60px" className="text-slate-400" />
        <p className="text-left text-xl">
          Implementazione in ambiente Kaggle su 2 ⨉ GPU Tesla T4 (16 GB VRAM
          totali), <br /> eseguendo{" "}
          <span className="text-nowrap italic">Llama-3.2-3B-Instruct</span>{" "}
          ottimizzato tramite <span className="italic">Unsloth</span> con
          quantizzazione a 4 bit
        </p>
      </div>

      <aside className="notes">
        Per realizzare questo ambiente esplorativo, è stato necessario estrarre
        i cosiddetti "hidden states", ovvero gli embeddings generati nei layer
        interni del modello durante la fase di inferenza. Parliamo di vettori
        con migliaia di dimensioni, nello specifico 4096. Per renderli
        analizzabili dall'occhio umano, la pipeline che ho sviluppato utilizza
        l'algoritmo di riduzione dimensionale UMAP, che comprime i dati da 4096
        a sole 3 dimensioni. UMAP è stato scelto perché è eccellente nel
        preservare la topologia locale e le relazioni di vicinanza tra i vettori
        originali. Successivamente, ho integrato un algoritmo di clustering
        basato sulla densità, chiamato HDBSCAN. Questo strumento permette di
        individuare automaticamente raggruppamenti semantici all'interno dello
        spazio tridimensionale, senza dover ipotizzare a priori il numero di
        cluster. Tutta questa logica è stata orchestrata all'interno di un
        notebook Python dedicato.
      </aside>
    </Slide>
  );
}
