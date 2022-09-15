// 1. Save whether best move mode is on or not.
// 2. Turn on best move mode if it isn't on.
// 3. Extract what the mistake notation is and the best move notation is.
// 4. Go to the previous move
// 5. Extract the FEN.
// 6. Go back to the next move.
// 7. Revert best move mode to original setting.
// 8. Add highlights to the FEN.
// 9. ??? Anki stuff to figure out later.


// Example FEN and moves. 
// Qd7
// O-O
// r1bqk2r/ppp2ppp/2np1n2/2b1p1N1/2B1P3/1PN5/P1PP1PPP/R1BQK2R b KQkq - 3 6


browser.runtime.onMessage.addListener((request) => {
  if (request != "extract_move") return false
  return extractCurrentMove()
});

async function extractCurrentMove() {
  const [myMove, engineMove] = extractMoves()
  return {
    myMove: myMove,
    engineMove: engineMove,
    fen: await extractFenFromPreviousMove()
  }
}

function extractMoves() {
  const highlightedMoves = document.querySelectorAll('.move-san-highlight')
  return [...highlightedMoves].map((node) => {
      return node.textContent
  }) 
}

async function extractFenFromPreviousMove() {
  const previousMoveButton = document.querySelector("[data-cy='analysis-secondary-controls-previous-move']")
  previousMoveButton.click()

  const shareButton = document.querySelector(".share")
  shareButton.click()

  // Wait for the modal to launch.
  const fenInputText = await waitForElement("div.share-menu-tab-pgn-section:nth-child(1) > input:nth-child(2)")

  const modalCloseButton = document.querySelector(".ui_outside-close-component")
  modalCloseButton.click()

  const nextMoveButton = document.querySelector("[data-cy='analysis-secondary-controls-next-move']")
  nextMoveButton.click()

  return fenInputText.value
}

function addHighlightsToFen(fen,move) {
  if (["e.p.", "=", "0-0", "0-0-0"].some(notation => move.includes(notation))) {
      throw "Move not yet implemented"
  }
  move = move.str.replace('+', '');

}
const test1 = conditions.some(el => str1.includes(el));


function waitForElement(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}