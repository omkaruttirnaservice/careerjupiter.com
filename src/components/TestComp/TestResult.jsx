import { useState, useEffect, useRef } from 'react';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaQuestionCircle,
    FaTrophy,
    FaClock,
    FaStar,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ShareResultPopup from './ShareResultPopup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TestResultSkeleton from '../loading-skeleton/TestResultSkeleton';
import { FaShareAlt } from 'react-icons/fa';
import { BASE_URL } from '../../utils/constansts';
import Certificate from './Certificate';
ChartJS.register(ArcElement, Tooltip, Legend);
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from './Api';
import ShareCertificatePopup from './ShareCertificatePopup';
import IqTestReport from './IqTestReport';
import zIndex from '@mui/material/styles/zIndex';


function TestResult() {
    const resultData = useSelector((state) => state.testResult?.resultData);
    const [openSharePopup, setOpenSharePopup] = useState(false);
    const [passFailMessage, setPassFailMessage] = useState('');
    const [resultIcon, setResultIcon] = useState(
        <FaQuestionCircle className="text-amber-500 text-4xl sm:text-5xl" />
    );
    const [resultEmoji, setResultEmoji] = useState('🎉');
    const [percentage, setPercentage] = useState(0);
    const [isPassed, setIsPassed] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState(0);
    const [chartData, setChartData] = useState({
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: 'Answers',
                data: [0, 0, 0],
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
                borderWidth: 2,
            },
        ],
    });
    const [chartPercentage, setChartPercentage] = useState('0');
    const [_id, set_id] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [marksGained, setMarksGained] = useState(0);
    const [passingMarks, setPassingMarks] = useState(0);
    const [reportType, setReportType] = useState(0);
    const [testTitle, setTitle] = useState("");
    const [openCertificateSharePopup, setOpenCertificateSharePopup] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);


    const { userId } = useSelector((state) => state.auth);

    const certificateRef = useRef();
    const iqTestReportRef = useRef();
    const [certificateData, setCertificateData] = useState({
        name: 'John Doe',
        title: 'React JS',
    });

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['userDetail', userId],
        queryFn: () => getUserDetail(userId),
        enabled: !!userId, // only run if userId exists
    });

    console.log("user data inside result page :", userData?.data?.data?.f_name);

    const studentName = `${userData?.data?.data?.f_name} ${userData?.data?.data?.l_name}`


    useEffect(() => {
        if (userData) {
            setCertificateData((prev) => ({
                ...prev,
                name: `${userData?.data?.data?.f_name} ${userData?.data?.data?.l_name} `,
                title: testTitle
            }));
        }
    }, [userData]);


    const handleDownload = () => {
        const input = certificateRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const width = 297;
            // const height = (canvas.height * width) / canvas.width;
            const height = 210;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save(`${certificateData.name}_certificate.pdf`);
        });
    };

    const handleDownloadReport = () => {
        if (!iqTestReportRef.current) return;
        
        setIsDownloading(true); // start loading
        const input = iqTestReportRef.current;
        const watermarkText = "www.careerjupiter.com";
        const dateTimeString = new Date().toLocaleString();
    
        html2canvas(input, {
            scale: 2,
            useCORS: true
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
    
            const pageWidth = 210;
            const pageHeight = 297;
            const marginTop = 10.58;
            const marginBottom = 10.58;
            const usableHeight = pageHeight - marginTop - marginBottom;
    
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            let heightLeft = imgHeight;
            let position = marginTop;
    
            // First page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            addHeaderAndFooter(pdf, 1, dateTimeString, watermarkText, pageWidth, pageHeight);
    
            heightLeft -= usableHeight;
            let pageNum = 2;
    
            while (heightLeft > 0) {
                position = marginTop - (usableHeight * (pageNum - 1));
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                addHeaderAndFooter(pdf, pageNum, dateTimeString, watermarkText, pageWidth, pageHeight);
                heightLeft -= usableHeight;
                pageNum++;
            }
    
            pdf.save(`${studentName.replace(/\s+/g, '_')}_IQ_Test_Report.pdf`);
        }).catch(error => {
            console.error('Error generating PDF:', error);
        }).finally(() => {
            setIsDownloading(false); // stop loading
        });
    };
    

// Helper to add watermark, date, and margins to each page
const addHeaderAndFooter = (pdf, pageNumber, dateTime, watermarkText, pageWidth, pageHeight) => {
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(12);
    // Watermark in the center
    pdf.setFontSize(40);
    pdf.setTextColor(220, 220, 220);
    pdf.text(watermarkText, pageWidth / 2, pageHeight / 2, {
        angle: -45,
        align: 'center',
        zIndex:-1
    });
};

    
    

    useEffect(() => {
        if (resultData?.result) {
            console.log(resultData?.result, '-resultData?.result');
            const {
                totalQuestions: tQ,
                correctAnswers: cA,
                wrongAnswers: wA,
                totalMarks: tM,
                marksGained: mG,
                passingmarks: pM,
                _id: id,
                reportType: rT,
                title: tl
            } = resultData?.result;

            setTotalQuestions(tQ);
            setCorrectAnswers(cA);
            setWrongAnswers(wA);
            setTotalMarks(tM);
            setMarksGained(mG);
            setPassingMarks(pM);
            set_id(id);
            setReportType(rT);
            setTitle(tl);

            const calculatedPercentage = (mG / tM) * 100;
            setPercentage(calculatedPercentage);
            setIsPassed(mG >= pM);

            const calculatedSkippedQuestions = tQ - (cA + wA);
            setSkippedQuestions(calculatedSkippedQuestions);

            setChartData({
                labels: ['Correct', 'Incorrect'],
                datasets: [
                    {
                        label: 'Answers',
                        data: [cA, wA, calculatedSkippedQuestions],
                        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
                        borderWidth: 2,
                    },
                ],
            });

            setChartPercentage(((cA / tQ) * 100).toFixed(0));
        }
    }, [resultData]);

    useEffect(() => {
        if (percentage >= 75) {
            setPassFailMessage("Excellent! You've mastered this test!");
            setResultIcon(<FaTrophy className="text-amber-500 text-4xl sm:text-5xl" />);
            setResultEmoji('🏆');
        } else if (percentage >= 50) {
            setPassFailMessage("Well done! You're on the right track!");
            setResultIcon(<FaCheckCircle className="text-blue-500 text-4xl sm:text-5xl" />);
            setResultEmoji('👍');
        } else if (percentage >= 25) {
            setPassFailMessage('Good effort! Keep practicing to improve.');
            setResultIcon(<FaCheckCircle className="text-blue-400 text-4xl sm:text-5xl" />);
            setResultEmoji('🔄');
        } else {
            setPassFailMessage('Keep going! Every attempt helps you learn.');
            setResultIcon(<FaTimesCircle className="text-red-500 text-4xl sm:text-5xl" />);
            setResultEmoji('📚');
        }
    }, [percentage]);

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                    padding: 20,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#333',
                bodyColor: '#333',
                bodyFont: {
                    size: 14,
                },
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
            },
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: true,
    };

    if (!resultData) return <TestResultSkeleton />;

    return (
        <>
            <ShareResultPopup
                setOpenSharePopup={setOpenSharePopup}
                openSharePopup={openSharePopup}
                resultId={_id}
            />

            <div className="bg-white shadow-md overflow-hidden max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-300 p-4 sm:p-5 text-white">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                        <FaStar className="text-yellow-300 text-base sm:text-lg" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Test Results</h2>
                        <FaStar className="text-yellow-300 text-base sm:text-lg" />
                    </div>

                    <div className="flex items-center justify-center mt-2">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            {marksGained}/{totalMarks}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Stats Cards */}
                    <div className="w-full lg:w-1/3 p-3 sm:p-4 bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                                <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                    <FaClock className="text-blue-600 text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Total Questions
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                                        {totalQuestions}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                                <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                    <FaCheckCircle className="text-green-600 text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Correct Answers
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold text-green-600">
                                        {correctAnswers}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                                <div className="bg-red-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                    <FaTimesCircle className="text-red-600 text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Wrong Answers
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold text-red-600">
                                        {wrongAnswers}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="w-full lg:w-2/3 p-3 sm:p-4 md:p-5">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
                            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                                <Doughnut data={chartData} options={chartOptions} />
                                <div className="absolute inset-0 flex flex-col items-center mb-8 justify-center">
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                                        {chartPercentage}%
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">Accuracy</div>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4 w-full max-w-md">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left">
                                    Performance Summary
                                </h3>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                                    <div className="text-xs sm:text-sm md:text-base text-gray-700 flex-1">
                                        {correctAnswers} Correct
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                                    <div className="text-xs sm:text-sm md:text-base text-gray-700 flex-1">
                                        {wrongAnswers} Incorrect
                                    </div>
                                </div>

                                <div className="pt-1 sm:pt-2">
                                    <div className="text-xs sm:text-sm md:text-base text-gray-500">
                                        Score Percentage
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mt-1">
                                        <div
                                            className={`h-2 sm:h-2.5 rounded-full ${percentage >= 75
                                                ? 'bg-green-600'
                                                : percentage >= 50
                                                    ? 'bg-blue-600'
                                                    : percentage >= 25
                                                        ? 'bg-amber-500'
                                                        : 'bg-red-600'
                                                }`}
                                            style={{ width: `${percentage}%` }}></div>
                                    </div>
                                    <div className="text-right text-xs sm:text-sm md:text-base mt-1 font-medium text-gray-700">
                                        {percentage.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Message */}
                <div
                    className={`p-3 sm:p-4 md:p-5 flex items-center justify-center flex-col gap-1 sm:gap-2 ${isPassed ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                    <div className="flex items-center gap-2">{resultIcon}</div>
                    <p
                        className={`text-center text-sm sm:text-base md:text-lg font-medium ${isPassed ? 'text-green-700' : 'text-red-700'
                            }`}>
                        {passFailMessage}
                        {resultEmoji}
                    </p>
                </div>

                <div style={{
                    position: 'absolute', top: '-10000px', left: '-10000px', width: '210mm', // Match A4 width
                    background: 'white'
                }}>
                    <Certificate
                        ref={certificateRef}
                        name={certificateData.name}
                        course={certificateData.title}
                    />
                    <IqTestReport
                        ref={iqTestReportRef}
                        studentName={studentName}
                        studentScore={marksGained}
                        totalMarks={totalMarks} />
                </div>

                {reportType === 1 && (
                    // <div className="flex justify-center my-2">
                    //     <button
                    //         onClick={handleDownloadReport}
                    //         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    //         disabled={!iqTestReportRef.current} // Disable if ref not ready
                    //     >
                    //         Download Test Report
                    //     </button>
                    // </div>
                    <div className="flex justify-center my-2">
    <button
        onClick={handleDownloadReport}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 ${
            isDownloading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        disabled={!iqTestReportRef.current || isDownloading}
    >
        {isDownloading ? (
            <>
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
                Generating...
            </>
        ) : (
            "Download Test Report"
        )}
    </button>
</div>

                )}

                        {reportType === 1 && (
                            <button
                                onClick={handleDownloadReport}
                                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!iqTestReportRef.current}
                            >
                                📄 Download Test Report
                            </button>
                        )}

                        {reportType === 0 && (
                            <>
                                <button
                                    onClick={handleDownload}
                                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-semibold text-white bg-orange-500 rounded-xl shadow-md hover:bg-orange-600 transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    🎓 Download Certificate
                                </button>

                                <button
                                    onClick={() => setOpenCertificateSharePopup(true)}
                                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    📤 Share Certificate
                                </button>
                            </>
                        )}

                    </div>
                </div>

                <ShareCertificatePopup
                    isOpen={openCertificateSharePopup}
                    onClose={() => setOpenCertificateSharePopup(false)}
                    shareUrl={`${BASE_URL}/certificates/${userId}.pdf`} // customize this URL if needed
                />

                {/* Action Buttons */}
                <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                    <button
                        className="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition shadow-lg p-4"
                        onClick={() => setOpenSharePopup(true)}
                        aria-label="Share results">
                        <FaShareAlt className="w-10 h-10 sm:w-6 sm:h-6 mb-1" />
                        <span className="text-[10px] sm:text-xs leading-none">Share</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default TestResult;
