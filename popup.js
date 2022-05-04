document.addEventListener("DOMContentLoaded", async function () {
  const enabled = await getExtensionEnabled();

  document.getElementById("extension-enabled").checked = enabled;

  document
    .getElementById("extension-enabled")
    .addEventListener("change", handleCheckboxChange);
});

async function getExtensionEnabled() {
  const storage = await chrome.storage.sync.get("enabled");
  console.log("storage", storage);
  console.log("storage.enabled", storage.enabled);
  if (storage.enabled === undefined) {
    console.log("udefined");
    return true;
  }
  return storage.enabled;
}

function handleCheckboxChange(e) {
  console.log("handleCheckboxChange", e);

  const enabled = document.getElementById("extension-enabled").checked;
  chrome.storage.sync.set({
    enabled: enabled,
  });
}
