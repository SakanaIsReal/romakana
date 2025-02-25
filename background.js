chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "convertRomaji",
        title: "Convert Romaji to Kana",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "convertRomaji") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: convertSelection,
            args: ["hiragana"]
        });
    }
});