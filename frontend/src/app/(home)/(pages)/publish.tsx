import { useEffect, useState } from "react";
import { container, h2, form, input, button, h3 } from "@/components/styleVar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { stringify } from "querystring";


export default function Publish ({userData, setTab} : {userData: any, setTab: any}) {
    const [data, setData] = useState(Object);

    // Get stored data from sessionStorage
    useEffect(() => {
        if (sessionStorage.getItem('data')) {
            setData(JSON.parse(sessionStorage.getItem('data') as string));
        }
    }, []);
    
    const addAnswer = () => {
        const answer = 'answer '.concat(String(answers.length + 1));
        setAnswers([
            ...answers,
            (<div className="">
                <label htmlFor={answer}>{answer.charAt(0).toUpperCase() + answer.slice(1)}</label>
                <input
                    type="text"
                    id={answer}
                    name={answer}
                    className={input}
                    value={data[answer]}
                    onChange={handleDataChange}
                />
            </div>)
        ]);
    }

    // Handle input change
    const handleDataChange = (event: { target: { name: any; value: any; }; }) => {
        let { name, value } = event.target;

        setData((prevData: any) => {
            const updatedData = {
                ...prevData,
                [name]: value
            };
    
            // Store data in sessionStorage
            sessionStorage.setItem('data', JSON.stringify(updatedData));
    
            return updatedData;
        });
    }

    // Handle form submission
    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Submit form
        if (currentForm + 1 > 1) {
            sessionStorage.removeItem('data');
           // TODO: Submit form data
        } else {
            setCurrentForm(currentForm + 1);
        }

    }
    
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (currentForm - 1 < 0) {
            setTab('home');
        }
        setCurrentForm(currentForm - 1);
    }

    const [answers, setAnswers] = useState([
        (<div className="">
            <label htmlFor="answer1">Answer 1</label>
            <input
                required
                type="text"
                id="answer1"
                name="answer1"
                className={input}
                value={data.answer1}
                onChange={handleDataChange}
            />
        </div>),
        (<div className="">
            <label htmlFor="answer2">Answer 2</label>
            <input
                required
                type="text"
                id="answer2"
                name="answer2"
                className={input}
                value={data.answer2}
                onChange={handleDataChange}
            />
        </div>)
    ]);

    const form1 = (
        <>
            <h3 className={h3}>Create a new poll</h3>
            <p className="pb-10">
                <b>Optional</b> fields are marked with *
            </p>
            <div className="--poll-wrapper--">
                <div className="--poll-header--">
                    <div className="">
                        <label htmlFor="ptitle">Title</label>
                        <input
                            required
                            type="text"
                            id="ptitle"
                            name="ptitle"
                            className={input}
                            value={data.ptitle}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="description">* Description</label>
                        <input
                            required
                            type="text"
                            id="description"
                            name="description"
                            className={input}
                            value={data.description}
                            onChange={handleDataChange}
                        />
                    </div>
                </div>
                <div className="--poll-questions-- m-10">
                    <div className="">
                        <label htmlFor="qtitle">Question Title</label>
                        <input
                            required
                            type="text"
                            id="qtitle"
                            name="qtitle"
                            className={input}
                            value={data.qtitle}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div className="--question-answers--">
                        {answers}
                        <div className="w-10 h-10 flex justify-center items-center rounded-full border border hover:bg-blue-300">
                            <button onClick={addAnswer} type="button" className="focus:outline-none w-[100%] h-[100%]">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10">
                <button className={button + " float-right relative"} onClick={() => handleNext}>
                    &nbsp;&nbsp;Next&nbsp;&nbsp;
                    <div className="absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border"></div>
                    <div className="absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-300"></div>
                </button>
            </div>
        </>
    );

    const form2 = <>
        <h3 className={h3}>Personal Information</h3>
            <p className='pb-10'>All fields are required</p>
            <div className=''>
                <label htmlFor='name'>Name</label>
                <input required type="text" id='name' name='name' className={input} onChange={handleDataChange} autoComplete="name" />
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:inline-block '>
                <label htmlFor='district'>district</label>
                <select required id='district' className={input} name='district_id' value={data.district_id} onChange={handleDataChange} autoComplete="address-level1">
                    <option value=''>Select district</option>
                </select>
            </div>
            <div className='min-[989px]:w-[49%] min-[989px]:float-right min-[989px]:inline-block'>
                <label htmlFor='idCard' className='block mb-4'>ID Card</label>
                <div className='relative'>
                <input required type="file" id='idCard' name='id_snippet' className={input} style={{ position: 'absolute', left: '-9999px' }} 
                accept="image/*" />
                    <label htmlFor='idCard' className={button + ' w-full h-full text-center cursor-pointer'}>Upload ID Card</label>
                </div>
            </div>
            <div className='pt-10'>
                <button className={button + ' float-right relative'} onClick={() => {handleNext}} >
                    Register
                    <div className='absolute top-[-25px] left-[65px] min-[640px]:left-[75px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
                    <div className='absolute top-[-25px] left-[40px] min-[640px]:left-[50px] w-[15px] h-[15px] rounded-full border bg-blue-300'></div>
                </button>
                <button className={button } onClick={handleBack}>
                    Back
                </button>
            </div>
        </>


    const forms = [form1, form2];
    const [currentForm, setCurrentForm] = useState(0);
    return (
        <div className={'mt-5 mb-[100px] w-full'}>
            <div className='flex flex-col gap-5 py-2 md:flex-row justify-center'>
                <form className={form + ' bg-white'} onSubmit={handleNext} noValidate>
                    {forms[currentForm]}
                </form>
            </div>
        </div>
    );
}
