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
  );
}
