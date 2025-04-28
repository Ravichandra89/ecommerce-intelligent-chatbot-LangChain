import { useState } from "react";
import axios from "axios";

const App = () => {
  const [messages, setMessage] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessage((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Hit the Post Request
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        message: input, // Correcting the key to 'message'
        userId: "123", // Assuming you have a userId like '123'
      });

      // Prepare the bot response
      const botMessage = { text: response.data.response, sender: "bot" };
      setMessage((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error Sending Message: ", error);
    }
  };

  // Handle input field changes
  const HandleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="w-full flex-grow overflow-y-auto mb-4 p-3 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <p
              className={`text-sm ${
                msg.sender === "user" ? "text-blue-800" : "text-gray-800"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center space-x-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          type="text"
          value={input}
          onChange={HandleInputChanges}
          placeholder="Type your message...."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
