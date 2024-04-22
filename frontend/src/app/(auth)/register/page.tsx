'use client';
import React, { useState } from 'react';
import { button, input, a, h2, h3, form, formContainer, container, card} from '../../../components/styleVar';

export default function RegisterPage() {
    const pureCard = card + ' cursor-pointer';
    const chosen = pureCard + ' border-blue-500';
    const [type, setType] = useState('individual');
    const [card1, setCard1] = useState(chosen);
    const [card2, setCard2] = useState(pureCard);
    const [showContent, setShowContent] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);

    const handleType = (type: string) => {
        setType(type);
        if (type === 'individual') {
            setCard1(chosen);
            setCard2(pureCard);
        } else {
            setCard2(chosen);
            setCard1(pureCard);
        }
        setShowContent(false);
        setShowInitialContent(true); // Reset initial content when type changes
    };

    const handleNext = () => {
        setShowContent(true);
        setShowInitialContent(false); // Hide initial content when "Next" button is clicked
    }

    return (
        <div className={container + ' py-20'}>
            {showInitialContent && ( // Render initial content if showInitialContent is true
                <>
                    <h2 className={h2 + ' min-[1024px]:pl-[14.5vw]'}>Choose account type</h2>
                    <div className={formContainer}>
                        <div className={card1}
                            onClick={() => handleType('individual')}
                        >
                            <h2 className={h3}>Individual</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi facilis doloribus non eaque temporibus adipisci at. Minima maiores tempora enim. Animi deleniti laboriosam unde provident perspiciatis nostrum voluptatum tempore tenetur!</p>
                        </div>
                        <div className={card2}
                            onClick={() => handleType('institution')}
                        >
                            <h2 className={h3}>Institution</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias recusandae vel soluta alias eveniet vitae hic temporibus dignissimos rem aliquid totam unde illum, fuga accusantium dolorum minima quo labore amet!</p>
                        </div>
                    </div>
                    <button className={button + ' w-1/2 sm:w-1/4 m-auto max-w-[200px]'} onClick={handleNext}>Next</button>
                </>
            )}
            {showContent && ( // Render content if showContent is true
                <>
                    {type === 'individual' ? individual() : institution()}
                </>
            )}
        </div>
    );
}

function individual() {
    return (
        <div>
            <h2>Individual</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quidem?</p>
        </div>
    );
}

function institution() {
    return (
        <div>
            <h2>Institution</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quidem?</p>
        </div>
    );
}
