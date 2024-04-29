import { h3 } from '@/components/styleVar';

export default function Question ()  {
    return (
        <div className='--question-- sm:w-[90%] mx-auto my-2 flex flex-col justify-center items-center'>
            <h3 className={h3 + ' sm:my-2'}>Question Title</h3>
            <div className='--options-- w-[100%] sm:w-[90%] mx-auto flex flex-col justify-center items-center'>
                <div className='--option-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delaty-100 '>
                    <input type="radio" name="option" id="option1" className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
                    <label htmlFor="option1" className='w-[100%] text-right cursor-pointer'>Option 1</label>
                </div>
                <div className='--option-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delaty-100 '>
                    <input type="radio" name="option" id="option2" className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
                    <label htmlFor="option2" className='w-[100%] text-right cursor-pointer'>Option 2</label>
                </div>
                <div className='--option-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delaty-100 '>
                    <input type="radio" name="option" id="option3" className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
                    <label htmlFor="option3" className='w-[100%] text-right cursor-pointer'>Option 3</label>
                </div>

                <div className='--option-- w-[90%] mx-auto my-2 flex flex-row justify-between items-center border py-3 px-2 hover:bg-gray-200 transition-background delaty-100 '>
                    <input type="radio" name="option" id="option4" className="mr-2 w-5 h-5 border-2 border-black rounded-full" />
                    <label htmlFor="option4" className='w-[100%] text-right cursor-pointer'>Option 4</label>
                </div>
            </div>
        </div>
    );
}