import axios from "axios";
import React, { useEffect, useState } from "react";
import Poll from "../(components)/poll";


export default function History({ userData }: { userData: any }) {
    const isInst = userData.__class__ === 'Institution';
    const [polls, setPolls] = useState<any[]>([<p>No Polls Yet</p>]);
    const [loading, setLoading] = useState(true);
    const [polled, setPolled] = useState<any[]>([]);
    

    useEffect(() => {
        // function checkRadioButtons() {
        //     const radioButtons = document.querySelectorAll('input[type="radio"]');
        //     radioButtons.forEach((radioButton: Element) => {
        //         if (radioButton.id === 'RADIO_BUTTON_ID') {
        //             (radioButton as HTMLInputElement).checked = true;
        //         }
        //     });
        // }

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

        async function polled() {
            const response = await axios.get(`http://18.207.112.170/api/v1/users/${userData.id}/polls`);
            const ids = response.data;
            setPolled(ids);
        };

        fetchPolls();
        polled();

    }, [userData.id, isInst]);



    return (
        <>
            {loading && <p>loading...</p>}
            {!loading && polls.length === 0 && !isInst && <p>No polls yet, try again later.</p>}
            {!loading && polls.length === 0 && isInst && <p>No polls yet, Create a new poll to start</p>}
            {!loading && polls.length > 0 && (
                <div className="mb-20 w-full">
                    {polls.map((poll: any) => {
                        if (polled.includes(poll.id)) {
                            return <Poll key={poll.id} pollData={poll} isInst={isInst}/>;
                        }
                    })}
                </div>
            )}
        </>
    );
}

// TODO - Check the radio buttons of the user's past answers