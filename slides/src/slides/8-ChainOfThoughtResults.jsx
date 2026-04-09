import { ResultSlide } from "./templates/ResultSlide";

export function ChainOfThoughtResultsSlide() {
  return (
    <ResultSlide index={2} title="Chain of Thought" dataset="chain-of-thought">
      <p className="text-xs font-mono">Trustworthiness: 94.2%</p>

      <p className="text-xs font-mono mb-0!">Attivazione Concettuale: </p>
      <table className="text-xs m-0! font-mono">
        <tbody>
          <tr>
            <td>Person Names (1)</td>
            <td>100%</td>
            <td>42.1%</td>
          </tr>
          <tr>
            <td>Directional Terms</td>
            <td>-</td>
            <td>21.1%</td>
          </tr>
          <tr>
            <td>Person Names (2)</td>
            <td>-</td>
            <td>19.3%</td>
          </tr>
          <tr>
            <td>Conditional Reasoning</td>
            <td>-</td>
            <td>17.5%</td>
          </tr>
        </tbody>
      </table>

      <p className="text-xl absolute bottom-0">
        A differenza del collasso totale su un singolo concetto del prompt zero,
        il CoT costringe il modello a spostare progressivamente il proprio
        focus, navigando tra molteplici cluster semantici man mano che
        costruisce la risposta finale.
      </p>
    </ResultSlide>
  );
}
