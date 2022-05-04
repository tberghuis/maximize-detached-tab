listenReloadCommand();
function listenReloadCommand() {
  chrome.commands.onCommand.addListener((shortcut) => {
    console.log("lets reload");
    console.log(shortcut);
    if (shortcut.includes("+M")) {
      chrome.runtime.reload();
    }
  });
}
console.log("hello background");

chrome.tabs.onDetached.addListener(handleDetached);

async function handleDetached(tabId, { oldWindowId }) {
  const oldWindow = await chrome.windows.get(oldWindowId);
  if (oldWindow.state != "maximized") {
    return;
  }
  chrome.tabs.get(tabId, function (tab) {
    chrome.windows.update(tab.windowId, {
      state: "maximized",
    });
  });
}
