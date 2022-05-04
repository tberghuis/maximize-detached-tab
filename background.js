// comment out for release
listenReloadCommand();

console.log("hello background");

chrome.tabs.onDetached.addListener(handleDetached);

//////// functions
function listenReloadCommand() {
  chrome.commands.onCommand.addListener((shortcut) => {
    console.log("lets reload");
    console.log(shortcut);
    if (shortcut.includes("+M")) {
      chrome.runtime.reload();
    }
  });
}

async function handleDetached(tabId, { oldWindowId }) {
  const enabled = await getExtensionEnabled();
  if (!enabled) {
    return;
  }

  try {
    const oldWindow = await chrome.windows.get(oldWindowId);
    if (oldWindow.state != "maximized") {
      return;
    }
  } catch (e) {
    // window was a single tab
    console.log("error", e);
    return;
  }

  try {
    chrome.tabs.get(tabId, function (tab) {
      chrome.windows.update(tab.windowId, {
        state: "maximized",
      });
    });
  } catch (e) {
    // this shouldn't happen
    console.log("error", e);
  }
}

async function getExtensionEnabled() {
  const storage = await chrome.storage.sync.get("enabled");
  if (storage.enabled === undefined) {
    return true;
  }
  return storage.enabled;
}
