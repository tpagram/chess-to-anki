import { Chess } from 'chess.js';

export function generateFens(myMove, engineMove, fen) {
  const chess = new Chess();
  chess.load(fen);
  chess.move(myMove);
  const problemFen = chess.fen();
  chess.undo();
  chess.move(engineMove);
  const solutionFen = chess.fen();

  return [
    highlightFenMoves(fen, problemFen),
    highlightFenMoves(fen, solutionFen),
  ];
}

function highlightFenMoves(priorFen, currentFen) {
  const expandedPriorFen = expandFenNumeralsIntoDots(priorFen);
  const expandedCurrentFen = expandFenNumeralsIntoDots(currentFen);

  if (expandedPriorFen.length !== expandedCurrentFen.length) throw new Error(`Fen ${priorFen} and ${currentFen} are different lengths.`);

  return expandedCurrentFen.split('').map((notation, index) => (notation === expandedPriorFen[index] ? notation : `(${notation})`)).join('');
}

function expandFenNumeralsIntoDots(fen) {
  // Remove the ending metadata info.
  let [expandedFen] = fen.split(' ');

  // Turn the FEN into an array of characters.
  expandedFen = expandedFen.split('');

  // Map all numerals n in the array to n dots.
  expandedFen = expandedFen.map((c) => (/^\d+$/.test(c) ? '.'.repeat(c) : c));

  // Rejoin the array into a string FEN.
  return expandedFen.join('');
}

export default generateFens;
