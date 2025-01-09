import { Navigate, Outlet } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../lib/Context/AuthContext";

const LayOut = () => {
  return (
    <div className="layout h-screen max-w-6xl mr-auto ml-auto pl-7 pr-7">
      <Navbar></Navbar>
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>
  );
};

const RequireAuth = () => {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <div className="layout h-screen max-w-6xl mr-auto ml-auto pl-7 pr-7">
      <Navbar></Navbar>
      {/* Outlet is where child routes will render */}
      <Outlet />
    </div>

  )
}

export { LayOut, RequireAuth };
// export default LayOut;