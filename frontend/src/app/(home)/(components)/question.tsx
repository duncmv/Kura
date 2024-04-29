import { h3 } from '@/components/styleVar';

export default function Question (questionData: any)  {
    questionData = questionData.questionData;
    const answers = questionData.answers.map((answer: any) => {
        return (
            <div key={answer.id} className='--answer-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delaty-100 '>
                <input type="radio" name="option" id={answer.id} className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
                <label htmlFor={answer.id} className='w-[100%] text-right cursor-pointer'>{answer.text}</label>
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