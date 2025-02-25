document.getElementById("convert-btn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const conversionType = document.getElementById("conversion-type").value;

    console.log("Button clicked, sending script to tab:", tab.id, "Conversion type:", conversionType);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: convertSelection,
        args: [conversionType]
    });
});

function convertSelection(conversionType) {
    let selectedText = window.getSelection().toString().trim();
    console.log("Selected text:", selectedText);

    if (!selectedText) {
        alert("No text selected!");
        return;
    }

    import("https://unpkg.com/wanakana").then(wanakana => {
        let result = selectedText;
        if (conversionType === "hiragana") result = wanakana.toHiragana(selectedText);
        else if (conversionType === "katakana") result = wanakana.toKatakana(selectedText);
        else result = "Kanji conversion is WIP.";

        console.log("Converted text:", result);
        alert(`Converted: ${result}`);
    }).catch(error => {
        console.error("Error loading wanakana:", error);
    });
}
