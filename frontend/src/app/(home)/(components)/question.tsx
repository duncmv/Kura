import { useState, useEffect } from 'react';
import { h3 } from '@/components/styleVar';
import axios from 'axios';

export default function Question (props: any) {
    const { questionData, isInst, setData } = props;
    const [votes, setVotes] = useState(Object);

    if (!questionData) { return <p>loading...</p>; }

    useEffect(() => {
        const fetchVotes = async () => {
            const votesData: { [key: string]: number } = {};
            for (const answer of questionData.answers) {
                try {
                    const res = await axios.get(`http://18.207.112.170/api/v1/answers/${answer.id}`);
                    votesData[answer.id] = parseInt(res.data, 10);
                } catch (err) {
                    console.log(err);
                }
            }
            setVotes(votesData);
        };
        fetchVotes();
    }, [questionData.answers]);

    function handleCheck (e: any) {
        const ansId = e.target.id;
        const qId = e.target.name;

        setData((prevData: any) => {
            return {
                ...prevData,
                [qId]: ansId
            };
        });
    }

    const answers = questionData.answers.map((answer: any) => {
        return (
            <div key={answer.id} className='--answer-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delay-100 '>
            {!isInst && (
                <input  type="radio" onChange={handleCheck} name={questionData.id} id={answer.id} className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
            )}
            {isInst && (
                <span className="font-bold text-center w-5 h-5 bg-gray-200 text-gray-700 rounded-full flex justify-center items-center">{votes[answer.id]}</span>
            )}
            <label htmlFor={answer.id} className='w-[100%] h-[100%] text-right cursor-pointer'>{answer.text}</label>
            </div>
        );
    });

    return (
        <div className='--question-- sm:w-[90%] mx-auto my-2 flex flex-col justify-center items-center'>
            <h3 className={h3 + ' sm:my-2'}>{questionData.text}</h3>
            <div className='--options-- w-[100%] sm:w-[90%] mx-auto flex flex-col justify-center items-center'>
                {answers}
            </div>
        </div>
    );
}