import dayjs from 'dayjs';
import { useState } from "react";
import { Chatbot } from 'supersimpledev'
import { generateResponse } from '../utils/chatEngine';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';


import './ChatInput.css';

export function ChatInput({ setChatMessages, isLoading, setIsLoading, context, setContext}) {
  const [inputText, setInputText] = useState('');
  function saveInputText(event) {
    setInputText(event.target.value)
  }

  async function sendMessage() {
    // ... is spread operator, copy paste old values to new array.
    /**lifting the state up = share state between multiple components, we want to move [] to <App> so that ChatInput also can use that
     *  <App>
     * <ChatInput> --- <ChatMessages>, [ChatMessages setChatMessages]
     * ~~~       --- ChatMessage1,ChatMessage2....
    */

    // no new msg while 
    if (isLoading) return;


    // Avoid sending empty message.
    if (!inputText.trim()) return;

    // new state!!! only responsible for UI interaction, no multiple Loading allowed.
    setIsLoading(true);

    const userMessage = {
      message: inputText,
      sender: "user",
      id: crypto.randomUUID(),
      time: dayjs().valueOf()
    };

    // clear the input box, and value on <input />
    setInputText('');

    // deal with Loading message, need concrete id to replace with real answer.
    const loadingMessageId = crypto.randomUUID();

    const loadingMessage = {
      message: <img src={LoadingSpinnerImage} className="loading-spinner" />,
      sender: "robot",
      id: loadingMessageId,
      time: dayjs().valueOf()
    };

    setChatMessages(prev => [
      ...prev,
      userMessage,
      loadingMessage
    ]);


    // ----- with my own engine!
    /**
    const response = await Chatbot.getResponseAsync(inputText);
    // here we use prev to get current state, then map , check if msg id matching Loading id, if so then replace msg with real response, else stay the same.
    setChatMessages(prev =>
      prev.map(msg =>
        msg.id === loadingMessageId
          ? { ...msg, message: response }
          : msg
      )
    );
    setIsLoading(false);
     */
    // 模拟 AI 延迟，保留 loading
    await new Promise(resolve => setTimeout(resolve, 600));

    // call engine
    const { reply, context: newContext } = generateResponse(inputText, context);

    // replace loading message
    setChatMessages(prev =>
      prev.map(msg =>
        msg.id === loadingMessageId
          ? { ...msg, message: reply }
          : msg
      )
    );

    // 更新上下文
    setContext(newContext);

    setIsLoading(false);

  }

  function clearLocalStorage() {
    //localStorage.setItem('messages', JSON.stringify([]));
    // if use localstorage, i have to manually refresh!
    setChatMessages([]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }

    if (event.key === 'Escape') {
      setInputText('');
    }
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder={
          isLoading ? "Chatbot is typing..." : "Send a message"
        }
        size='30'
        //that's get the input value using React, not DOM
        onChange={saveInputText}
        // input use keydown
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />

      <button
        // click use button 
        disabled={isLoading}
        onClick={sendMessage}
        // the same as class="xxx" in HTML
        className="send-btn"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>

      <button
        // clear button
        disabled={isLoading}
        onClick={clearLocalStorage}
        // the same as class="xxx" in HTML
        className="clear-btn"
      >
        {"Clear"}
      </button>
    </div>
  )
  // without div it's a fragment, remove the redundant div layer.
}