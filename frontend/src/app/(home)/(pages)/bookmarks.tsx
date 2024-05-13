import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('user')!) as string;
        axios.get(`http://18.207.112.170/api/v1/user/${userId}/tags`)
        .then((res) => {
            console.log(res.data, 'from bookmarks');
            setBookmarks(res.data.reverse());
            setLoading(false); // Once data is fetched, set loading to false
        }).catch((err) => {
            console.log(err);
            setLoading(false); // If there's an error, also set loading to false
        });
    }, []);
    
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
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
