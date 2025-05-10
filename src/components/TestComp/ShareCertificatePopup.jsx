import React from 'react';
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { BASE_URL } from '../../utils/constansts';
import { useSelector } from 'react-redux';

const ShareCertificatePopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { userId } = useSelector((state) => state.auth);

    // Generate dynamic certificate image URL based on userId
    const certificateUrl = `${BASE_URL}/certificates/${userId}.jpg`;  // Assuming certificate is in JPG format
    const encodedUrl = encodeURIComponent(certificateUrl);  // URL encode the certificate URL

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=Check out my certificate!%0A${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
                <button className="absolute top-2 right-3 text-gray-500" onClick={onClose}>✕</button>
                <h3 className="text-lg font-semibold mb-4 text-center">Share Certificate</h3>
                <div className="flex justify-center mb-4">
                    <img src={certificateUrl} alt="Certificate" className="w-40 h-auto rounded-lg" /> {/* Display the certificate image */}
                </div>
                <div className="flex justify-around text-2xl space-x-4">
                    <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-600">
                        <FaWhatsapp />
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                        <FaFacebookF />
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <FaLinkedinIn />
                    </a>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShareCertificatePopup;
