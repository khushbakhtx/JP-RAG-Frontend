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

    const onSent = async () => {
        if (prevPrompts.includes(input.trim())) {
            console.log("Duplicate prompt detected.");
            return;  
        }

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts((prev) => [...prev, input.trim()]); 

        try {
            const response = await axios.post("http://localhost:8000/query", { query: input });

            const { query, response: generatedResponse, context } = response.data;

            let newResponse = generatedResponse
            .split("**")
            .map((part, index) => {
                return index % 2 === 1 ? `<b>${part}</b>` : part;
            })
            .join("");
        
            newResponse = newResponse.split("*").join("</br>");
            newResponse = newResponse.replace(/(\d+\.\s)/g, "<br/><br/>$1"); 
            newResponse = newResponse.replace(/(<br\/>){2,}/g, "<br/><br/>");    

            for (let i = 0; i < newResponse.length; i++) {
                const nextWord = newResponse[i];
                delayPara(i, nextWord); 
            }

            setLoading(false);
            setInput(""); 
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
