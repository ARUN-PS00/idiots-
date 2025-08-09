export interface BubbleData {
  id: string;
  x: number;
  y: number;
  requiresDoubleClick: boolean;
}

export const generateBubbleRows = (
  startRow: number,
  numRows: number,
  containerWidth: number,
  bubbleSize: number,
  spacing: number
): BubbleData[] => {
  const bubbles: BubbleData[] = [];
  const bubblesPerRow = Math.floor((containerWidth - bubbleSize) / spacing);
  const rowWidth = bubblesPerRow * spacing;
  const startX = (containerWidth - rowWidth) / 2;

  for (let row = startRow; row < startRow + numRows; row++) {
    const isEvenRow = row % 2 === 0;
    const rowBubbles = isEvenRow ? bubblesPerRow : bubblesPerRow - 1;
    const rowStartX = isEvenRow ? startX : startX + spacing / 2;

    for (let col = 0; col < rowBubbles; col++) {
      const x = rowStartX + col * spacing;
      const y = row * spacing + 100; // 100px offset from top

      bubbles.push({
        id: `bubble-${row}-${col}`,
        x,
        y,
        requiresDoubleClick: Math.random() < 0.3 // 30% chance of double-click requirement
      });
    }
  }

  return bubbles;
};