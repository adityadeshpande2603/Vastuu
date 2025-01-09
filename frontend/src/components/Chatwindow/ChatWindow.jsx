import { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { format } from "timeago.js";

import { useNotificationStore } from "../../lib/notificationStore";
import { AuthContext } from "../../lib/Context/AuthContext";
import { SocketContext } from "../../lib/Context/SocketContext";
const ChatWindow = ({ chat, setChat, id, receiver, open, setOpen }) => {

    // console.log(chat)


    const [chatSinglePage, setChatSinglePage] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null); // New state for selected chat
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();
    const decrease = useNotificationStore((state) => state.decrease);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat,chatSinglePage]);

    const handleOpenChat = async (id, receiver) => {// chat id
        // console.log(receiver);
        try {
            const res = await axios.get(`http://localhost:3000/api/chats/${id}`, {
                withCredentials: true,
            });
            console.log(res);
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
            }
            setChatSinglePage({ ...res.data, receiver });
            // console.log(chatSinglePage);

            // setSelectedChatId(id); // Track selected chat ID
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (open) {
            handleOpenChat(id, receiver);
        }
    }, [open, id, receiver]);
    const handleCloseChat = () => {
       if(chat) setChat(null); // Close the chat window
        else setChatSinglePage(null); // Close the chat window
        setOpen(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello");

        const formData = new FormData(e.target);
        const text = formData.get("text");

        if (!text) return;

        try {
            const res = await axios.post(
                `http://localhost:3000/api/messages/${chat?.id || chatSinglePage?.id}`,
                { text },
                { withCredentials: true }
            );
            if (open) {
                setChatSinglePage((prev) => ({
                    ...prev,
                    messages: [...prev.messages, res.data],
                }));
            }
            else {
                setChat((prev) => ({
                    ...prev,
                    messages: [...prev.messages, res.data],
                }));
            }
          
            if (open) {
                socket.emit("sendMessage", {
                    receiverId: chatSinglePage.receiver.id,
                    data: res.data,
                });
            }
            else {
                socket.emit("sendMessage", {
                    receiverId: (chat?.receiver.id || chatSinglePage.receiver.id),
                    data: res.data,
                });
            }
            e.target.reset();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const read = async () => {
            try {
                await axios.put(`/chats/read/${chat.id}`);
            } catch (err) {
                console.log(err);
            }
        };


        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat((prev) => ({
                        ...prev,
                        messages: [...prev.messages, data],
                    }));
                    read();
                }
            });
        }
        if (chatSinglePage && socket) {
            socket.on("getMessage", (data) => {
                if (chatSinglePage.id === data.chatId) {
                    setChatSinglePage((prev) => ({
                        ...prev,
                        messages: [...prev.messages, data],
                    }));
                    read();
                }
            });
        }
        return () => {
            socket.off("getMessage");
        };
    }, [socket, (chat || chatSinglePage)]);

    return (
        <div>
            {(chat || chatSinglePage) && (
                <div className="chatBox flex flex-col h-1/2 border-t border-gray-300 p-4 ">
                    {/* Top Section */}
                    {/* {console.log("holla")} */}
                    <div className="top flex justify-between p-4 border-b bg-orange-200">
                        <div className="user flex items-center">
                            {/* {console.log(chatSinglePage)}; */}
                            {/* {console.log(chat)}; */}
                            <img
                                src={(chat?.receiver?.avatar || chatSinglePage?.receiver?.avatar) || "/noavatar.jpg"}
                                alt="avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            {chat?.receiver?.username || chatSinglePage?.receiver?.username}
                        </div>
                        <span
                            className="close cursor-pointer text-xl font-bold"
                            onClick={handleCloseChat}
                        >
                            &times;
                        </span>
                    </div>

                    {/* Chat Messages Section */}

                    <div className="center overflow-y-auto p-4 flex-1 w-full flex flex-col bg-white gap-2 overflow-auto ">
                        {chat?.messages && chat?.messages?.length > 0 ? (
                            chat?.messages?.map((message) => (
                                <div
                                    key={message?.id}
                                    className={`chatMessage ${message?.userId === currentUser.id
                                        ? "own text-right self-end bg-blue-100 p-2 rounded-md"
                                        : "self-start bg-gray-100 p-2 rounded-md"
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <span className="text-xs text-gray-500">
                                        {format(message?.createdAt)}
                                    </span>
                                </div>
                            ))
                        ) :
                            chatSinglePage?.messages && chatSinglePage?.messages?.length > 0 ? (
                                chatSinglePage?.messages?.map((message) => (
                                    <div
                                        key={message?.id}
                                        className={`chatMessage ${message?.userId === currentUser.id
                                            ? "own text-right self-end bg-blue-100 p-2 rounded-md"
                                            : "self-start bg-gray-100 p-2 rounded-md"
                                            }`}
                                    >
                                  
                                        <p className="text-sm">{message.text}</p>
                                        <span className="text-xs text-gray-500">
                                            {format(message?.createdAt)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No messages yet.</p>
                            )}
                        <div ref={messageEndRef}></div>
                    </div>

                    {/* Input Section */}
                    <form
                        className="bottom flex items-center border-t w-full mt-2"
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            name="text"
                            className="p-2 border rounded mr-2 flex-1 resize-none"
                            placeholder="Type a message..."
                        ></textarea>
                        <button className="bg-orange-200 px-4 py-2 rounded text-black font-bold">
                            Senddddd
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChatWindow;
