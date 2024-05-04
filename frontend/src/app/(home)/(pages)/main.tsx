import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";

export default function Main({ userData }: { userData: any }) {
    let isInst= userData.__class__ === 'Institution';
    const [polls, setPolls] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPolls() {
            let path = 'http://18.207.112.170/api/v1/polls';
            try {
                const response = await axios.get(path);
                let ids = response.data;
                
                if (!isInst) {
                    // Fetch user-polled polls
                    const userPolledResponse = await axios.get(`http://18.207.112.170/api/v1/users/${userData.id}/polls`);
                    const userPolledIds = userPolledResponse.data;
    
                    // Filter out the polls the user has already participated in
                    ids = ids.filter((id: string) => !userPolledIds.includes(id));
                }
                
                // Fetch details of the filtered polls if Individual
                const fetchedPolls = await Promise.all(ids.map(async (id: string) => {
                    const pollResponse = await axios.get(`http://18.207.112.170/api/v1/polls/${id}`);
                    return pollResponse.data;
                }));

                setPolls(fetchedPolls.reverse());
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchPolls();
    }, [userData.id, isInst]);

    return (
        <>
            {loading && (
                <div className="flex justify-center items-center w-full h-screen">
                    <p>Loading...</p>
                </div>
            )}
            {!loading && polls.length === 0 && !isInst && <p className="mt-2">No polls yet, try again later.</p>}
            {!loading && polls.length === 0 && isInst && <p className="mt-2">No polls yet, Create a new poll to start</p>}
            {!loading && polls.length > 0 && (
                <div className="mb-20 w-full">
                    {polls.map((poll: any) => {
                        return <Poll key={poll.id} pollData={poll} isInst={isInst}/>;
                    })}
                </div>
            )}
        </>
    );
}
