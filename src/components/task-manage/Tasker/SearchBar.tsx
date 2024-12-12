'use client'
import { useState } from 'react';

export default function TaskSearchBar({ onSearch }: {
    onSearch: (taskId: string) => void
}) {
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState('');

    const isValidFormat = (value: string) => {
        const pattern = /^[A-Z]\d{3}$/;
        return pattern.test(value);
    }

    const handleSearch = () => {
        if (!searchValue) {
            setError('Please enter a Task ID');
            return;
        }

        if (!isValidFormat(searchValue)) {
            setError('Invalid format. Task ID should be 1 letter followed by 3 numbers (e.g., A001)');
            return;
        }

        setError('');
        onSearch(searchValue);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Task ID (e.g., A001)"
                    className="bg-white shadow-xl hover:shadow-lg px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full transition-shadow focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="right-2 absolute p-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}