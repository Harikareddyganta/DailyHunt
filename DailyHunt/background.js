chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchGFGUrl") {
      fetch("https://www.geeksforgeeks.org/problem-of-the-day")
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const anchorTag = doc.getElementById("potd_solve_prob");
          const href = anchorTag ? anchorTag.href : null;
          sendResponse({ href });
        })
        .catch(error => {
          console.error("Error fetching the page:", error);
          sendResponse({ error: "Failed to fetch URL" });
        });
      return true; // Indicates that sendResponse will be called asynchronously
    }
  });
  