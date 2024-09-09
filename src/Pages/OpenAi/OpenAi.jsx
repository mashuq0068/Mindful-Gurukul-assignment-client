import { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCIPbd_M3n3IboNi46yDTKSP1krUYSI8LU");
function OpenAi() {
  const [prompt1, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = prompt1;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    setResponse(response);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-4">OpenAI with MERN Stack</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={prompt1}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
          >
            Generate
          </button>
        </form>
        <div>
          <h2 className="text-lg font-semibold">Response:</h2>
          <p className="text-gray-800">{response}</p>
        </div>
      </div>
    </div>
  );
}

export default OpenAi;
