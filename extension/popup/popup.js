// console.log('wow')
// document.addEventListener("click", (e) => {
//   console.log(e);

// })


document.addEventListener("click", (event) => {
  console.log('wow')
  const chosenPage = `https://google.com`
  browser.tabs.create({
    url: chosenPage,
  });
});