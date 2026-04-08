import { Icon } from "@iconify/react";
import { Slide } from "@revealjs/react";

export function PipelineSlide() {
  return (
    <Slide>
      <h3 className="text-left">Pipeline</h3>
      <div className="flex justify-between items-center px-4">
        <div className="size-60 bg-slate-500 rounded-md"></div>
        <Icon
          icon="solar:menu-dots-bold"
          fontSize="100px"
          className="text-slate-500"
        />
        <div className="size-60 bg-slate-500 rounded-md"></div>
        <Icon
          icon="solar:menu-dots-bold"
          fontSize="100px"
          className="text-slate-500"
        />
        <div className="size-60 bg-slate-500 rounded-md"></div>
      </div>
    </Slide>
  );
}
