//JavaScript code for the LeetCode Daily Question Redirector.
async function fetchAndRedirect() {
  const url = "https://alfa-leetcode-api.onrender.com/dailyQuestion";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const dailyQuestion = data.data.activeDailyCodingChallengeQuestion;

    if (dailyQuestion && dailyQuestion.link) {
      const questionLink = dailyQuestion.link;
      const fullUrl = "https://leetcode.com" + questionLink;

      console.log("Redirecting to:", fullUrl);

      // Redirect to the URL
      window.location.href = fullUrl;
      window.open(fullUrl, "_blank");
    } else {
      console.error("Link not found");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

document
  .getElementById("navigateButton")
  .addEventListener("click", function () {
    fetchAndRedirect();
  });

//gfg

document.getElementById("gfgButton").addEventListener("click", function () {
  const gfgUrl = "https://www.geeksforgeeks.org/problem-of-the-day";

  // Open the GeeksforGeeks problem of the day page
  chrome.tabs.create({ url: gfgUrl }, function (tab) {
    // Check when the tab is loaded
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        // Inject the content script and fetch the URL
        chrome.tabs.sendMessage(
          tab.id,
          { action: "getGFGUrl" },
          function (response) {
            if (response && response.href) {
              console.log("Redirecting to GFG Problem: " + response.href); // Debugging log
              window.open(response.href, "_blank");
            } else {
              console.error("Failed to fetch URL or Anchor tag not found");
            }
          }
        );

        // Remove the listener after the first invocation
        chrome.tabs.onUpdated.removeListener(listener);
      }
    });
  });
});
