import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../lib/Context/AuthContext";
import { useNotificationStore } from "../lib/notificationStore";

const Navbar = () => {
  const [open, setOpen] = useState(false); // Correct useState syntax
  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();

  let user = true;

  return (
    <nav className="flex justify-between items-center p-4 h-[100px]">
      {/* Left Section */}
      <div className="left flex space-x-7 items-center font-semibold basis-3/4  ">
        <a href="/" className="flex justify-center items-center gap-2 hover:scale-125">
          <img src="/logo.png" alt="Logo" className="w-12 h-auto" />
          <span className="font-bold lg:block md:hidden">Vastu</span>
        </a>

        <a href="/" className="hover:scale-125 md:block min-[220px]:hidden">Home</a>
        <a href="/" className="hover:scale-125 md:block min-[220px]:hidden">About</a>
        <a href="/" className="hover:scale-125 md:block min-[220px]:hidden">Contact</a>
        <a href="/" className="hover:scale-125 md:block min-[220px]:hidden">Agents</a>
      </div>

      {/* Right Section */}
      {currentUser ? (
        <div className="user flex gap-4">
          <img src={currentUser.avatar || "/noavatar.jpg"} alt="" className="size-8 rounded-full" />
          <span className="font-extrabold">{currentUser.username} </span>
          <Link to="/profile" className=" font-extrabold bg-yellow-400 relative w-16 flex items-center justify-center">
            Profile
           {number>0 && <div className="notification absolute -right-3 -top-3 bg-red-600 rounded-full h-6 w-6 flex items-center justify-center text-white">{number}</div>}
          </Link>
        </div>
      ) : (
        <div className="right flex space-x-6 items-center font-semibold basis-1/4 justify-end h-full">
          <a href="/login" className="hover:scale-125 md:block min-[220px]:hidden">SignIn</a>
          <a href="/register" className="bg-orange-300 px-6 py-2 rounded hover:scale-125 md:block min-[220px]:hidden">SignUp</a>

          {/* Menu Icon for mobile view */}
          <div className="menuIcon min-[766px]:hidden w-12 h-auto z-50">
            <img
              src="./menu.png"
              alt="Menu"
              onClick={() => {
                setOpen((prev) => !prev); // Toggle the side menu
              }}
            />
          </div>
        </div>
      )}

      {/* Side Menu */}
      <div
        className={`sideMenu absolute top-0 h-screen w-2/4 bg-black flex justify-center flex-col items-center transition-transform ease-in-out delay-150  ${open ? "right-[0px]" : "right-[-900px] hidden"
          }`}
      >
        <a href="/" className="block text-white p-4">Home</a>
        <a href="/" className="block text-white p-4">About</a>
        <a href="/" className="block text-white p-4">Contact</a>
        <a href="/" className="block text-white p-4">Agents</a>
        <a href="/" className="block text-white p-4">SignIn</a>
        <a href="/" className="block text-white p-4">SignUp</a>
      </div>
    </nav >
  );
};

export default Navbar;