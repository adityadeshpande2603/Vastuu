import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../../components/UploadWidget/CloudinaryUploadWidget";
import axios from "axios";

function NewPostPage() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        
        

        try {
            const res = await axios.post("http://localhost:3000/api/posts/", {
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type,
                    property: inputs.property,
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                    
                },
                postDetail: {
                    desc: value,
                    utilities: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                },
            },{withCredentials:true});
            navigate("/" + res.data.id);
        } catch (err) {
            console.log(err);
            setError(error);
        }
    };

    return (
        <div className="flex h-full">
            {/* Form Container */}
            <div className="flex-3 overflow-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
                <div className="bg-white shadow-md rounded-md p-6">
                    <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
                        {/* Form Fields */}
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="title" className="font-medium">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="border rounded p-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="price" className="font-medium">
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                className="border rounded p-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="address" className="font-medium">
                                Address
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="border rounded p-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="desc" className="font-medium">
                                Description
                            </label>
                            <ReactQuill
                                theme="snow"
                                onChange={setValue}
                                value={value}
                                className="h-40"
                            />
                        </div>
                        {/* More Fields */}
                        {[
                            { label: "City", name: "city", type: "text" },
                            { label: "Bedroom Number", name: "bedroom", type: "number", min: 1 },
                            { label: "Bathroom Number", name: "bathroom", type: "number", min: 1 },
                            { label: "Latitude", name: "latitude", type: "text" },
                            { label: "Longitude", name: "longitude", type: "text" },
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-2 w-1/3">
                                <label htmlFor={field.name} className="font-medium">
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    min={field.min}
                                    className="border rounded p-3"
                                />
                            </div>
                        ))}
                        {/* Dropdowns */}
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="type" className="font-medium">
                                Type
                            </label>
                            <select name="type" className="border rounded p-3">
                                <option value="rent">Rent</option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="property" className="font-medium">
                                Property
                            </label>
                            <select name="property" className="border rounded p-3">
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-1/3">
                            <label htmlFor="utilities" className="font-medium">
                                Utilities Policy
                            </label>
                            <select name="utilities" className="border rounded p-3">
                                <option value="Owner">Owner is responsible</option>
                                <option value="Tenant">Tenant is responsible</option>
                                <option value="Shared">Shared</option>
                            </select>
                        </div>
                        {/* Submission */}
                        <button
                            type="submit"
                            className="w-1/3 bg-teal-500 text-white font-bold rounded p-3"
                        >
                            Add
                        </button>
                        {error && (
                            <span className="text-red-500 mt-2 w-full">{error}</span>
                        )}
                    </form>
                </div>
            </div>
            {/* Side Container */}
            <div className="flex-2 bg-gray-50 flex flex-col items-center justify-center gap-4 p-4 overflow-y-auto">
                {images.map((image, index) => {
                    console.log(`Rendering image at index ${index}:`, image);
                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`Uploaded ${index}`}
                            className="w-1/2 h-44 object-cover rounded-md"
                        />
                    );
                })}
                {console.log(images)}
                <CloudinaryUploadWidget
                    uwConfig={{
                        cloudName: "adityadeshpande",
                        uploadPreset: "Vaastu",
                        multiple: true,
                        //   maxImageFileSize: 2000000,
                        folder: "posts",
                    }}
                    setState={setImages}
                />
            </div>
        </div>
    );
}

export default NewPostPage;