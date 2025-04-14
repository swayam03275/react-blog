import React from "react";
import { Link } from "react-router-dom"; // For navigating to individual post pages
import appwriteService from "../appwrite/config"; // Custom service to interact with Appwrite

// PostCard component to display individual post info
export default function PostCard({ $id, title, featuredimage }) {
    // 🐞 Debug: Log the featuredimage prop received (can be object or string)
    console.log("🔍 Raw featuredimage prop:", featuredimage);

    // ✅ Extract the image ID from the featuredimage
    // If it's an object (from Appwrite), get the $id; if it's already a string, use it directly
    const imageId = featuredimage?.$id || featuredimage;

    // 🧠 Debug: Log the image ID that will be used to generate the preview
    console.log("🖼️ Image ID used for preview:", imageId);

    // 🌐 Generate a preview URL from Appwrite using the image ID
    const previewUrl = imageId ? appwriteService.getFilePreview(imageId) : null;

    // 🧪 Debug: Log the final URL that will be used for the image source
    console.log("📸 Preview URL:", previewUrl);

    return (
        // Wrap the whole card in a Link so clicking it navigates to the post detail page
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                {/* If preview URL is available, render the image */}
                {previewUrl ? (
                    <>
                        {/* 🧪 Debug: Log before rendering the image */}
                        {console.log("🧪 Rendering image with src:", previewUrl)}
                        <img
                            src={previewUrl} // Set image source
                            alt="Post preview" // Alt text for accessibility
                            className="w-full h-52 object-cover rounded-lg mb-4 border border-gray-200" // Styling for the image
                        />
                    </>
                ) : (
                    // If there's no image, show a placeholder box with "No image" text
                    <div className="w-full h-52 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center rounded-lg mb-4 text-gray-700 text-sm italic border border-dashed border-gray-400">
                        No image
                    </div>
                )}
                {/* Display the post title below the image */}
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h2>
            </div>
        </Link>
    );
}
