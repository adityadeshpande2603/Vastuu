import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(); // Declare error state
    const [errorUsername, setErrorUsername] = useState(); // Declare error state
    const [errorEmail, setErrorEmail] = useState(); // Declare error state
    const [errorPassword, setErrorPassword] = useState(); // Declare error state

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        if(!(username && email && password)){
            if(!username){
                setErrorUsername("Username Required")
            }
            if(!email){
                setErrorEmail("Email Required")
            }
            if(!password){
                setErrorPassword("Password Required")
            }
            return
        }

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {
                username,
                email,
                password,
            });
            navigate("/login");
             // Navigate to the home page on success
        } catch (err) {
            console.error(err); // Log the entire error
            setError(err.response?.data?.message || "Something went wrong");
        }
        
    };

    return (
        <div className="register h-full flex md:items-center justify-center items-center">
            <div className="flex-[3] flex items-center justify-center flex-col gap-1">
                <h1 className="font-bold text-4xl">Create An Account</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        className="p-3 w-80 border-2 border-black"
                        type="email"
                        placeholder="Email"
                    />
                     {errorEmail && <span className="text-red-500">{errorEmail}</span>}
                    <input
                        type="text"
                        name="username"
                        className="p-3 w-80 border-2 border-black"
                        placeholder="Username"
                    />
                     {errorUsername && <span className="text-red-500">{errorUsername}</span>}
                    <input
                        type="password"
                        name="password"
                        className="p-3 w-80 border-2 border-black"
                        placeholder="Password"
                    />
                     {errorPassword && <span className="text-red-500">{errorPassword}</span>}
                    <button
                        type="submit"
                        className="p-3 w-80 border-2 bg-cyan-500 text-white"
                    >
                        Register
                    </button>
                    {error && <span className="text-red-500">{error}</span>}
                    <Link
                        to="/login"
                        className="border-b-2 w-44 text-sm font-normal"
                    >
                        Do you have an account?
                    </Link>
                </form>
            </div>
            <div className="image h-full bg-red-100 flex-[2] w-full relative -z-10 flex items-center">
                <img
                    src="./bg.png"
                    className="absolute max-w-[115%] right-0"
                    alt="Background"
                />
            </div>
        </div>
    );
};

export default Register;