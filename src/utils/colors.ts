export const COLORS = [
  '#e6194b', // Red
  '#3cb44b', // Green
  '#ffe119', // Yellow
  '#4363d8', // Blue
  '#f58231', // Orange
  '#911eb4', // Purple
  '#46f0f0', // Cyan
  '#f032e6', // Magenta
  '#bcf60c', // Lime
  '#fabebe', // Pink
  '#008080', // Teal
  '#e6beff', // Lavender
  '#9a6324', // Brown
  '#fffac8', // Beige
  '#800000', // Maroon
  '#aaffc3', // Mint
  '#808000', // Olive
  '#ffd8b1', // Apricot
  '#000075', // Navy
  '#808080', // Grey
]

export function getColor(index: number) {
  return COLORS[index % COLORS.length]
}

// export function generateColor(index: number) {
//   const colorMap: Record<number, string> = {
//     0: '#e6194b',
//     1: '#3cb44b',
//   }

//   if (index in colorMap) {
//     return colorMap[index]
//   }

//   // Generate distinct colors for remaining indices
//   const hue = ((index - 2) * 137.5) % 360 // Golden angle for variety
//   const saturation = 65 + Math.random() * 25
//   const lightness = 45 + Math.random() * 15
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`
// }
