import { useContext, type ChangeEvent } from 'react';

import { Theme, ThemeContext } from '~context/ThemeContext';

export type TextareaProps = {
    id: string;
    size?: number;
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({
    id,
    size = 3,
    label,
    placeholder,
    value = '',
    onChange,
}: TextareaProps) {
    const theme = useContext(ThemeContext);
    const labelClasses = theme === Theme.light ? 'text-gray-900' : 'text-white';
    const textareaClasses =
        theme === Theme.light
            ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
            : 'bg-white/5 text-white ring-white/10 focus:ring-indigo-500';

    return (
        <>
            <label
                htmlFor={id}
                className={`block text-sm font-medium leading-6 ${labelClasses}`}>
                {label}
            </label>
            <div className="mt-2">
                <textarea
                    rows={size}
                    name={id}
                    className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${textareaClasses}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
            {/* <p className="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p> */}
        </>
    );
}
