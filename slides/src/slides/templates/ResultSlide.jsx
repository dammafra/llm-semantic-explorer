import { Slide } from "@revealjs/react";

export function ResultSlide({ index, title, dataset, children }) {
  return (
    <Slide
      className="h-full text-left"
      backgroundTransition="none"
      backgroundGradient="radial-gradient(#1d293d, #020618)"
      backgroundIframe={`https://llm-semantic-explorer.vercel.app?dataset=${dataset}&orientation=rtl`}
      backgroundInteractive
    >
      <div className="w-1/2 text-white">
        <h4 className="text-white! pointer-events-auto">
          <span className="text-base">Risultati ({index}/3)</span> <br />
          {title}
        </h4>
        {children}
      </div>
    </Slide>
  );
}
