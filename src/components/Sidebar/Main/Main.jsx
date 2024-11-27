import { useContext, useEffect, useRef } from 'react';
import './Main.css';
import { assets } from '../../../assets/assets';
import { Context } from '../../../context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const resultContainerRef = useRef(null); // Create a ref for the result container

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== "") {
            onSent();
        }
    };

    // Effect to scroll to the bottom whenever resultData changes
    useEffect(() => {
        if (resultContainerRef.current) {
            resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight; // Scroll to bottom
        }
    }, [resultData]); // Depend on resultData to trigger scrolling

    return (
        <div className='main'>
            <div className="nav">
                <p>JP-RAG</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello, it is JP-RAG</span></p>
                            <p>How may I serve you today</p>
                        </div>

                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data" ref={resultContainerRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <img src={assets.ai_smart} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : 
                                // Display formatted result with auto-scrolling
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                            onKeyDown={handleKeyPress}
                        />
                        <div>
                            {/* Uncomment if needed */}
                            {/*<img src={assets.gallery_icon} alt="" />*/}
                            {/*<img src={assets.mic_icon} alt="" />*/}
                            <img
                                onClick={onSent}
                                src={assets.send_icon}
                                alt=""
                            />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        JP-RAG may display inaccurate info, depending on your question, so double-check when you write.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;