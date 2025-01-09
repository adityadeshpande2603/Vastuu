import { useContext, useState } from "react";
import { AuthContext } from "../../lib/Context/AuthContext";
import axios from "axios";
import CloudinaryUploadWidget from "../../components/UploadWidget/CloudinaryUploadWidget";

const UpdateProfilePage = () => {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [publicId, setPublicId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, password, email } = Object.fromEntries(formData);
    console.log(password);

    try {
      const res = await axios.put(
        `https://vastuu.onrender.com/api/users/${currentUser.id}`,
        {
          username,
          email,
          avatar: avatar[0],
          ...(password && { password }) // This includes password if it's provided
        },
        { withCredentials: true }
      );
      updateUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="homepage h-full flex md:items-center justify-center">
      <div className="flex-[3] flex items-center justify-center flex-col gap-1">
        <h1 className="font-bold text-4xl">Update Profile 🖊️</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <span>Email</span>
          <input
            name="email"
            className="p-3 w-80 border-2 border-black"
            type="email"
            defaultValue={currentUser.email}
          />
          <span>Username</span>
          <input
            type="text"
            name="username"
            className="p-3 w-80 border-2 border-black"
            defaultValue={currentUser.username}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="p-3 w-80 border-2 border-black"
          // defaultValue="Password"
          />
          <button
            type="submit"
            className="p-3 w-80 border-2 bg-cyan-500 text-white"
          >
            Update Profile
          </button>
          {error && <span className="text-red-500">{error}</span>}
        </form>
      </div>

      <div className="image h-full bg-red-100 flex-[2] w-full relative z-10 flex items-center justify-center flex-col">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          className="w-4/5"
          alt="Profile Avatar"
        />
        <div className="mt-3 ">
          {console.log(avatar)}
          <CloudinaryUploadWidget
            uwConfig={{
              cloudName: "adityadeshpande",
              uploadPreset: "Vaastu",
              multiple: false,
              // maxImageFileSize: 2000000,
              folder: "avatars",
            }}
            setPublicId={setPublicId}

            setState={setAvatar}
          />
          {console.log(avatar)}

        </div>

      </div>


    </div>
  );
};

export default UpdateProfilePage;