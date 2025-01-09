import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../lib/Context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { SocketContext } from "../lib/Context/SocketContext";
import { useNotificationStore } from "../lib/notificationStore";
import ChatWindow from "./Chatwindow/ChatWindow";

function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null); // New state for selected chat
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();
    const decrease = useNotificationStore((state) => state.decrease);

    // useEffect(() => {
    //     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [chat]);

    const handleOpenChat = async (id, receiver) => {
        console.log(receiver);
        try {
            const res = await axios.get(`http://localhost:3000/api/chats/${id}`, {
                withCredentials: true,
            });
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
            }
            setChat({ ...res.data, receiver });
            setSelectedChatId(id); // Track selected chat ID
        } catch (err) {
            console.log(err);
        }
    };

    // const handleCloseChat = () => {
    //     setChat(null); // Close the chat window
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.target);
    //     const text = formData.get("text");

    //     if (!text) return;

    //     try {
    //         const res = await axios.post(
    //             `http://localhost:3000/api/messages/${chat.id}`,
    //             { text },
    //             { withCredentials: true }
    //         );
    //         setChat((prev) => ({
    //             ...prev,
    //             messages: [...prev.messages, res.data],
    //         }));
    //         e.target.reset();
    //         socket.emit("sendMessage", {
    //             receiverId: chat.receiver.id,
    //             data: res.data,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     const read = async () => {
    //         try {
    //             await axios.put(`/chats/read/${chat.id}`);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     if (chat && socket) {
    //         socket.on("getMessage", (data) => {
    //             if (chat.id === data.chatId) {
    //                 setChat((prev) => ({
    //                     ...prev,
    //                     messages: [...prev.messages, data],
    //                 }));
    //                 read();
    //             }
    //         });
    //     }
    //     return () => {
    //         socket.off("getMessage");
    //     };
    // }, [socket, chat]);

    return (
        <div className="chat flex flex-col h-screen relative">
            <div className="messages flex flex-col gap-3 overflow-y-auto h-1/2 p-4">
                <h1>Messages</h1>
                {console.log(chats)};
                {chats.map((c) => (
                    <div
                        key={c.id}
                        className={`message flex gap-2 ${selectedChatId === c.id || c.seenBy.includes(currentUser.id)
                            ? "bg-white"
                            : "bg-yellow-500"
                            } items-center p-2 rounded-sm m-2`}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img
                            src={c?.receiver?.avatar || "./noavatar.jpg"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-bold">{c?.receiver?.username}</span>
                        <p>{c.receiver?.lastMessage}</p>
                    </div>
                ))}
            </div>

            {/* ChatWindow Component */}

            <div className="absolute bottom-0 w-full h-1/2 bg-gray-100 border-t shadow-lg overflow-auto">
                <ChatWindow chat={chat} setChat={setChat} handleOpenChat={handleOpenChat} />
            </div>


            {/* {chat && (
                <div className="chatBox flex flex-col h-1/2 border-t border-gray-300 p-4">
                    <div className="top flex justify-between p-4 border-b bg-orange-200">
                        <div className="user flex items-center">
                            <img
                                src={chat.receiver.avatar || "/noavatar.jpg"}
                                alt="avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            {chat.receiver.username}
                        </div>
                        <span
                            className="close cursor-pointer"
                            onClick={handleCloseChat}
                        >
                            X
                        </span>
                    </div>

                    <div className="center overflow-y-auto p-4 flex-1 w-full flex flex-col bg-white gap-2">
                        {chat.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chatMessage ${
                                    message.userId === currentUser.id
                                        ? "own text-right items-end"
                                        : "w-1/2"
                                }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <span className="text-xs bg-yellow-300">
                                    {format(message.createdAt)}
                                </span>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
                    </div>

                    <form
                        className="bottom flex items-center border-t w-full"
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            name="text"
                            className="p-2 border rounded mr-2 size-10 w-full"
                            placeholder="Type a message"
                        ></textarea>
                        <button className="bg-orange-200 px-4 py-2 rounded text-black font-bold">
                            Send
                        </button>
                    </form>
                </div>
            )} */}
        </div>
    );
}

export default Chat;