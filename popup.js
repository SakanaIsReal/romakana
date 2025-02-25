document.getElementById("convert-btn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const conversionType = document.getElementById("conversion-type").value;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => window.getSelection().toString().trim()
    }).then(result => {
        let selectedText = result[0]?.result || "";

        if (!selectedText) {
            alert("No text selected!");
            return;
        }

        let convertedText = selectedText;
        if (conversionType === "hiragana") convertedText = wanakana.toHiragana(selectedText);
        else if (conversionType === "katakana") convertedText = wanakana.toKatakana(selectedText);
        else convertedText = "Kanji conversion is WIP.";

        alert(`Converted: ${convertedText}`);
    }).catch(error => {
        console.error("Error executing script:", error);
    });
});
