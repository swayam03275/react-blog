import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config" // Custom Appwrite service to handle API calls
import { Container, PostCard } from '../components' // Importing reusable layout and UI components

function Home() {
    // State to store fetched posts
    const [posts, setPosts] = useState([])

    // Fetch posts on component mount
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                // Set the fetched posts to state
                setPosts(posts.documents)
            }
        })
    }, []) // Runs only once when the component mounts

    // If no posts are found (or user not logged in), show a message
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // If posts are available, display them in a responsive grid
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* Loop through all posts and render PostCard component for each */}
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            {/* Passing all post data to PostCard using spread operator */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
