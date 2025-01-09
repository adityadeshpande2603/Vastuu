import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../lib/Context/AuthContext";


const HomePage = () => {
  const { currentUser } = useContext(AuthContext);


  return (
    <div className="homepage h-full flex md:items-center justify-center ">
      <div className="text flex-[3]  ">
        <div className="wrapper pr-[70px] pl-4 flex flex-col gap-7">
          <h1 className="title font-bold text-5xl">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sed dolore labore ratione tempore iste placeat exercitationem, accusamus officiis facere aut error modi voluptate voluptates eveniet facilis dignissimos totam minima!</p>

          <SearchBar></SearchBar>

        </div>


      </div>
      <div className="image h-full bg-red-100 flex-[2] w-full relative -z-10 flex items-center ">
        <img src="./bg.png" className="absolute max-w-[115%] right-0" alt="Background" />
      </div>
    </div>
  );
};

export default HomePage;