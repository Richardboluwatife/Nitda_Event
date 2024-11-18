// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import jsQR from "jsqr";  // To scan QR codes from images
import { FiSearch } from "react-icons/fi"; // Importing search icon from react-icons

// eslint-disable-next-line react/prop-types
const QRScanner = ({ onScan }) => {
    const [facingMode, setFacingMode] = useState("environment"); // Default to back camera
    const [errorMessage, setErrorMessage] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [scanningMessage, setScanningMessage] = useState("");
    const [showEmailInput, setShowEmailInput] = useState(false); // New state to toggle email input visibility
    const [email, setEmail] = useState(""); // State for email input

    // Handle the QR code scan from the camera
    const handleScan = (data) => {
        if (data) {
            console.log("Scanned Data (Camera):", data.text);  // Log the scanned QR code data
            if (validateQRData(data.text)) {
                onScan(data.text); // If valid, pass it to parent component
            } else {
                setErrorMessage("Invalid QR Code format.");
            }
            setIsScanning(false); // Stop scanning after success
        }
    };

    // Handle any errors related to QR scanning
    const handleError = (err) => {
        console.error("QR Scanner error:", err);
        setErrorMessage(`Unable to access the camera. Error: ${err.message}`);
        setScanningMessage(""); // Clear scanning message on error
    };

    // Toggle between front and back camera
    const toggleCamera = () => {
        setFacingMode((prevMode) =>
            prevMode === "environment" ? "user" : "environment"
        );
    };

    // Start the scanning process (camera)
    const startScanning = () => {
        setIsScanning(true);
        setScanningMessage("Scanning... Please hold the QR code in front of the camera.");
    };

    // Handle the image file selection and decode the QR code from it
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsScanning(true); // Start scanning when image is selected
            setScanningMessage("Scanning the image...");

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create a canvas to decode the QR code from the image
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0, img.width, img.height);

                    // Get the image data from the canvas and scan for a QR code
                    const imageData = context.getImageData(0, 0, img.width, img.height);
                    const code = jsQR(imageData.data, img.width, img.height);

                    if (code) {
                        console.log("Scanned Data (Image):", code.data); // Log the scanned QR code data
                        if (validateQRData(code.data)) {
                            onScan(code.data); // If valid, pass it to parent component
                        } else {
                            setErrorMessage("Invalid QR Code format.");
                        }
                    } else {
                        setErrorMessage("No QR code found in the image.");
                    }
                    setScanningMessage(""); // Clear scanning message after processing
                };
                img.src = e.target.result; // Load the image
            };
            reader.readAsDataURL(file); // Read the file as DataURL (base64 string)
        }
    };

    // Helper function to validate QR code data
    const validateQRData = (data) => {
        // Example validation: check if it's a valid URL (you can adjust based on your needs)
        try {
            const url = new URL(data);
            return url.protocol === "http:" || url.protocol === "https:";
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            return false; // Invalid URL format
        }
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="border rounded-lg p-4 bg-gray-100 shadow-sm text-center max-w-lg mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-4 text-center flex-1">
                    Scan QR Code
                </h2>

                {/* Search icon that toggles the email input */}
                <div className="text-gray-500 cursor-pointer" onClick={() => setShowEmailInput(!showEmailInput)}>
                    <FiSearch size={20} />
                </div>
            </div>  

            {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            {scanningMessage && (
                <div className="mt-4 text-gray-600">
                    <p>{scanningMessage}</p>
                </div>
            )}

            {showEmailInput ? (
                // Show email input when search icon is clicked
                <div className="mt-4">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="border rounded px-4 py-2 w-full sm:w-auto"
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                        onClick={() => alert("Email submitted: " + email)} // You can replace this with actual form submission logic
                    >
                        Submit Email
                    </button>
                </div>
            ) : (
                // Default scanning options
                !isScanning && (
                    <>
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
                            onClick={startScanning}
                        >
                            Start Scanning
                        </button>

                        <div className="mt-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="border rounded px-4 py-2 w-full sm:w-auto"
                            />
                        </div>
                    </>
                )
            )}

            {isScanning && (
                <>
                    <div className="mt-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
                    </div>

                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%", height: "300px" }}
                        constraints={{
                            video: {
                                facingMode,
                            },
                        }}
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                        onClick={toggleCamera}
                    >
                        Switch to {facingMode === "environment" ? "Front" : "Back"} Camera
                    </button>
                </>
            )}
        </div>
    );
};

export default QRScanner;