document.getElementById("convert-btn").addEventListener("click", async () => {
    console.log("Button clicked"); // ✅ Debug Step 1

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("Active tab:", tab); // ✅ Debug Step 2

    const conversionType = document.getElementById("conversion-type").value;
    console.log("Selected conversion type:", conversionType); // ✅ Debug Step 3

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getSelectedText
    }).then(results => {
        console.log("Execution results:", results); // ✅ Debug Step 5

        let selectedText = results[0]?.result || "";
        console.log("Selected text:", selectedText); // ✅ Debug Step 6

        if (!selectedText) {
            console.warn("No text selected!"); // ✅ Debug Step 7
            return;
        }

        let convertedText = selectedText;
        if (typeof wanakana !== "undefined") {
            if (conversionType === "hiragana") {
                convertedText = wanakana.toHiragana(selectedText);
            } else if (conversionType === "katakana") {
                convertedText = wanakana.toKatakana(selectedText);
            } else {
                convertedText = "Kanji conversion is WIP.";
            }
        } else {
            console.error("Wanakana is not loaded.");
        }

        console.log("Converted text:", convertedText); // ✅ Debug Step 8
        copyToClipboard(convertedText);
    }).catch(error => {
        console.error("Error executing script:", error); // ✅ Debug Step 9
    });
});

// Function to run inside the webpage to get selected text
function getSelectedText() {
    console.log("Executing script in the tab..."); // ✅ Debug Step 4
    return window.getSelection().toString().trim();
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard:", text);
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
}
