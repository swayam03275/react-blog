import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config"; // Service to interact with Appwrite
import { Button, Container } from "../components"; // UI components
import parse from "html-react-parser"; // To render HTML content safely
import { useSelector } from "react-redux"; // To access Redux state

export default function Post() {
    const [post, setPost] = useState(null); // Local state to store the post
    const { slug } = useParams(); // Get post ID from URL
    const navigate = useNavigate(); // For navigation

    const userData = useSelector((state) => state.auth.userData); // Get current user
    const isAuthor = post && userData ? post.userId === userData.$id : false; // Check if current user is author

    // Fetch the post when component loads or slug changes
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/"); // Redirect if post not found
            });
        } else {
            navigate("/"); // Redirect if no slug
        }
    }, [slug, navigate]);

    // Delete post and associated image
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                // ✅ FIX #1: Only delete the file if 'featuredImage' exists
                if (post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/"); // Redirect to home
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Post image section with edit/delete buttons */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                    {/* ✅ FIX #2: Only try to preview image if 'featuredImage' is available */}
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="text-center text-gray-500">
                            No featured image
                        </div>
                    )}

                    {/* Show edit/delete only to author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Render post content as HTML */}
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null; // Show nothing while loading
}
