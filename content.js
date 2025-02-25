chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "convert") {
        let selectedText = window.getSelection().toString().trim();
        sendResponse({ text: selectedText });
    }
});
