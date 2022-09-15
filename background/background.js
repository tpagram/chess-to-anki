import { generateFens } from './generateFens';
import { createAnkiCard } from './createAnkiCard';

browser.browserAction.onClicked.addListener(handleClick);

async function handleClick() {
  try {
    const activeTabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    if (activeTabs.length < 1) throw new Error('No active tab available');

    const { myMove, engineMove, fen } = await browser.tabs.sendMessage(activeTabs[0].id, 'extract_move');

    const [problemFen, solutionFen] = generateFens(myMove, engineMove, fen);

    createAnkiCard(problemFen, solutionFen);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
