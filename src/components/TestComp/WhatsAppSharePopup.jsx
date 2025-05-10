import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppSharePopup = ({ isOpen, onClose, shareLink }) => {
    if (!isOpen) return null;

    console.log("whatsApp share link",isOpen );
    

    const handleWhatsAppShare = () => {
        const text = `Check out my test report: ${shareLink}`;
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/?text=${encodedText}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Share Your Report</h2>
                <p className="text-sm text-gray-600">Click below to share your test report via WhatsApp.</p>
                <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                >
                    <FaWhatsapp className="text-xl" /> Share on WhatsApp
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default WhatsAppSharePopup;
