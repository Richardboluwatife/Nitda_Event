/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const AttendeeForm = ({ scannedData, onRegister }) => {
    const handleRegisterClick = () => {
        if (scannedData) {
            onRegister(scannedData);
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Attendee Details</h2>
            {scannedData ? (
                <div className="space-y-2">
                    <p><strong>Name:</strong> {scannedData.name}</p>
                    <p><strong>Email:</strong> {scannedData.email}</p>
                    <p><strong>Ticket ID:</strong> {scannedData.ticketId}</p>
                    <button
                        onClick={handleRegisterClick}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Register
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">No data scanned yet. Please scan a QR code.</p>
            )}
        </div>
    );
};

export default AttendeeForm;
