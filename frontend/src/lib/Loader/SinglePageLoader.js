import axios from "axios";
import { defer } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export const SinglePageLoader = async ({ params }) => {

    try{
        
        
        
  const res = await axios.get("https://vastuu.onrender.com/api/posts/" + params.id, { withCredentials: true });
  
  return res.data;
  }
  catch(e){
    
  }
     // Return the data to be used in the component
};
export const listPageLoader = async ({ request,params }) => {
    
    const query=request.url.split("?")[1];
    // 
    const responsePromise= axios.get("https://vastuu.onrender.com/api/posts?" + query);
    
    return defer({
        responsePromise: responsePromise,
      });
 
        
       
    // return res.data;


};
export const profileLoader = async ({ request }) => {
  
  const currentUser = JSON.parse(localStorage.getItem("user"));
  

  try {
      // Fetch the user from localStorage
      if (!currentUser || !currentUser.id) {
          throw new Error("User not logged in");
      }
  
      const response = await axios.get(`https://vastuu.onrender.com/api/users/${currentUser.id}`, {
          withCredentials: true,
      });
      const chats=await axios.get("https://vastuu.onrender.com/api/chats/",{ withCredentials: true,
      })
      
     
    let data={
        response:response.data,
        chats:chats.data
    }
    
    
      return data; // Return the fetched data
  } catch (error) {
    // 
      console.error("Error in profileLoader:", error);

      throw error; // React Router will handle errors in loaders
  }
};

// export const profileLoader = async ({ params, request }) => {
//   const currentUser = JSON.parse(localStorage.getItem("user")); // Example for fetching from localStorage
//   if (!currentUser || !currentUser.id) {
//       throw new Response("User not logged in", { status: 401 });
//   }

//   try {
//       const response =  axios.get(`https://vastuu.onrender.com/api/users/${currentUser.id}`, {
//           withCredentials: true,
//       });
//       return response.data; // Return user data
//   } catch (error) {
//       console.error("Error fetching user:", error);
//       throw new Response("Failed to fetch user data", { status: 500 });
//   }
// };