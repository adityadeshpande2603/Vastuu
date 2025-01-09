import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Card from "../../components/CardComponent/Card";
import Chat from "../../components/Chat";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../lib/Context/AuthContext";
// import { useLoaderData } from "react-router-dom";

const Profile = () => {
    const { currentUser, updateUser } = useContext(AuthContext);


    const navigate = useNavigate();

    let data = useLoaderData();
    let user = data.response;


    const posts = user.savedPosts.map((e) => e.post);
    // 



    const handleLogout = async () => {
        try {
            await axios.post("https://vastuu.onrender.com/api/auth/logout", {}, { withCredentials: true });
            updateUser(null);
            navigate("/");
        } catch (err) {

        }
    };

    if (!user) {
        return <div>Loading...</div>; // Show a loading state while fetching user data
    }

    return (
        <div className="flex h-full">
            <div className="left flex-[3] h-screen overflow-y-auto p-4">
                <div className="flex justify-between mb-14">
                    <span className="text-2xl">User Information</span>
                    <Link to="/profile/updateprofile">
                        <button className="bg-yellow-500 w-28 flex items-center justify-center font-bold text-sm">
                            Update Profile
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span>Avatar:</span>
                        <img src={user.avatar || "./noavatar.jpg"} alt="" className="w-6 h-6 rounded-full" />
                    </div>
                    <span>Username: {user.username}</span>
                    <span>E-mail: {user.email}</span>

                    <button className="w-24 border text-white bg-cyan-500 rounded-md" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="flex justify-between mt-10 mb-10">
                    <span className="text-2xl">My List</span>
                    <Link to="/add">
                        <button className="bg-yellow-500 w-28 flex items-center justify-center font-bold text-sm">
                            Add New Post
                        </button>
                    </Link>
                </div>

                <div className="cardContainer">
                    <Card data={user.post} />
                </div>

                <div className="flex justify-between mt-10 mb-10">
                    <span className="text-2xl">Saved List</span>
                    <span className="bg-yellow-500 w-28 flex items-center justify-center font-bold text-sm">
                        Edit Saved List
                    </span>
                </div>

                <div className="cardContainer">
                    <Card data={posts} />
                </div>
            </div>

            <div className="right flex-[2] h-screen bg-slate-100 p-4">
                <Chat chats={data.chats} />
            </div>
        </div>
    );
};

export default Profile;