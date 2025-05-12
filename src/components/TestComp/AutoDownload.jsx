import React, { useState, useEffect } from 'react';

const AutoDownload = ({ generateReportPdf, generateCertificatePdf }) => {
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        let intervalId;
        let timeoutId;

        if (generateReportPdf) {
            setCountdown(5);

            intervalId = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(intervalId);
                    }
                    return prev - 1;
                });
            }, 1000);

            timeoutId = setTimeout(() => {
                handleReportDownload();
                setCountdown(null);
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [generateReportPdf]);

    useEffect(() => {
        let intervalId;
        let timeoutId;

        if (generateCertificatePdf) {
            setCountdown(5);

            intervalId = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(intervalId);
                    }
                    return prev - 1;
                });
            }, 1000);

            timeoutId = setTimeout(() => {
                handleCertificateDownload();
                setCountdown(null);
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [generateCertificatePdf]);

    const handleReportDownload = () => {
        // actual logic for downloading report
        console.log("Report downloaded");
    };

    const handleCertificateDownload = () => {
        // actual logic for downloading certificate
        console.log("Certificate downloaded");
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-2xl p-6 w-[90%] max-w-sm text-center">
    {countdown !== null && (
        <div>
            <p className="text-gray-800 text-base md:text-lg font-medium">Download Completed in...</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{countdown}s</p>
        </div>
    )}
</div>

    );
};

export default AutoDownload;
