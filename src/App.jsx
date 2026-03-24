import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'

import './App.css'
import { Chatbot } from 'supersimpledev';



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState({});
  let [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))||[]);
  
  // e5h: more features, more responses
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'answer': 'it is 42!!!',
      'give me a unique id': function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  }, []);
  // store to localstorage if msgs changed
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages]);

  return (
    // Name Convention: notice that name for components, props,data all use the same name
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        context={context}          // 传入当前上下文
        setContext={setContext}    // 传入更新函数
      />
    </div>
  );
}

export default App
