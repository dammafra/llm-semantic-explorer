import { Slide } from "@revealjs/react";

export function ResultSlide({
  index,
  title,
  dataset,
  trustworthiness,
  conceptualFootprint,
  description,
}) {
  const baseURL = import.meta.env.PROD
    ? "https://llm-semantic-explorer.vercel.app"
    : "http://localhost:5174";

  return (
    <Slide
      className="h-full text-left"
      backgroundTransition="none"
      backgroundGradient="radial-gradient(#1d293d, #020618)"
      backgroundIframe={`${baseURL}?dataset=${dataset}&orientation=rtl&double-click=true`}
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

        <p className="text-xl text-center absolute bottom-0 px-25">
          {description}
        </p>
      </div>

      <aside className="notes">
        <p>
          Prima di trarre conclusioni visive, ho dovuto verificare che la
          proiezione in 3D fosse matematicamente affidabile. Per farlo, ho
          calcolato la metrica di "Trustworthiness", che misura la fedeltà della
          riduzione dimensionale. I risultati sono stati eccellenti, con valori
          costantemente compresi tra 0.916 e 0.976 per tutte le tecniche
          analizzate. Questo ci conferma che ciò che vediamo nello spazio 3D
          corrisponde effettivamente alle reali relazioni interne del modello.
        </p>

        <p>
          Passando all'analisi qualitativa, i risultati sono stati affascinanti.
          L'osservazione spaziale delle traiettorie ha dimostrato chiaramente
          che il contesto fornito nel prompt altera la distribuzione dei token.
          Quando utilizziamo istruzioni ben strutturate, queste non si limitano
          a suggerire le parole giuste, ma costringono il modello a convergere
          verso specifiche regioni isolate dello spazio latente. In altre
          parole, il prompt agisce come una vera e propria mappa cognitiva.
          Abbiamo osservato una netta riduzione dell'entropia: le tecniche
          avanzate riducono l'incertezza del modello nella scelta dei token
          successivi, inducendo la formazione di cluster semantici molto più
          densi e definiti rispetto alle generazioni ottenute con prompt
          basilari.
        </p>
      </aside>
    </Slide>
  );
}
