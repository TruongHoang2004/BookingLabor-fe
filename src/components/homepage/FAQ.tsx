import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { AiOutlinePlus } from "react-icons/ai";

const FAQ: React.FC = () => {
    const question = ['What is DreamLabour', 'What is DreamLabour', 'What is DreamLabour'];
    const answer = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ];
    return (
        <div>
            <div className='flex justify-center m-auto mt-20 mb-8 w-8/12'>
                <p className='border-zinc-600 px-10 pb-2 border-b-2 font-bold text-4xl'>FAQ</p>
            </div>
            <div className='bg-white m-auto py-12 p-8 rounded-xl w-8/12 text-gray-500'>
                <Accordion variant="splitted" selectionMode="multiple">
                    {question.map((q, index) => (
                        <AccordionItem
                            key={index}
                            aria-label={`Accordion ${index + 1}`}
                            title={q}
                            className='font-semibold'
                            startContent={
                                <AiOutlinePlus />
                            }
                        >
                            {answer[index]}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export default FAQ;