import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";

/**
 * Renders the Bookmarks component, which displays a list of bookmarks for a user.
 * Bookmarks are fetched from an API and displayed in a responsive layout.
 * returns {JSX.Element} The rendered Bookmarks component.
 */
export default function Bookmarks(): JSX.Element {
    const [bookmarks, setBookmarks] = useState([]); // State to store the fetched bookmarks
    const [loading, setLoading] = useState(true); // State to track the loading status

    useEffect(() => {
        // Fetch the user ID from the session storage
        const userId = JSON.parse(sessionStorage.getItem('user')!) as string;

        // Fetch the bookmarks for the user from the API
        axios.get(`http://18.207.112.170/api/v1/user/${userId}/tags`)
        .then((res) => {
            setBookmarks(res.data.reverse()); // Reverse the order of bookmarks and update the state
            setLoading(false); // Once data is fetched, set loading to false
        }).catch((err) => {
            console.log(err);
            setLoading(false); // If there's an error, also set loading to false
        });
    }, []);
    
    return (
        <>
            {loading ? (
                // Show a loading message while the data is being fetched
                <div className="flex justify-center items-center w-full h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
                // Display the bookmarks in a responsive layout
                <div className='flex flex-row flex-wrap w-[100%]'>
                    {bookmarks.length === 0 && <p className='text-lg mx-auto mt-2'>No bookmarks</p>}
                    {bookmarks?.map((poll: any) => {
                        return <Poll key={poll?.id} pollData={poll} isInst={false} />;
                    })}
                </div>
            )}
        </>
    );
}
