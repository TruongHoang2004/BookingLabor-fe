'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { AiOutlinePlus } from "react-icons/ai";

const FAQ: React.FC = () => {
    const question = [
        'What is DreamLabour?',
        'How does DreamLabour work?',
        'What services does DreamLabour offer?',
        'How can I contact DreamLabour?',
        'What are the benefits of using DreamLabour?'
    ];
    const answer = [
        "DreamLabour is a platform that connects skilled laborers with clients who need their services. It aims to streamline the process of finding and hiring reliable workers.",
        "DreamLabour works by allowing clients to post job listings and laborers to apply for those jobs. The platform facilitates communication and payment between both parties.",
        "DreamLabour offers a variety of services including plumbing, electrical work, carpentry, cleaning, and more. It aims to provide a one-stop solution for all labor needs.",
        "You can contact DreamLabour through their website's contact form, by email at support@dreamlabour.com, or by calling their customer service hotline.",
        "Using DreamLabour ensures that you get access to a pool of vetted and skilled laborers, secure payment methods, and reliable customer support."
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