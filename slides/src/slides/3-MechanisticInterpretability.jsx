import { BulletSlide } from "./templates/BulletSlide";

export function MechanisticInterpretabilitySlide() {
  return (
    <BulletSlide
      title="Mechanistic Interpretability"
      items={[
        "Oltre l'output: analisi delle rappresentazioni intermedie",
        "Decodifica dei meccanismi interni della rete neurale",
        "Ogni parola generata è un punto lungo una traiettoria in uno spazio vettoriale ad alta dimensionalità",
      ]}
      background="black"
      backgroundImage="assets/bg-layers.png"
      transition="zoom"
    >
      <aside className="notes">
        Di fronte a questo limite, ho deciso di basare il mio lavoro sui
        principi della Mechanistic Interpretability. Invece di limitarci a
        valutare il testo finale prodotto dal modello, questo approccio sposta
        l'attenzione sulle rappresentazioni intermedie, cercando di decodificare
        i meccanismi interni della rete. In quest'ottica, la generazione di ogni
        singola parola, o token, non è altro che un punto lungo una complessa
        traiettoria all'interno di uno spazio vettoriale ad altissima
        dimensionalità.
      </aside>
    </BulletSlide>
  );
}
