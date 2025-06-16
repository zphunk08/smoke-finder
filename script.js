// This is the main entry point for your extension.
(function () {
    // A function to perform our modification.
    // It takes the original message text and returns the modified version.
    function modifyResponse(message) {
        // Let's create a simple rule: replace every instance of "AI" with "Awesome Robot".
        // The 'gi' flags mean: g = global (replace all instances), i = case-insensitive.
        const originalWord = /AI/gi;
        const replacementWord = "Awesome Robot";

        let modifiedMessage = message.replace(originalWord, replacementWord);
        
        // You can add more rules here!
        // For example, let's add a fun suffix to every message.
        modifiedMessage += " *[modified]*";

        // Always return the final message.
        return modifiedMessage;
    }

    // This is the core of the interception.
    // SillyTavern emits an event called 'before-response-display'.
    // We listen for that event. The event data contains the response object.
    SillyTavern.addEventListener('before-response-display', (event) => {
        // The message text is located in event.detail.response.mes
        // It's a good practice to check if it exists first.
        if (event.detail.response && event.detail.response.mes) {
            
            // For debugging: log the original message to the browser console.
            console.log("[Response Interceptor] Original message:", event.detail.response.mes);

            // Get the original message
            const originalMessage = event.detail.response.mes;
            
            // Get the modified message by calling our function
            const modifiedMessage = modifyResponse(originalMessage);

            // IMPORTANT: Overwrite the original message with our modified one.
            // This is what actually changes the text you see in the chat.
            event.detail.response.mes = modifiedMessage;

            // For debugging: log the new message to the browser console.
            console.log("[Response Interceptor] Modified message:", event.detail.response.mes);
        }
    });

    // You can let the user know the extension is loaded.
    console.log("Smoke Finder extension loaded!");

})();