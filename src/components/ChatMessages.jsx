import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage';

import './ChatMessages.css';

function ChatMessages({ chatMessages }) {

    const chatMessagesRef = useAutoScroll([chatMessages]);
    if (chatMessages.length === 0) {
        return (
            <div className='chat-init-msg-container'>
                <div className='chat-init-msg'>Welcome to the chatbot project! Send a message using the textbox below</div>
            </div>
        );
    }



    return (
        <div className="chat-msgs-container"
            ref={chatMessagesRef}
        >
            {/*{} = save any type of value in a prop(also apply for a function*/}
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        time={chatMessage.time}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}

function useAutoScroll(dependencies) {
    const containerRef = useRef(null);
    //auto scroll the page: using hook, hook always at the top of a component
    useEffect(() => {
        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.scrollTop = containerElement.scrollHeight;
        }
    }, [dependencies]);
    return containerRef;
}

export default ChatMessages;