import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";


export default function History({ userData }: { userData: any }) {
    const isInst = userData.__class__ === 'Institution';
    const [loading, setLoading] = useState(true);
    const [polled, setPolled] = useState<any[]>([]);
    

    useEffect(() => {
        async function fetchPolls() {
            let path = `http://18.207.112.170/api/v1/users/${userData.id}/polls`;
            try {
                const response = await axios.get(path);
                const ids = response.data;
                const fetchedPolls = await Promise.all(ids.map(async (id: string) => {
                    const pollResponse = await axios.get(`http://18.207.112.170/api/v1/polls/${id}`);
                    return pollResponse.data;
                }));
                setPolled(fetchedPolls.reverse());
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
            {!loading && polled.length === 0 && !isInst && <p className="mt-2">No polls yet, try again later.</p>}
            {!loading && polled.length === 0 && isInst && <p className="mt-2">No polls yet, Create a new poll to start</p>}
            {!loading && polled.length > 0 && (
                <div className="mb-20 w-full">
                    {polled.map((poll: any) => {
                        return <Poll key={poll.id} pollData={poll} isInst={isInst}/>;
                    })}
                </div>
            )}
        </>
    );
}