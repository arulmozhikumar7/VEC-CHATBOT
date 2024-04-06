import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const initialGreetingRef = useRef(false);

  const handleQuery = async () => {
    if (!userInput) return;

    try {
      addUserMessage(userInput);
      setUserInput("");
      addBotMessage("Typing...", true);

      const response = await axios.post(
        "https://vec-chatbot-web.onrender.com/api/chat",
        {
          message: userInput,
        }
      );

      const botResponse = response.data.botResponse;

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isTyping)
      );

      addBotMessage(botResponse);
    } catch (error) {
      console.error("Error handling query:", error);
    }
  };

  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message, id: prevMessages.length },
    ]);
  };

  const addBotMessage = (message, isTyping = false) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "bot",
        content: message,
        id: prevMessages.length,
        isHtml: true,
        isTyping,
      },
    ]);
  };

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isChatboxOpen && !initialGreetingRef.current) {
      addBotMessage(
        "Hello! I am the Admin Bot. Ask your queries about college."
      );
      initialGreetingRef.current = true;
    }
  }, [isChatboxOpen]);

  return (
    <>
      <div
        className={`fixed right-0 top-5 ${
          isChatboxOpen ? "" : "hidden"
        } min-h-full`}
      >
        <div className={`fixed bottom-0 top-4 right-4 w-96 min-h-full`}>
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between p-4 text-white border-b rounded-t-lg bg-amber-500">
              <img
                src="/vec.png"
                alt=""
                width={"7%"}
                height={"7%"}
                className="bg-white rounded-full"
              />{" "}
              <p className="pr-40 font-bold">VEC QUERY BOT</p>
              <button
                id="close-chat"
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                onClick={() => setIsChatboxOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div id="chatbox" className="p-4 overflow-y-auto h-80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 ${msg.role === "user" ? "text-right" : ""}`}
                >
                  <p
                    className={`rounded-lg py-2 px-4 inline-block ${
                      msg.role === "user"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {msg.isTyping ? (
                      <span className="animate-ping">Typing...</span>
                    ) : msg.isHtml ? (
                      parse(msg.content)
                    ) : (
                      msg.content
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex p-4 border-t">
              <input
                id="user-input"
                type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-0"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                id="send-button"
                className="px-4 py-2 text-white transition duration-300 bg-amber-500 rounded-r-md hover:bg-amber-600"
                onClick={handleQuery}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          id="open-chat"
          className={`flex items-center px-4 py-4 text-white transition duration-300 bg-amber-500 rounded-full hover:bg-amber-600 ${
            !isChatboxOpen ? "" : "hidden"
          }`}
          onClick={() => {
            setIsChatboxOpen(!isChatboxOpen);
          }}
        >
          <IoChatbubbleEllipsesSharp size={24} />
        </button>
      </div>
    </>
  );
};

export default App;
