import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { sendShareState } from './Api';
import { FiX } from 'react-icons/fi';

const ShareResultPopup = ({ setOpenSharePopup, openSharePopup, resultId, reportType, testId }) => {
    const closePopup = () => setOpenSharePopup(false);
    const { userId } = useSelector((state) => state.auth);
    const iqTestId = useSelector((state) => state.iqTest.iqTestId);
    const [deviceType, setDeviceType] = useState('');

    const sharedDataMutation = useMutation({
        mutationFn: sendShareState,
        onSuccess: (data) => {},
    });

    useEffect(() => {
        const userAgent = navigator.userAgent;

        // Checking for specific device types
        if (/mobile/i.test(userAgent)) {
            setDeviceType('Mobile');
        } else if (/tablet/i.test(userAgent) || /iPad|Android(?!.*Mobile)/i.test(userAgent)) {
            setDeviceType('Tablet');
        } else if (
            /desktop/i.test(userAgent) ||
            (!/mobile/i.test(userAgent) && !/tablet/i.test(userAgent))
        ) {
            setDeviceType('Desktop');
        } else {
            setDeviceType('Unknown Device');
        }
    });

    const handleSharedState = () => {
        sharedDataMutation.mutate({
            resultId: resultId,
            iqTestId: iqTestId,
            isShared: true,
        });
        closePopup;
    };

    // Function to generate dynamic share URLs
    const generateShareUrl = (platform) => {
        let path = reportType === 0 ? 'certificate' : 'report';
        return `https://certificate.careerjupiter.com/${path}/${userId}/${testId}`;
    };

    // Social media sharing links with dynamic utm_medium
    const socialMediaLinks = {
        // facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generateShareUrl("facebook"))}`,
        // twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(generateShareUrl("twitter"))}&text=Check+this+out!`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent('Check this out: ' + generateShareUrl('whatsapp'))}`,
        // linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generateShareUrl("linkedin"))}`,
        // instagram: `https://www.instagram.com/?url=${encodeURIComponent(generateShareUrl("instagram"))}`, // Instagram doesn't support direct sharing
    };

    return (
        <div className="flex justify-center items-center position-FiX ">
            {openSharePopup && (
                <div
                    className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center"
                    onClick={closePopup}>
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative"
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold text-gray-800">Share This!</h2>
                        <p className="text-gray-600 mt-2">
                            Share with your friends on social media.
                        </p>

                        <div className="flex justify-center space-x-4 mt-4">
                            {/* <a
                                href={socialMediaLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:scale-110 transition transform duration-200"
                                onClick={handleSharedState}>
                                <FaFacebook size={32} />
                            </a>
                            <a
                                href={socialMediaLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:scale-110 transition transform duration-200"
                                onClick={handleSharedState}>
                                <FaTwitter size={32} />
                            </a> */}
                            <a
                                href={socialMediaLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:scale-110 transition transform duration-200"
                                onClick={handleSharedState}>
                                <FaWhatsapp size={32} />
                            </a>
                            {/* <a
                                href={socialMediaLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-800 hover:scale-110 transition transform duration-200"
                                onClick={handleSharedState}>
                                <FaLinkedin size={32} />
                            </a>
                            <a
                                href={socialMediaLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:scale-110 transition transform duration-200"
                                onClick={handleSharedState}>
                                <FaInstagram size={32} />
                            </a> */}
                        </div>

                        <button
                            className="mt-5 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareResultPopup;
