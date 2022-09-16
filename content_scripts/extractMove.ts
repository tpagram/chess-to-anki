import ExtractedMoveData from '../types/ExtractedMoveData';

browser.runtime.onMessage.addListener((request) => {
  if (request !== 'extract_move') return false;
  return extractCurrentMove();
});

async function extractCurrentMove(): Promise<ExtractedMoveData> {
  const myMove = extractMove(0);
  const engineMove = extractMove(1);

  navigateBack();
  const fen = await extractFen();
  const priorEnemyMove = extractMove(0);

  navigateBack();
  const priorFen = await extractFen();

  navigateForwards();
  navigateForwards();

  return {
    myMove,
    engineMove,
    priorEnemyMove,
    fen,
    priorFen,
    chessComLink: document.URL,
  };
}

function extractMove(index: number): string {
  return document.querySelectorAll('.move-san-highlight')[index].textContent || '';
}

function navigateBack() {
  const previousMoveButton = document.querySelector("[data-cy='analysis-secondary-controls-previous-move']") as HTMLElement;
  previousMoveButton.click();
}

function navigateForwards() {
  const nextMoveButton = document.querySelector("[data-cy='analysis-secondary-controls-next-move']") as HTMLElement;
  nextMoveButton.click();
}

async function extractFen(): Promise<string> {
  // Ensure modal is unloaded.
  await waitForElementToUnload("[data-cy='share-menu-modal']");

  const shareButton = document.querySelector('.share') as HTMLElement;
  shareButton.click();

  // Wait for the modal to launch.
  const fenInputText = await waitForElement('div.share-menu-tab-pgn-section:nth-child(1) > input:nth-child(2)') as HTMLInputElement;

  const modalCloseButton = document.querySelector('.ui_outside-close-component') as HTMLElement;
  modalCloseButton.click();

  return fenInputText.value;
}

function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector) as HTMLElement);
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector) as HTMLElement);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function waitForElementToUnload(selector: string): Promise<void> {
  return new Promise((resolve) => {
    if (!document.querySelector(selector)) {
      resolve();
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector(selector)) {
        resolve();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
