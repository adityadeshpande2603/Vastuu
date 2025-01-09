import { useState } from "react";
import { singlePostData } from "../../lib/listData";
import { useLoaderData } from "react-router-dom";

const Slider = () => {
    // const [imageIndex, setImageIndex] = useState(null);
    const post = useLoaderData();

    return (
        <div className="slider flex  gap-2 cursor-pointer">
            {/* Big image - takes 3/4 of the height */}
            <div className="big flex-[3]">
                <img
                    src={post.images[0]}
                    alt="Big Image"
                    className="w-full h-full object-cover "
                />
            </div>

            {/* Small images - split into 3 vertically */}
            <div className="small flex-[2] flex flex-col gap-[10px]">
                <img
                    src={post.images[1]}
                    alt="Small Image 1"
                    className="w-full h-[100px] object-cover"
                />
                <img
                    src={post.images[2]}
                    alt="Small Image 2"
                    className="w-full h-[100px] object-cover"
                />
                <img
                    src={post.images[3]}
                    alt="Small Image 3"
                    className="w-full h-[100px] object-cover"
                />
            </div>
        </div>
    );
};

export default Slider;