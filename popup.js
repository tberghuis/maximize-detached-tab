document.addEventListener("DOMContentLoaded", async function () {
  const enabled = await getExtensionEnabled();

  document.getElementById("extension-enabled").checked = enabled;

  document
    .getElementById("extension-enabled")
    .addEventListener("change", handleCheckboxChange);
});

/////// functions
async function getExtensionEnabled() {
  const storage = await chrome.storage.sync.get("enabled");
  if (storage.enabled === undefined) {
    return true;
  }
  return storage.enabled;
}

function handleCheckboxChange(e) {
  const enabled = document.getElementById("extension-enabled").checked;
  chrome.storage.sync.set({
    enabled: enabled,
  });
}
