import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../assets/fr4.jpg";
import Navbars from "../Navbar";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" || media) {
      const newMessageObj = {
        sender: "You",
        text: newMessage,
        media: media,
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
      setMedia(null);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
  };

  const handleMediaDownload = (media) => {
    const url = URL.createObjectURL(media);
    const a = document.createElement("a");
    a.href = url;
    a.download = `downloaded_media_${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Navbars />
      <div style={backgroundStyle}>
        <div className="container mt-5 ">
          <div className="row" style={{ marginLeft: "320px" }}>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Forum Garden Plants</div>
                <div className="card-body chat-box text-start">
                  {messages.map((message, index) => (
                    <div key={index} className="message">
                      <div>
                        <strong>{message.sender}:</strong>
                      </div>
                      {message.text && <div>{message.text}</div>}
                      {message.media && (
                        <div>
                          <img
                            src={URL.createObjectURL(message.media)}
                            alt="Media"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                          />
                          <Button
                            variant="link"
                            onClick={() => handleMediaDownload(message.media)}
                            className="download-icon"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleMediaChange}
                    />
                    <Button variant="success" onClick={handleSendMessage}>
                      Send
                    </Button>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
