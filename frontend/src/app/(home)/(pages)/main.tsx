import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";

export default function Main({ userData }: { userData: any }) {
    const isInst = userData.__class__ === 'Institution';
    const [polls, setPolls] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPolls() {
            let path = isInst ? `http://18.207.112.170/api/v1/institutions/${userData.id}/polls` : 'http://18.207.112.170/api/v1/polls';
            try {
                const response = await axios.get(path);
                const ids = response.data;
                
                // Fetch user-polled polls
                const userPolledResponse = await axios.get(`http://18.207.112.170/api/v1/users/${userData.id}/polls`);
                const userPolledIds = userPolledResponse.data;

                // Filter out the polls the user has already participated in
                const filteredIds = ids.filter((id: string) => !userPolledIds.includes(id));

                // Fetch details of the filtered polls
                const fetchedPolls = await Promise.all(filteredIds.map(async (id: string) => {
                    const pollResponse = await axios.get(`http://18.207.112.170/api/v1/polls/${id}`);
                    return pollResponse.data;
                }));

                setPolls(fetchedPolls);
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
            {loading && <p>loading...</p>}
            {!loading && polls.length === 0 && !isInst && <p>No polls yet, try again later.</p>}
            {!loading && polls.length === 0 && isInst && <p>No polls yet, Create a new poll to start</p>}
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


// TODO - fix the polled shows up when reloading the page
