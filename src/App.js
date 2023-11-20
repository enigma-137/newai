import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import bot from "./images/bot.png"


const App = () => {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([])

  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed (key code 13)
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents a new line from being added
      getResponse(); // Call your function to handle sending the response
    }
  };

  const getResponse = async () => {

    const response = await fetch(`http://localhost:8000/prompt/${text}`)
    console.log(response)
    const data = await response.json()
    setMessages([...messages, {
      author: data.messages[0].content,
      bot: data.candidates[0].content
    }])

    setText('')
  }
  
  console.log(text)
  return (
    <div className="container">

    
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <img src={bot} alt="bot"/>
          <h2>Enigma AI</h2>
        </div>

      </div>
      <div className="feed ">
        {messages?.map((message, _index) =>
          <div key={_index}>
           <div className="question bubble">{message.author}</div>
            <div className="response bubble">{message.bot}</div>
            
          </div>
        )}



      </div>
      {/* text area */}
      <input value={text} onKeyDown={handleKeyDown} onChange={e => setText(e.target.value)} placeholder="Ask me anything here" type="text"/>
      <button onClick={getResponse}> <SendHorizontal className='send' /> </button>
    </div>

    <footer>
      <p>© 2023 An Experimental AI <span role="img" aria-label="heart">❤️</span> by <a href="https://twitter.com/enigma137x" target="_blank" rel="noopener noreferrer">Enigma</a>
      </p>
    </footer>
    </div>
  );
}

export default App;
