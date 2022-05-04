document.addEventListener("DOMContentLoaded", function () {
  getExtensionEnabled();
});

// function getExtensionEnabled() {
//   chrome.storage.sync.get("enabled", (storage) => {});
// }

async function getExtensionEnabled() {
  const storage = chrome.storage.sync.get("enabled");
  console.log("storage", storage);
}
