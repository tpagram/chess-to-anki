const Chess = require("chess");

browser.browserAction.onClicked.addListener(handleClick);

async function handleClick() {
  try {
    const activeTabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    })
    if (activeTabs.length < 1) throw "No active tab available"

    const { myMove, engineMove, fen } = await browser.tabs.sendMessage(activeTabs[0].id, "extract_move")

    console.log(generateFens(myMove, engineMove, fen))
  } catch(error) {
    console.error(`Error: ${error}`)
  }
}

function generateFens(myMove, engineMove, fen) {
  const chess = new Chess()
  chess.load(fen)
  chess.move(myMove)
  problemFen = chess.fen()
  chess.undo()
  chess.move(engineMove)
  solutionFen = chess.fen()

  return [
    highlightFenMoves(fen, problemFen),
    highlightFenMoves(fen, solutionFen)
  ]
}

function highlightFenMoves(priorFen, currentFen) {
  if (priorFen.length != currentFen.length) throw "Fen ${priorFen} and ${currentFen} are different lengths."

  expandedPriorFen = expandFenNumeralsIntoDots(priorFen)
  expandedCurrentFen = expandFenNumeralsIntoDots(currentFen)

  return expandedCurrentFen.map((notation, index) => {
    notation == currentFen[index] ? notation : "(" + notation + ")"
  }).join("")
}

function expandFenNumeralsIntoDots(fen) {
  fen.split("").map(c => /^\d+$/.test(c) ? ".".repeat(c) : c)
}




