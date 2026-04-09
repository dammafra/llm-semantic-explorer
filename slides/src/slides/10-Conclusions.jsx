import { Icon } from "@iconify/react";
import { Slide } from "@revealjs/react";

export function ConclusionsSlide() {
  return (
    <Slide className="text-left">
      <div>
        <h4>Conclusioni</h4>
        <ul className="text-2xl">
          <li>Rappresentazione dello spazio latente</li>
          <li>Dinamiche interne degli LLM tradotte in percorsi 3D</li>
          <li>Visualizzazione dell'impatto dei prompt sulla generazione</li>
        </ul>
      </div>

      <Icon
        icon="carbon:curved-line-dashed"
        fontSize="100px"
        className="text-slate-400 rotate-165 absolute top-40 left-15"
      />

      <div className="absolute w-full top-50 left-50">
        <h4>Limitazioni</h4>
        <ul className="text-2xl">
          <li>
            Test su casi ad hoc, senza validazione statistica su larga scala
          </li>
          <li>Mancata analisi di come i parametri alterino la topologia</li>
          <li>Oneri computazionali</li>
        </ul>
      </div>

      <Icon
        icon="carbon:curved-line-dashed"
        fontSize="100px"
        className="text-slate-400 rotate-165 absolute top-90 left-65"
      />

      <div className="absolute w-[60%] top-100 left-100">
        <h4>Sviluppi Futuri</h4>
        <ul className="text-2xl">
          <li>
            Integrazione di strumenti più potenti <br />(
            <span className="italic">Nomic Atlas</span>,{" "}
            <span className="italic">TF Embedding Projector</span>)
          </li>
          <li>
            Mappatura visiva del <span className="italic">retrieval</span> e
            della <span className="italic text-nowrap">context injection</span>{" "}
            nei sistemi RAG
          </li>
          <li>Analisi di pattern decisionali più complessi, agentic</li>
        </ul>
      </div>

      <aside className="notes">
        Avviandomi alla conclusione, posso affermare che questo lavoro fornisce
        uno strumento pratico per ispezionare geometricamente la decodifica
        probabilistica degli LLM. Siamo riusciti a mappare fisicamente come il
        ragionamento testuale si traduca in traiettorie spaziali misurabili.
        Ovviamente, il progetto presenta delle limitazioni. Il dataset impiegato
        è stato costruito su misura e risulta numericamente ridotto. La mancanza
        di un corpus esteso non ci ha permesso di effettuare validazioni
        statistiche su grandissima scala. Tuttavia, questo lavoro pone delle
        solide basi metodologiche. I futuri sviluppi potrebbero applicare questo
        stesso ambiente di visualizzazione ad architetture ben più complesse,
        come i sistemi RAG (Retrieval-Augmented Generation), o per mappare i
        pattern di ragionamento di agenti autonomi avanzati.
      </aside>
    </Slide>
  );
}
