import { useEffect, useState } from "react";
import { form, input, button, h3 } from "@/components/styleVar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from 'uuid';
import axios from "axios";


/**
 * Component for publishing a poll.
 * @param userData - User data.
 */
export default function Publish({ userData }: { userData: any }) {
    // State for the poll data
    const [poll, setPoll] = useState({
        title: '',
        desc: '',
        questions: [
            { id: uuid(), title: '', answers: [{ id: uuid(), text: '' }, { id: uuid(), text: '' }] },
        ]
    });

    // State for tracking if the poll has been published (for UI feedback)
    const [published, setPublished] = useState(false);

    useEffect(() => {
        // Get poll data from sessionStorage
        const pollData = sessionStorage.getItem('poll');
        if (pollData) {
            setPoll(JSON.parse(pollData));
        }
    }, []);

    /**
     * Handle input change for the poll data.
     * @param event - The input change event.
     */
    const handleDataChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setPoll(prevPoll => {
            if (name === 'title' || name === 'desc') { // Update the poll title or description directly
                return {
                    ...prevPoll,
                    [name]: value
                };
            } else { // Update question or answer of the poll
                const updatedQuestions = prevPoll.questions.map(question => {
                    if (question.id === name) {
                        return {
                            ...question,
                            title: value
                        };
                    } else { // Update answer of the question
                        const updatedAnswers = question.answers.map(answer => {
                            if (answer.id === name) {
                                return {
                                    ...answer,
                                    text: value
                                };
                            } else {
                                return answer;
                            }
                        });
                        return {
                            ...question,
                            answers: updatedAnswers
                        };
                    }
                });
                return {
                    ...prevPoll,
                    questions: updatedQuestions
                };
            }
        });
    }

    /**
     * Handle form submission.
     * @param e - The form submission event.
     */
    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            title: poll.title,
            description: poll.desc,
            questions: poll.questions.map(question => {
                return {
                    text: question.title,
                    answers: question.answers.map(answer => {
                        return { text: answer.text };
                    })
                };
            })
        };

        axios.post(`http://18.207.112.170/api/v1/institutions/${userData.id}/polls`, data)
            .then((res) => {
                setPoll({
                    title: '',
                    desc: '',
                    questions: [
                        { id: uuid(), title: '', answers: [{ id: uuid(), text: '' }, { id: uuid(), text: '' }] },
                    ]
                });
                sessionStorage.removeItem('poll');
                setPublished(true);
                setTimeout(() => {
                    setPublished(false);
                }, 1000);
            }).catch((err) => {
                console.log(err);
                console.log(data);
            });
    }

    /**
     * Save the poll data to sessionStorage.
     */
    const saveData = () => {
        sessionStorage.setItem('poll', JSON.stringify(poll));
    }

    /**
     * Add a new question to the poll.
     */
    const addQuestion = () => {
        setPoll(prevPoll => {
            return {
                ...prevPoll,
                questions: [
                    ...prevPoll.questions,
                    { id: uuid(), title: '', answers: [{ id: uuid(), text: '' }, { id: uuid(), text: '' }] }
                ]
            };
        });
    }

    /**
     * Remove a question from the poll.
     * @param id - The ID of the question to remove.
     */
    const removeQuestion = (id: String) => {
        setPoll(prevPoll => {
            return {
                ...prevPoll,
                questions: prevPoll.questions.filter(question => question.id !== id)
            };
        });
    }

    /**
     * Add a new answer to a question in the poll.
     * @param questionId - The ID of the question to add the answer to.
     */
    const addAnswer = (questionId: String) => {
        setPoll(prevPoll => {
            const updatedQuestions = prevPoll.questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answers: [
                            ...question.answers,
                            { id: uuid(), text: '' }
                        ]
                    };
                } else {
                    return question;
                }
            });
            return {
                ...prevPoll,
                questions: updatedQuestions
            };
        });
    }

    /**
     * Remove an answer from a question in the poll.
     * @param questionId - The ID of the question.
     * @param answerId - The ID of the answer to remove.
     */
    const removeAnswer = (questionId: String, answerId: String) => {
        setPoll(prevPoll => {
            const updatedQuestions = prevPoll.questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answers: question.answers.filter(answer => answer.id !== answerId)
                    };
                } else {
                    return question;
                }
            });
            return {
                ...prevPoll,
                questions: updatedQuestions
            };
        });
    }

    const form1 = (
        <>
            <h3 className={h3}>Create a new poll</h3>
            <p className="pb-10">
                <b>Optional</b> fields are marked with *
            </p>
            <div className="--poll-wrapper--">
                <div className="--poll-header--">
                    <div className="">
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            type="text"
                            id="title"
                            name="title"
                            className={input}
                            value={poll.title}
                            onChange={handleDataChange}
                            onBlur={saveData}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="desc">* Description</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={poll.desc}
                            className={input}
                            onChange={handleDataChange}
                            onBlur={saveData}
                        />
                    </div>
                </div>
                <div className="--poll-questions--">
                    {poll.questions.map((question: any, index) => {
                        return (
                            <>
                                {index != 0 && (
                                    <div title="Remove this question" className="w-10 h-10 flex justify-center items-center rounded-full border border hover:bg-blue-300">
                                        <button type="button" className="focus:outline-none w-[100%] h-[100%]" onClick={() => { removeQuestion(question.id) }} onBlur={saveData}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </div>
                                )}
                                <div className="--question-- m-5">
                                    <label htmlFor={question.id}>Question Title</label>
                                    <input
                                        required
                                        type="text"
                                        id={question.id}
                                        name={question.id}
                                        className={input}
                                        value={question.title}
                                        onChange={handleDataChange}
                                        onBlur={saveData}
                                    />
                                    <div className="--question-answers--  m-5">
                                        {/* Answers here */}
                                        {question.answers.map((answer: any, idx: number) => {
                                            return (
                                                <div key={answer.id} className="relative">
                                                    <label htmlFor={answer.id}>Answer</label>
                                                    {idx > 1 && (
                                                        <div title="Add an answer" className="w-6 h-6 absolute right-[10px] top-[5px] flex justify-center items-center rounded-full border border hover:bg-blue-300">
                                                            <button type="button" onClick={() => { removeAnswer(question.id, answer.id) }} onBlur={saveData}>
                                                                <FontAwesomeIcon className="text-sm" icon={faMinus} />
                                                            </button>
                                                        </div>
                                                    )}
                                                    <input
                                                        required
                                                        type="text"
                                                        id={answer.id}
                                                        name={answer.id}
                                                        className={input}
                                                        value={answer.text}
                                                        onChange={handleDataChange}
                                                        onBlur={saveData}
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div title="Add an answer" className="w-8 h-8 flex justify-center items-center rounded-full border border hover:bg-blue-300">
                                            <button type="button" className="focus:outline-none w-[100%] h-[100%]" onClick={() => {addAnswer(question.id)}} onBlur={saveData}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {index === poll.questions.length - 1 && (
                                    <div title="Add a question" className="w-10 h-10 flex justify-center items-center rounded-full border border hover:bg-blue-300">
                                        <button type="button" className="focus:outline-none w-[100%] h-[100%]" onClick={addQuestion} onBlur={saveData}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
            <div className="pt-10">
                {published ? (
                    <button className={button + " float-right relative bg-blue-200"}>
                        &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckCircle} className='text-blue-500' />&nbsp;&nbsp;&nbsp;
                    </button>
                ) : (
                    <button className={button + " float-right relative"} onClick={() => handleNext}>
                        Publish
                    </button>
                )}
                <button className={button + ' float-left relative'} onClick={(e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to clear the form?')) {
                        setPoll({
                            title: '',
                            desc: '',
                            questions: [
                                {id: uuid(), title: '', answers: [{id: uuid(), text: ''}, {id: uuid(), text: ''}]},
                            ]
                        });
                        sessionStorage.removeItem('poll');
                    }
                }}>
                    &nbsp;&nbsp;clear&nbsp;&nbsp;
                </button>
            </div>
        </>
    );

    const [currentForm, setCurrentForm] = useState(0);
    return (
        <form className={form + ' bg-white w-[100%] sm:w-[80%] md:w-[60%] sm:mt-10 mb-10 sm:mb-20'} onSubmit={handleNext}>
            {form1}
        </form>
    );
}