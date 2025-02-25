document.getElementById("convert-btn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const conversionType = document.getElementById("conversion-type").value;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: convertSelection,
        args: [conversionType]
    });
});

function convertSelection(conversionType) {
    let selectedText = window.getSelection().toString().trim();
    if (!selectedText) {
        alert("No text selected!");
        return;
    }

    // Use Wanakana for Hiragana/Katakana
    import("https://unpkg.com/wanakana").then(wanakana => {
        let result = selectedText;
        if (conversionType === "hiragana") result = wanakana.toHiragana(selectedText);
        else if (conversionType === "katakana") result = wanakana.toKatakana(selectedText);
        else result = "Kanji conversion is WIP.";

        alert(`Converted: ${result}`);
    });
}
