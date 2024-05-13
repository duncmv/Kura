import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState(Array);

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('user')!) as string;
        axios.get(`http://18.207.112.170/api/v1/user/${userId}/tags`)
        .then ((res) => {
            console.log(res.data, 'from bookmarks');
            setBookmarks(res.data.reverse());
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <>
            <div className='flex flex-row flex-wrap w-[100%]'>
                {bookmarks.length === 0 && <p className='text-lg mx-auto mt-2'>No bookmarks</p>}
                {bookmarks?.map((poll: any) => {
                    return <Poll key={poll?.id} pollData={poll} isInst={false} />;
                })}
            </div>
        </>
    );
}