import { ResultSlide } from "./templates/ResultSlide";

export function FewShotPromptingResultsSlide() {
  return (
    <ResultSlide
      index={1}
      title="Few-Shot Prompting"
      dataset="few-shot-prompting"
    >
      <p className="text-xs font-mono">Trustworthiness: 91.6%</p>

      <p className="text-xs font-mono mb-0!">Attivazione Concettuale: </p>
      <table className="text-xs m-0! font-mono">
        <tbody>
          <tr>
            <td>Customer Order Issue</td>
            <td>92.8%</td>
            <td>15.8%</td>
          </tr>
          <tr>
            <td>Customer Information</td>
            <td>-</td>
            <td>42.1%</td>
          </tr>
          <tr>
            <td>Damaged Tablet</td>
            <td>-</td>
            <td>42.1%</td>
          </tr>
        </tbody>
      </table>

      <p className="text-xl absolute bottom-0">
        La divisione in due poli primari riflette geometricamente l'alternanza
        tra la sintassi vincolante del formato richiesto e l'inserimento dei
        dati estratti dal contesto
      </p>
    </ResultSlide>
  );
}
