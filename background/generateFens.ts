import { Chess } from 'chess.js';

export function generateFens(
  myMove: string,
  engineMove: string,
  enemyMove: string,
  priorFen: string,
  mode: string
) {
  const chess: Chess = new Chess();

  chess.load(priorFen);
  chess.move(enemyMove);
  const baseFen = chess.fen();

  chess.move(myMove);
  const problemFen: string = chess.fen();

  chess.undo();
  chess.move(engineMove);
  const solutionFen: string = chess.fen();

  if (mode === 'bestmove') {
    return [
      highlightMove(priorFen, baseFen, true).join(''),
      highlightMove(baseFen, solutionFen).join(''),
    ];
  }

  const highlightedBaseFen: string[] = highlightMove(priorFen, baseFen, true);
  const highlightedProblemFen: string[] = highlightMove(baseFen, problemFen);

  return [
    reconcileEnemyMove(highlightedBaseFen, highlightedProblemFen).join(''),
    highlightMove(baseFen, solutionFen).join(''),
  ];
}

function highlightMove(
  priorFen: string,
  currentFen: string,
  squareBracketNotation = false,
): string[] {
  const expandedPriorFen: string = expandFenNumeralsIntoDots(priorFen);
  const expandedCurrentFen: string = expandFenNumeralsIntoDots(currentFen);

  if (expandedPriorFen.length !== expandedCurrentFen.length) throw new Error(`Fen ${expandedPriorFen} and ${expandedCurrentFen} are different lengths.`);

  const openBracket = squareBracketNotation ? '[' : '(';
  const closeBracket = squareBracketNotation ? ']' : ')';
  return expandedCurrentFen.split('').map((notation: string, index: number) => (notation === expandedPriorFen[index] ? notation : `${openBracket}${notation}${closeBracket}`));
}

function reconcileEnemyMove(priorFen: string[], currentFen: string[]): string[] {
  return currentFen.map((notation: string, index: number) => (priorFen[index][0] === '[' && notation[0] !== '(' ? `[${notation}]` : notation));
}

function expandFenNumeralsIntoDots(fen: string) {
  // Remove the ending metadata info.
  const [expandedFen]: string[] = fen.split(' ');

  // Turn the FEN into an array of characters.
  let expandedFenArray: string[] = expandedFen.split('');

  // Map all numerals n in the array to n dots.
  expandedFenArray = expandedFenArray.map((c: string) => (/^\d+$/.test(c) ? '.'.repeat(Number(c)) : c));

  // Rejoin the array into a string FEN.
  return expandedFenArray.join('');
}

export default generateFens;
