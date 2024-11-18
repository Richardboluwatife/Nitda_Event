// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const UserRegistration = () => {
    // State to hold form data
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !phoneNumber || !email) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setError('Please enter a valid phone number');
            return;
        }

        setError('');
        // Here you can handle the API call or further processing of the form data
        console.log('User Registered:', { firstName, middleName, lastName, phoneNumber, email });
        // Optionally reset form after submission
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
    };

    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // Phone number validation function (basic)
    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{10}$/; // Basic validation for 10 digit phone numbers
        return regex.test(phoneNumber);
    };

    return (
        <div className="md:h-[480px] flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-semibold text-gray-900">Register User</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* First Name Input */}
                        <div>
                            <label htmlFor="firstName" className="sr-only">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="firstName"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-5"
                                placeholder="First Name"
                            />
                        </div>

                        {/* Middle Name Input */}
                        <div className="mt-4">
                            <label htmlFor="middleName" className="sr-only">
                                Middle Name
                            </label>
                            <input
                                id="middleName"
                                name="middleName"
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-5"
                                placeholder="Middle Name (Optional)"
                            />
                        </div>

                        {/* Last Name Input */}
                        <div className="mt-4">
                            <label htmlFor="lastName" className="sr-only">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="lastName"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-5"
                                placeholder="Last Name"
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div className="mt-4">
                            <label htmlFor="phoneNumber" className="sr-only">
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                autoComplete="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-5"
                                placeholder="Phone Number"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mt-4">
                            <label htmlFor="email" className="sr-only">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-5"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;