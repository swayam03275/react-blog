import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components' // Importing reusable layout and card components
import appwriteService from "../appwrite/config"     // Custom Appwrite service for API interaction

function AllPosts() {
    const [posts, setPosts] = useState([]) // Local state to store all posts

    // useEffect runs after the component mounts
    useEffect(() => {
        // Fetch all posts from the Appwrite backend
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents) // Save posts to local state
            }
        })
    }, []) // Empty dependency array means this effect runs only once on mount

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* Loop through each post and render a PostCard */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} /> {/* Spread post data into PostCard props */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
