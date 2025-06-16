// This is the main entry point for your extension.
(function () {
    // A default settings object
    let settings = {
        wordToReplace: 'AI',
        replacementWord: 'Awesome Robot',
        addSuffix: true
    };

    // This function is called when the settings are saved.
    function onSettingsChanged() {
        // Get the new values from the settings panel
        const wordToReplace = document.getElementById('wordToReplace').value;
        const replacementWord = document.getElementById('replacementWord').value;
        const addSuffix = document.getElementById('addSuffix').checked;

        // Update our settings object
        settings = { wordToReplace, replacementWord, addSuffix };
        console.log("[Response Interceptor] Settings updated:", settings);
        toastr.success("Interceptor settings saved!");
    }

    // A function to perform our modification based on the current settings.
    function modifyResponse(message) {
        let modifiedMessage = message;

        // Only perform replacement if both words are defined
        if (settings.wordToReplace && settings.replacementWord) {
            // Create a regular expression to replace all instances, case-insensitively
            const regex = new RegExp(settings.wordToReplace, 'gi');
            modifiedMessage = message.replace(regex, settings.replacementWord);
        }
        
        // Add the suffix if the setting is checked
        if (settings.addSuffix) {
            modifiedMessage += " *[modified]*";
        }

        return modifiedMessage;
    }

    // Listen for the 'before-response-display' event from SillyTavern
    SillyTavern.addEventListener('before-response-display', (event) => {
        if (event.detail.response && event.detail.response.mes) {
            const originalMessage = event.detail.response.mes;
            const modifiedMessage = modifyResponse(originalMessage);
            event.detail.response.mes = modifiedMessage;
        }
    });

    // This function is called when the extension's settings panel is opened.
    SillyTavern.addEventListener('extension-settings-opened-response-interceptor', () => {
        // Populate the settings panel with the current values
        document.getElementById('wordToReplace').value = settings.wordToReplace;
        document.getElementById('replacementWord').value = settings.replacementWord;
        document.getElementById('addSuffix').checked = settings.addSuffix;

        // Add an event listener to the save button
        document.getElementById('interceptor-save-button').addEventListener('click', onSettingsChanged);
    });

    console.log("Smoke Finder extension loaded!");
})();