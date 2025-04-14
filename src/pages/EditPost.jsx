import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components' // Import reusable components
import appwriteService from "../appwrite/config"     // Import custom Appwrite service
import { useNavigate, useParams } from 'react-router-dom' // For navigation and reading URL params

function EditPost() {
    const [post, setPosts] = useState(null) // State to store the post data to be edited
    const { slug } = useParams() // Extract the post ID (slug) from the URL
    const navigate = useNavigate() // Hook to navigate between routes

    // Fetch the post data when the component mounts or when 'slug' changes
    useEffect(() => {
        if (slug) {
            // Get the post details from the server using slug
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post) // Set the post data in local state
                }
            })
        } else {
            // If no slug is provided, navigate to the home page
            navigate('/')
        }
    }, [slug, navigate]) // Dependency array for re-running when slug or navigate changes

    return post ? (
        <div className='py-8'>
            <Container>
                {/* Show the form pre-filled with the post data for editing */}
                <PostForm post={post} />
            </Container>
        </div>
    ) : null // If post is not yet fetched, return nothing
}

export default EditPost
