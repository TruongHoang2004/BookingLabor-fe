import * as React from 'react';

interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
    return (
        <form className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]" onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;