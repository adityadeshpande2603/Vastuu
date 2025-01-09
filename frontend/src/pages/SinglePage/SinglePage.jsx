import { useContext, useState } from "react";
import Slider from "../../components/Slider/Slider";
import { singlePostData, userData } from "../../lib/listData";
import Map from "../../components/Map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../lib/Context/AuthContext";
import axios from "axios";
import ChatWindow from "../../components/Chatwindow/ChatWindow";
import { none } from "@cloudinary/url-gen/qualifiers/progressive";

const SinglePage = () => {
    const [imageIndex, setImageIndex] = useState(null);
    const [open, setOpen] = useState(null);
    const [chatId, setChatId] = useState(null);

    let post = useLoaderData();

    const [save, setSave] = useState(post.isSaved);




    function extractTextFromHTML(htmlString) {
        return htmlString.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
    }
    const sliderCall = () => {

        setImageIndex(0);
    }

    const closeSlider = () => {
        setImageIndex(null);
    }
    const SliderIndex = (direction) => {
        if (direction === "left") {
            setImageIndex((prevIndex) =>
                prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
            );
        } else {
            setImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
        }
    };

    const { currentUser } = useContext(AuthContext);

    const handleSave = async () => {


        setSave((prev) => !prev);

        if (!currentUser) {
            redirect("/login")
        }
        try {
            await axios.post(
                "http://localhost:3000/api/users/save",
                { postId: post.id },
                { withCredentials: true }
            );;

        }
        catch (err) {

            setSave((prev) => !prev);
        }



    }


    const openChat = async () => {

        try {
            const res = await axios.post("http://localhost:3000/api/chats", {
                "receiverId": post.user.id,
            }, {
                withCredentials: true,
            })

            setOpen(1);
            setChatId(res.data.id);

            // 
        }
        catch (err) {

        }
    }

    return (
        <div className="singlepage h-full">


            <div className="info h-full">
                <div className="wrapper flex h-full">
                    {/* Big Slider Section */}
                    {imageIndex != null && <div className="bigSlider cursor-pointer border border-black flex w-screen h-screen bg-black absolute inset-0 p-4 z-40">
                        {/* Left Arrow */}
                        <div
                            className="left flex items-center justify-center flex-[1]"
                            onClick={() => SliderIndex("left")} // Corrected event handler
                        >
                            <img src="./arrow.png" alt="left-arrow" className="h-8 w-8" />
                        </div>

                        {/* Main Image */}
                        <div className="image flex items-center justify-center flex-[11]">
                            <img
                                src={post.images[imageIndex]} // Display the current image
                                alt="slider-image"
                                className="h-full w-auto"
                            />
                        </div>


                        <div
                            className="right flex items-center justify-center flex-[1] rotate-180"
                            onClick={() => SliderIndex("right")} // Corrected event handler
                        >
                            <img src="./arrow.png" alt="right-arrow" className="h-8 w-8" />

                        </div>
                        <div onClick={() => closeSlider()} className="close text-white text-4xl">x</div>
                    </div>}

                    {/* Left section (3 parts) */}
                    <div className="left flex gap-[30px] flex-[3] flex-col m-3">

                        <div onClick={() => sliderCall()}>
                            <Slider />
                        </div>

                        <div className="apartmentInfo flex">
                            <div className="left flex flex-col gap-2 flex-[3]">
                                <div className="name text-xl font-bold">{post.title}</div>
                                <div className="address">{post.address}</div>
                                <div className="price bg-yellow-200 w-[50px] rounded">
                                    $ {post.price}
                                </div>
                            </div>

                            <div className="right bg-yellow-100 w-[100px] h-[100px] flex items-center justify-center">
                                <img src={post.user.avatar} alt="user" className="border border-black rounded-full w-20 h-20" />
                            </div>
                        </div>
                        <div className="description text-sm">
                            <p>{extractTextFromHTML(post.postDetail?.desc)}</p>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="right flex-[2] h-full bg-slate-100 flex flex-col ">
                        <p className="font-extrabold m-3">General</p>
                        <div className="flex flex-col bg-white m-3">
                            <div className="utilities flex gap-2">
                                <img src="./utility.png" alt="" className="size-[41px]" />
                                <div className="flex flex-col gap-0">
                                    <span className="font-bold">Utilities</span>
                                    <p className="text-xs">{post.postDetail.utilities} is responsible</p>


                                </div>

                            </div>
                            <div className="petPolicies flex gap-2">
                                <img src="./pet.png" alt="" className="size-[41px]" />
                                <div>
                                    <span className="font-bold">Pet Policy</span>

                                    <p className="text-xs">Pets Allowed</p>
                                </div>
                            </div>
                            <div className="property flex gap-2">
                                <img src="./fee.png" alt="" className="size-[41px]" />
                                <div>
                                    <span className="font-bold">Property Fees</span>

                                    <p className="text-xs">Must have 3x the rent in total household income</p>
                                </div>
                            </div>
                        </div>
                        <p className="font-extrabold m-3">Room Sizes</p>
                        <div className="roomSizes flex gap-2 m-3">
                            <div className="size bg-white flex">
                                <img src="./size.png" alt="" className="size-[26px]" />
                                <p className="flex items-center justify-center">80sqm (861sqft)</p>
                            </div>
                            <div className="bed bg-white flex">
                                <img src="./bed.png" alt="" className="size-[26px]" />
                                <p className="flex items-center justify-center">2 bed</p>
                            </div>
                            <div className="bathRoom bg-white flex">
                                <img src="./bath.png" alt="" className="size-[26px]" />
                                <p className="flex items-center justify-center">1 bathroom</p>
                            </div>

                        </div>
                        <p className="  font-extrabold m-3">Nearby Places</p>
                        <div className="NearbyPlaces flex gap-2 m-3  bg-white">
                            <div className="school flex p-2">
                                <img src="./school.png" alt="" className="size-[26px] flex items-center justify-center" />
                                <div className="flex flex-col">
                                    <p className="text-sm">School</p>
                                    <p className="text-xs">250 m away</p>
                                </div>
                            </div>
                            <div className="bus flex p-2">
                                <img src="./bus.png" alt="" className="size-[26px] flex items-center justify-center" />
                                <div className="flex flex-col">
                                    <p className="text-sm">Bus Stop</p>
                                    <p className="text-xs">100m away</p>
                                </div>
                            </div>
                            <div className="restaurant flex p-2">
                                <img src="./restaurant.png" alt="" className="size-[26px] flex items-center justify-center" />
                                <div className="flex flex-col">
                                    <p className="text-sm">Restaurant</p>
                                    <p className="text-xs" >200m away</p>
                                </div>
                            </div>
                        </div>
                        <p className="font-extrabold m-3">Location</p>
                        <div className="map h-[150px] m-3 "> {/* Adjust to the desired height */}
                            {imageIndex === null && (
                                <Map listData={[post]} className="h-full w-full" />
                            )}
                        </div>

                        <div className={` ${open ? "hidden" : "bottom flex justify-between  m-3"}`}>
                            <button className="message bg-white flex items-center p-2" onClick={openChat} >

                                <img src="./chat.png" alt="Chat Icon" className="w-6 h-6 mr-2" />
                                <div>Send a message</div>
                            </button>
                            <button
                                className={`flex items-center p-2 ${save ? 'bg-yellow-400' : 'bg-white'}`}
                                onClick={handleSave}
                            >
                                <img src="./save.png" alt="Save Icon" className="w-6 h-6 mr-2 " />
                                <div>{save ? "Place Saved" : "Save the place"}</div>
                            </button>

                        </div>

                        {open && <div className=" bottom-0 w-full h-1/2 bg-gray-100 border-t shadow-lg overflow-auto">
                            <ChatWindow id={chatId} receiver={post.user} open={open} setOpen={setOpen}></ChatWindow>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;