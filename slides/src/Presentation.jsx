import { Deck, Slide } from "@revealjs/react";
import "reveal.js/reveal.css";
import "reveal.js/theme/serif.css";

export function Presentation() {
  return (
    <Deck>
      <Slide>
        <h1>Hello</h1>
        <p>My first Reveal deck in React.</p>
      </Slide>

      <Slide background="#111827">
        <h2>Second slide</h2>
      </Slide>
    </Deck>
  );
}
