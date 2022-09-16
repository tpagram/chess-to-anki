import { generateFens } from './generateFens';
import { createAnkiCard } from './createAnkiCard';
import ExtractedMoveData from '../types/ExtractedMoveData';
import buildChessProblem from './chessProblemBuilder';
import ChessProblem from '../types/ChessProblem';

browser.browserAction.onClicked.addListener(handleClick);

async function handleClick() {
  try {
    const activeTabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    if (activeTabs.length < 1 || activeTabs[0].id === undefined) throw new Error('No active tab available');

    const {
      myMove,
      engineMove,
      fen,
      priorFen,
      chessComLink,
      priorEnemyMove,
    } = await browser.tabs.sendMessage(activeTabs[0].id, 'extract_move') as ExtractedMoveData;

    const [problemFen, solutionFen] = generateFens(
      myMove,
      engineMove,
      priorEnemyMove,
      priorFen,
    );

    const chessProblem: ChessProblem = buildChessProblem(
      problemFen,
      solutionFen,
      chessComLink,
      fen,
      myMove,
      priorEnemyMove,
      engineMove,
    );

    await createAnkiCard(chessProblem);
  } catch (error: unknown) {
    console.error(`Error: ${String(error)}`);
  }
}
