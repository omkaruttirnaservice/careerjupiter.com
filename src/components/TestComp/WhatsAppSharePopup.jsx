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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 max-w-[90%] text-center space-y-5 animate-modal-entrance">
                <style>
                    {`
                    @keyframes modalEntrance {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes iconBounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-modal-entrance { 
                        animation: modalEntrance 0.3s ease-out; 
                    }
                    .animate-icon-bounce { 
                        animation: iconBounce 0.8s ease-in-out 0.3s; 
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }
                    `}
                </style>
                
                <h2 className="text-2xl font-bold text-gray-800">Share Your {label}</h2>
                <p className="text-base text-gray-600">Click below to share your test {label.toLowerCase()} via WhatsApp.</p>
                
                <button
                    onClick={handleWhatsAppShare}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3 text-lg font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-300 shadow-md hover:scale-105"
                >
                    <FaWhatsapp className="text-2xl animate-icon-bounce" />
                    Share on WhatsApp
                </button>

                <button
                    onClick={onClose}
                    className="block w-full text-sm text-gray-500 hover:underline mt-3 hover:text-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default WhatsAppSharePopup;