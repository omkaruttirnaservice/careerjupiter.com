import React, { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WhatsAppSharePopup = ({ isOpen, onClose, shareLink, pdfStatus }) => {
    useEffect(() => {
        if (isOpen) {
            if (pdfStatus === 1) {
                toast.success("Download report successfully");
            } else if (pdfStatus === 0) {
                toast.success("Download certificate successfully");
            }
        }
    }, [isOpen, pdfStatus]);

    if (!isOpen) return null;

    const handleWhatsAppShare = () => {
        const label = pdfStatus === 1 ? 'report' : 'certificate';
        const text = `Check out my test ${label}: ${shareLink}`;
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/?text=${encodedText}`;
        window.open(url, '_blank');
    };

    const label = pdfStatus === 1 ? 'Report' : 'Certificate';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Share Your {label}</h2>
                <p className="text-sm text-gray-600">Click below to share your test {label.toLowerCase()} via WhatsApp.</p>
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
