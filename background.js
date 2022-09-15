const chess = require('chess');

browser.browserAction.onClicked.addListener(handleClick);
  


async function handleClick() {
  try {
    const activeTabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    })
    if (activeTabs.length < 1) throw "No active tab available"

    const response = await browser.tabs.sendMessage(activeTabs[0].id, "extract_move")

    console.log("Message from the content script:");
    console.log(response);
  } catch(error) {
    console.error(`Error: ${error}`)
  }
}

function handleResponse(response) {

}




