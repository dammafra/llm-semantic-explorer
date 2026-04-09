import { Slide } from "@revealjs/react";

export function ResultSlide({
  index,
  title,
  dataset,
  trustworthiness,
  conceptualFootprint,
  description,
}) {
  return (
    <Slide
      className="h-full text-left"
      backgroundTransition="none"
      backgroundGradient="radial-gradient(#1d293d, #020618)"
      backgroundIframe={`https://llm-semantic-explorer.vercel.app?dataset=${dataset}&orientation=rtl`}
      backgroundInteractive
    >
      <div className="w-1/2 text-white pointer-events-auto select-none">
        <h4 className="text-white!">
          <span className="text-base">Risultati ({index}/3)</span> <br />
          {title}
        </h4>
        <p className="text-xs font-mono">Trustworthiness: {trustworthiness}%</p>

        <p className="text-xs font-mono mb-0!">Attivazione Concettuale: </p>
        <table className="text-xs m-0! font-mono">
          <tbody>
            {Object.entries(conceptualFootprint).map(
              ([concept, activations]) => (
                <tr key={concept}>
                  <td>{concept}</td>
                  {activations.map((activation, index) => (
                    <td key={index}>
                      {activation === 0 ? "-" : `${activation}%`}
                    </td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </table>

        <p className="text-xl text-center absolute bottom-0 px-25 m-0!">
          {description}
        </p>
      </div>
    </Slide>
  );
}
