import { Slide } from "@revealjs/react";

export function TitleSlide() {
  return (
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
  );
}
