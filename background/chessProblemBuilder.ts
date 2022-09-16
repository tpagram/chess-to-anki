import ChessProblem from '../types/ChessProblem';

export default function buildChessProblem(
  problemFen: string,
  solutionFen: string,
  chessComLink: string,
  originalFen: string,
  myMove: string,
  priorEnemyMove: string,
  engineMove: string,
): ChessProblem {
  return {
    problemFen,
    solutionFen,
    chessComLink,
    lichessLink: `https://lichess.org/analysis/${originalFen}`,
    problemText: `Opponent played ${priorEnemyMove} and I played ${myMove}. What's a better move?`,
    solutionText: engineMove,
    blackTurn: originalFen.split(' ')[1] === 'b',
  };
}
