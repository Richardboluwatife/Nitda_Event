/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const AttendeeList = ({ attendees }) => {
    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Registered Attendees</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Ticket ID</th>
                        <th className="border px-4 py-2">Registered At</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{attendee.name}</td>
                            <td className="border px-4 py-2">{attendee.email}</td>
                            <td className="border px-4 py-2">{attendee.ticketId}</td>
                            <td className="border px-4 py-2">
                                {new Date(attendee.registeredAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendeeList;
