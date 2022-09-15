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