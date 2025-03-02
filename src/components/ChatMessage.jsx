import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import classNames from 'classnames';

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isBot = sender === 'bot';
  
  // Format timestamp
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(timestamp));

  return (
    <div className={classNames(
      "flex items-start space-x-2 max-w-[80%]",
      { "ml-auto": !isBot }
    )}>
      {isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
        </div>
      )}
      
      <div className={classNames(
        "py-2 px-4",
        isBot ? "chat-bubble-bot" : "chat-bubble-user order-1"
      )}>
        <div className="whitespace-pre-wrap">
          {text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <div className={classNames(
          "text-xs mt-1",
          isBot ? "text-gray-500" : "text-indigo-100"
        )}>
          {formattedTime}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;