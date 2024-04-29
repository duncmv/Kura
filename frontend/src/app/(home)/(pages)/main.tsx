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
                const fetchedPolls = await Promise.all(ids.map(async (id: string) => {
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
                <>
                    {polls.map((poll: any) => {
                        return <Poll key={poll.id} pollData={poll} />;
                    })}
                </>
            )}
        </>
    );
}