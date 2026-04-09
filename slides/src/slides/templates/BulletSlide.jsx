import { Slide } from "@revealjs/react";

export function BulletSlide({ title, items, children, ...props }) {
  return (
    <Slide className="text-left" {...props}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {children}
    </Slide>
  );
}
