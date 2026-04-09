import { ResultSlide } from "./templates/ResultSlide";

export function PromptChainingResultsSlide() {
  return (
    <ResultSlide index={3} title="Prompt Chaining" dataset="prompt-chaining">
      <p className="text-xs font-mono">Trustworthiness: 93.9%</p>

      <p className="text-xs font-mono mb-0!">Attivazione Concettuale: </p>
      <table className="text-xs m-0! font-mono">
        <tbody>
          <tr>
            <td>Cyber Warfare Operations</td>
            <td>9.09%</td>
            <td>56.5%</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Disaster Movie Villain</td>
            <td>-</td>
            <td>-</td>
            <td>18.75%</td>
            <td>6.52%</td>
          </tr>
          <tr>
            <td>Story Protagonist Figure</td>
            <td>-</td>
            <td>-</td>
            <td>15.62%</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Number Sequence</td>
            <td>0.9%</td>
            <td>1.73%</td>
            <td>15.62%</td>
            <td>2.17%</td>
          </tr>
        </tbody>
      </table>

      <p className="text-xl absolute bottom-0">
        Mentre l'approccio monolitico porta a un'attivazione confusa su
        molteplici aree, la scomposizione in catene sequenziali costringe il
        modello a modulare chiaramente il focus cognitivo e ad attraversare
        domini semantici ben distinti in ogni fase
      </p>
    </ResultSlide>
  );
}
