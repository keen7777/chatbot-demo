// chat engine：完全自定义，可扩展，支持上下文记忆
export function generateResponse(input, context = {}) {
    const text = input.toLowerCase().trim();

    // command system:
    // deal with command that starts with /
    if (text.startsWith("/")) {
        switch (text) {
            case "/help":
                return {
                    reply: `Available commands:
 /help - show commands instruction;
 /joke - tell a joke that you like;
 /time - show current time;`,
                    context
                };
            case "/joke":
                return {
                    reply: "Ich bin mit zwei gesunden Füßen gekommen!",   // i really like the joke.^^
                    context
                };
            case "/time":
                return {
                    reply: `Current time is ${new Date().toLocaleTimeString()}`,
                    context
                };
            default:
                return {
                    reply: "Unknown command. Try /help",
                    context
                };
        }
    }

    // initialize context
    let newContext = { ...context };

    // greeting
    if (/(hi|hello|hey)/.test(text)) {
        return {
            reply: `Hello! How can I help you today?
Try these interactions: 
 - Greetings (hello/Goodbye) 
 - Tell me your name ("My name is Alice.") 
 - Ask for an unique ID ("Give me an ID.") 
 - Ask for current time ("what time is it?") 
 - Type /help for command instructions.`, context: newContext
        };
    }

    // tell me your name
    if (text.includes("my name is")) {
        const name = text.split("my name is")[1].trim();
        newContext.name = name;
        return { reply: `Nice to meet you, ${name}!`, context: newContext };
    }

    // search for name if already exist
    if (text.includes("my name?")) {
        if (newContext.name) {
            return { reply: `Your name is ${newContext.name}.`, context: newContext };
        } else {
            return { reply: "I don't know your name yet.", context: newContext };
        }
    }

    // check current date
    if (text.includes("time")) {
        return {
            reply: `Current time is ${new Date().toLocaleTimeString()}`,
            context: newContext
        };
    }

    // generate unique id
    if (text.includes("id")) {
        return { reply: `Here is your unique ID: ${crypto.randomUUID()}`, context: newContext };
    }

    // goodbye
    if (text.includes("bye") || text.includes("goodbye")) {
        return { reply: "Goodbye! Have a nice day!", context: newContext };
    }

    // --- default answering if cannot process the question（fallback）---
    return { reply: "I'm still learning. Can you rephrase that?", context: newContext };
}