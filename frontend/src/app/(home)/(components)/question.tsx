import { useState, useEffect } from 'react';
import { h3 } from '@/components/styleVar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a question component.
 * @param {Object} props - The component props.
 * @param {Object} props.questionData - The data for the question.
 * @param {boolean} props.isInst - Indicates whether the user is an instructor.
 * @param {Function} props.setData - A function to update the data.
 * @param {Array} props.answered - An array of answered questions.
 * @returns {JSX.Element} The rendered question component.
 */
export default function Question(props: any): JSX.Element {
    const { questionData, isInst, setData, answered } = props;
    const [votes, setVotes] = useState(Object);
    const [showNumbers, setShowNumbers] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Fetch votes for each answer
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
            setIsLoading(false);
        };

        fetchVotes();
    }, [questionData.answers]);

    useEffect(() => {
        // Check if the question has been answered
        if (answered.length > 0) {
            setShowNumbers(true);
        }
    }, [answered]);

    function handleCheck(e: any) {
        const ansId = e.target.id;
        const qId = e.target.name;

        setData((prevData: any) => {
            return {
                ...prevData,
                [qId]: ansId
            };
        });
    }

    const allQAnswers = questionData.answers.map((answer: any) => answer.id);
    const isAnswered = answered.filter((ans: any) => allQAnswers.includes(ans)).length > 0;
    const answers = questionData.answers.map((answer: any) => {
        return (
            <div
                key={answer.id}
                className={
                    // Apply different styles based on whether the answer is selected or not
                    (answered.includes(answer.id) ? 'bg-gray-200' : 'bg-white') +
                    ' --answer-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delay-100 '
                }
            >
                <label htmlFor={answer.id} className='w-[100%] h-[100%] text-left cursor-pointer'>
                    {answer.text}
                </label>
                {!isInst && !isAnswered && (
                    // Render radio button only if the user is not an instructor and the question is not answered
                    <input
                        type='radio'
                        onChange={handleCheck}
                        name={questionData.id}
                        id={answer.id}
                        className='mr-2 w-5 h-5 border-2 border-black rounded-full'
                    />
                )}
                {(isInst || showNumbers) && (
                    // Show the vote count if the user is an instructor or if the question has been answered
                    <span className='font-bold text-center w-5 h-5 bg-gray-200 text-gray-700 rounded-full flex justify-center items-center'>
                        {isLoading && <span className='animate-pulse'><FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon></span>}
                        {!isLoading && votes[answer.id]}
                    </span>
                )}
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