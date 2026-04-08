import { Slide } from "@revealjs/react";

export function BulletSlide({ title, items, ...props }) {
  return (
    <Slide className="text-left" {...props}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Slide>
  );
}
