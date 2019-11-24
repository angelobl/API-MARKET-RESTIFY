import React from "react";
import { connect, sendMessage } from "../socket";

const color = `rgba(${Math.floor(Math.random() * (256 - 0 + 1)) +
  0},${Math.floor(Math.random() * (256 - 0 + 1)) + 0},${Math.floor(
  Math.random() * (256 - 0 + 1)
) + 0},1)`

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      listMessages: []
    };
  }

  componentDidMount() {
    connect(
      this.props.owner,
      message => {
        console.log("Socket conectado");
        let messages = this.state.listMessages;
        messages.push(message);
        this.setState({ listMessages: messages });
      },
      user => {
        let messages = this.state.listMessages;
        messages.push({ message: `${user} se conecto al chat` });
        this.setState({ listMessages: messages });
      }
    );
    
    
  }

  handleChange = e => {
    const { value } = e.target;

    this.setState({ message: value });
  };

  handleSend = () => {
    sendMessage({ owner: this.props.owner, message: this.state.message, color:color });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="page-container">
        <div className="content-chat card blue-grey darken-1">
          <div className="chat-text">
            {this.state.listMessages.map(m => (
              <div key={Math.random()}>
                <span style={{ fontWeight: "bold",color:m.color}}>
                  {m.owner}
                </span>
                {m.owner ? <span>: </span> : null}
                <span key={Math.random()} style={{ color:m.owner ? "" : "rgba(46, 49, 49, 1)" }}>
                  {m.message}
                </span>
              </div>
            ))}
          </div>
          <div className="chat-send">
            <input
              onChange={this.handleChange}
              value={this.state.message}
              className="chat-input"
              placeholder="Escribe un mensaje"
            />
            <button
              onClick={this.handleSend}
              className="waves-effect waves-light btn app-btn"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
