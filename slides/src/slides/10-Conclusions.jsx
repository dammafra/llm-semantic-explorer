import { Slide } from "@revealjs/react";

export function ConclusionsSlide() {
  return (
    <Slide className="text-left ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 flex-1">
          <h4>Conclusioni</h4>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div className="border mr-7 my-10 border-slate-400" />
        <div className="flex flex-col gap-4 flex-1">
          <h4>Limitazioni</h4>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div className="border mr-7 my-10 border-slate-400" />
        <div className="flex flex-col gap-4 flex-1">
          <h4>Sviluppi Futuri</h4>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}
