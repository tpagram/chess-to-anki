import ChessProblem from '../types/ChessProblem';

export default function buildChessProblem(
  problemFen: string,
  solutionFen: string,
  chessComLink: string,
  originalFen: string,
  myMove: string,
  priorEnemyMove: string,
  engineMove: string,
  mode: string,
): ChessProblem {
  const problemText = () => {
    if (mode === 'bestmove') return `Opponent played ${priorEnemyMove}. What's the best move here?`;
    return `Opponent played ${priorEnemyMove} and I played ${myMove}. What's a better move?`;
  };

  const solutionText = () => {
    if (mode === 'bestmove') return `${engineMove}. In the game I played ${myMove}.`;
    return engineMove;
  };

  return {
    problemFen,
    solutionFen,
    chessComLink,
    lichessLink: `https://lichess.org/analysis/${originalFen}`,
    problemText: problemText(),
    solutionText: solutionText(),
    blackTurn: originalFen.split(' ')[1] === 'b',
  };
}
