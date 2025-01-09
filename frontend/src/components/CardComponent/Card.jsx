import {  useLoaderData, useNavigate } from "react-router-dom";
import { listData } from "../../lib/listData";

const Card = ({data}) => {
    
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/${id}`); 
    };
    


    return (
        <div className="cardComponents flex flex-col gap-6 ">
            {data.map((e, index) => (
                
                <div key={e.id} className="flex gap-4" onClick={() => handleClick(e.id)}>
                    {/* {console.log(e)}; */}
                    <div className="h-[180px] w-[260px] ">
                        <img src={e.images[0]} alt={e.title}
                            className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-4 justify-between">
                        <div className="title">
                            <h1 className="font-bold">{e.title}</h1>
                        </div>
                        <div className="address text-xs">{e.address}</div>
                        <div className="price bg-yellow-200 rounded w-12">${e.price}</div>
                        <div className="rooms flex gap-4 text-xs">
                            <div className="bg-slate-200">{e.bedroom} Bedrooms</div>
                            <div className="bg-slate-200">{e.bathroom} Bathrooms</div>

                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;