import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [rentActive, setRentActive] = useState(false);
  const [type,setType]=useState("buy")
  const [query ,setQuery]=useState({
     
    city:"",
    minPrice:"",
    maxPrice:""
  })

  const handleChange=(e)=>{
    setQuery((prev)=>({...prev,[e.target.name]:e.target.value})
  
    )
  }

  return (
    <div className="searchBar items-center h-16">
      <button onClick={()=>{
      setRentActive(false);
      setType("buy");

    }} className={`border-solid border-2 md:border-b-0 max-[768px]:mb-2 w-[100px] p-3 border-r-0 bg-stone-950 h-full ${rentActive ? "bg-white ":"bg-black text-white"}`}>
        Buy
      </button>
      <button onClick={()=>{
         setRentActive(true);
         setType("rent");
      }}className={`border-solid border-2 border-b-0 w-[100px] p-3 border-l-0 bg-stone-950 h-full ${!rentActive ? "bg-white ":"bg-black text-white"}`}>
        Rent
      </button>
     {console.log(type)};

      <form className="flex-grow border-solid h-full  flex items-center min-[220px]:flex-col md:flex-row md:border-2 min-[220px]:gap-1">
  <input
    type="text"
    name="city"
    className="h-full w-full p-2 flex-grow md:border-0 min-[220px]:border-2 "
    placeholder="City Location"
    onChange={handleChange}
  />
  <input
    type="number"
    name="minPrice"
    min={0}
    className="h-full w-full p-2 flex-grow md:border-0 min-[220px]:border-2 "
    placeholder="Min Price"
    onChange={handleChange}
  />
  <input
    type="number"
    name="maxPrice"
    min={0}
    className="h-full w-full p-2 flex-grow md:border-0 min-[220px]:border-2 "
    placeholder="Max Price"
    onChange={handleChange}
  />

  <Link to={`/list?type=${type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`} className="h-full p-4 border-l-0 bg-yellow-400 flex items-center justify-center max-[768px]:w-full max-[768px]:p-1">
    <button><img className="size-10" src="/search.png" alt="Search" /></button>
    
  </Link>
  
</form>
    </div>
  );
};

export default SearchBar;