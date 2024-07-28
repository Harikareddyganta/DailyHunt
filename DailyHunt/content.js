console.log("Content script loaded.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getGFGUrl") {
    const anchorTag = document.getElementById("potd_solve_prob");
    const href = anchorTag ? anchorTag.href : null;
    console.log("Anchor tag href:", href); // Debugging line
    sendResponse({ href });
  }
});
