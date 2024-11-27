import { createContext, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 10 * index);
    };

    // Asynchronous function to send request to FastAPI backend
    const onSent = async () => {
        if (prevPrompts.includes(input.trim())) {
            console.log("Duplicate prompt detected.");
            return;  // Exit if the prompt has already been sent
        }

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts((prev) => [...prev, input.trim()]); // Add current prompt to previous prompts

        try {
            // Send query to FastAPI backend
            const response = await axios.post("http://localhost:8000/query", { query: input });

            // Get response and context from backend
            const { query, response: generatedResponse, context } = response.data;

            // Process the response into formatted HTML
            let newResponse = generatedResponse
                .split("**")
                .map((part, index) => {
                    return index % 2 === 1 ? `<b>${part}</b>` : part;
                })
                .join("");

            newResponse = newResponse.split("*").join("</br>");

            // Display the response with delay for typing effect
            for (let i = 0; i < newResponse.length; i++) {
                const nextWord = newResponse[i];
                delayPara(i, nextWord); // Gradually append the response to the state
            }

            setLoading(false);
            setInput(""); // Clear the input field
        } catch (error) {
            console.error("Error querying FastAPI:", error);
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
