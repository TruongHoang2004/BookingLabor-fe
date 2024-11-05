import React from 'react';
import {Accordion, AccordionItem} from '@nextui-org/accordion';
import { AiOutlinePlus } from "react-icons/ai";

const FAQ: React.FC = () => {
    const question=['What is DreamLabour','What is DreamLabour','What is DreamLabour'];
    const answer=[
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ];
    return (
        <div>
            <div className='w-8/12 m-auto flex justify-center mb-8 mt-20'>
                <p className='text-4xl font-bold border-b-2 border-zinc-600 pb-2 px-10'>FAQ</p>
            </div>
            <div className='w-8/12 m-auto p-8 rounded-xl bg-white text-gray-500 py-12'>
                <Accordion variant="splitted" selectionMode="multiple">
                    {question.map((q, index) => (
                        <AccordionItem 
                            key={index} 
                            aria-label={`Accordion ${index + 1}`} 
                            title={q}
                            className='font-semibold'
                            startContent={                            
                                <AiOutlinePlus/>
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