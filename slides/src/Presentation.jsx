import { Icon } from "@iconify/react";
import { Deck, Slide, Stack } from "@revealjs/react";

export function Presentation() {
  return (
    <Deck
      config={{
        hash: true,
        navigationMode: "linear",
        slideNumber: "c/t",
        showSlideNumber: "all",
      }}
    >
      <Slide>
        <div className="flex justify-between items-center text-base">
          <img src="assets/uniba.png" className="w-50 object-contain" />
          <p className="text-2xl absolute top-20 left-1/2 -translate-x-1/2">
            Short Master Universitario <br />
            Generative AI: dalla teoria alla pratica
          </p>
          <p className="text-sky-900">DIPARTIMENTO DI INFORMATICA</p>
        </div>

        <div className="my-40">
          <h1 className="r-fit-text">Esplorazione Semantica degli LLM</h1>
          <p>
            Un Approccio di Mechanistic Interpretability <br />
            tramite Visualizzazione degli Embeddings
          </p>
        </div>

        <div className="flex justify-between items-center text-base mt-10">
          <p>Francesco Dammacco</p>
          <p>
            10 aprile 2026 <br />
            Anno Accademico 2025 - 2026
          </p>
        </div>
      </Slide>

      <Stack>
        <Slide transition="zoom">
          <h2 className="text-left">Problema</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 font-mono">
              <p>prompt</p>
              <Icon icon="solar:arrow-right-linear" fontSize="100px" />
            </div>
            <div className="drop-shadow-2xl shadow-2xl size-100 bg-black text-white rounded-md p-4">
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
        </Slide>

        <Slide background="black" transition="zoom">
          <h2 className="r-fit-text text-white!">
            Mechanistic Interpretability
          </h2>
          <ul className="text-white">
            <li>Sposta l'attenzione sulle rappresentazioni intermedie</li>
            <li>Self-attention</li>
            <li>Training su ampi corpora testuali</li>
            <li>Complessità parametrica</li>
            <li>...</li>
          </ul>
        </Slide>
      </Stack>

      <Slide className="h-full">
        <div className="flex h-full">
          <div className="w-1/2">Content</div>
          <iframe
            src="https://llm-semantic-explorer.vercel.app"
            className="w-1/2 h-full max-h-full!"
          />
        </div>
      </Slide>

      <Slide>
        <h2 className="r-fit-text">Grazie per l'attenzione</h2>
      </Slide>
    </Deck>
  );
}
