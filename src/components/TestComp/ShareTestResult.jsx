import { useState, useEffect, useRef } from 'react';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaQuestionCircle,
    FaTrophy,
    FaClock,
    FaStar,
    FaBrain,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TestResultSkeleton from '../loading-skeleton/TestResultSkeleton';
import { BASE_URL } from '../../utils/constansts';
import Certificate from './Certificate';
ChartJS.register(ArcElement, Tooltip, Legend);
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getResult, getUserDetail, uploadReport } from './Api';
import IqTestReport from './IqTestReport';
import { setTestResult } from '../../store-redux/testResultSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { updateUserId } from '../../store-redux/AuthSlice';
import AutoDownload from './AutoDownload';
import { toast } from 'react-toastify';
import { AiFillHome } from 'react-icons/ai';

function ShareTestResult() {
    const resultDataFromRedux = useSelector((state) => state.testResult?.resultData);
    const [resultData, setResultData] = useState(null);
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
    const [testTitle, setTitle] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [testId, setTestId] = useState(null);
    const [openWhatsappSharePopup, setOpenWhatsappSharePopup] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [pdfStatus, setPdfStatus] = useState(null);
    const [generateReportPdf, setGenerateReportPdf] = useState(false);
    const [generateCertificatePdf, setGenerateCertificatePdf] = useState(false);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [showButtons, setShowButton] = useState(false);

    const { userId } = useSelector((state) => state.auth);

    const certificateRef = useRef();
    const iqTestReportRef = useRef();
    const [certificateData, setCertificateData] = useState({
        name: 'Candidate Name',
        title: 'IQ Test',
    });


    const report_Type = searchParams.get('report_type');

    // get result & user data directly first user visit that page

    const { mutate: fetchResult, data: resultTestData } = useMutation({
        mutationFn: ({ testID, userId }) => getResult({ testID, userId }),
    });

    const uid = searchParams.get('uid');

    const { data: userData, isLoading: userLoading, refetch: getUser } = useQuery({
        queryKey: ['userDetail', uid],
        queryFn: () => getUserDetail(uid),
        enabled: !!uid,
    });

    // 🔁 Trigger API call on mount if URL has valid params
    useEffect(() => {
        const uid = searchParams.get('uid');
        const tid = searchParams.get('tid');

        if (uid && tid) {
            fetchResult({ userId: uid, testID: tid });
            dispatch(updateUserId(uid));
            setShowButton(true);
            // getUser();
        }
    }, [searchParams, fetchResult]);

    // ✅ Store in Redux once data comes in
    useEffect(() => {
        if (resultTestData?.data) {
            dispatch(setTestResult(resultTestData.data));
            if (report_Type === '1') {
                setGenerateReportPdf(true);
            } else {
                setGenerateCertificatePdf(true);
            }
        }
    }, [resultTestData?.data, dispatch, report_Type]);

    useEffect(() => {
        if (resultDataFromRedux) {
            setResultData(resultDataFromRedux);
            localStorage.setItem('testResult', JSON.stringify(resultDataFromRedux));
        } else {
            const savedData = localStorage.getItem('testResult');
            if (savedData) {
                setResultData(JSON.parse(savedData));
            }
        }
    }, [resultDataFromRedux]);

    useEffect(() => {
        if (userData) {
            setCertificateData((prev) => ({
                ...prev,
                name: `${userData?.data?.data?.f_name} ${userData?.data?.data?.l_name} `,
                title: testTitle,
            }));
        }
    }, [userData, testTitle]);

    const handleCertificateDownload = () => {
        const input = certificateRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const width = 297;
            const height = 210;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save(`${certificateData.name}_certificate.pdf`);
        });
    };

    const handleReportDownload = () => {
        if (!iqTestReportRef.current) return;
        setIsDownloading(true);
        const input = iqTestReportRef.current;
        const watermarkText = 'www.careerjupiter.com';
        const dateTimeString = new Date().toLocaleString();

        html2canvas(input, {
            scale: 1.5,
            useCORS: true,
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
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

                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
                addHeaderAndFooter(pdf, 1, dateTimeString, watermarkText, pageWidth, pageHeight);

                heightLeft -= usableHeight;
                let pageNum = 2;

                while (heightLeft > 0) {
                    position = marginTop - usableHeight * (pageNum - 1);
                    pdf.addPage();
                    pdf.addImage(
                        imgData,
                        'JPEG',
                        0,
                        position,
                        imgWidth,
                        imgHeight,
                        undefined,
                        'FAST'
                    );
                    addHeaderAndFooter(
                        pdf,
                        pageNum,
                        dateTimeString,
                        watermarkText,
                        pageWidth,
                        pageHeight
                    );
                    heightLeft -= usableHeight;
                    pageNum++;
                }

                pdf.save(`${studentName.replace(/\s+/g, '_')}_IQ_Test_Report.pdf`);
            })
            .finally(() => {
                setIsDownloading(false);
            });
    };

    const addHeaderAndFooter = (
        pdf,
        pageNumber,
        dateTime,
        watermarkText,
        pageWidth,
        pageHeight
    ) => {
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(12);
        pdf.setFontSize(40);
        pdf.setTextColor(220, 220, 220);
        pdf.text(watermarkText, pageWidth / 2, pageHeight / 2, {
            angle: -45,
            align: 'center',
            zIndex: -1,
        });
    };

    // auto download report and pdf

    useEffect(() => {
        let timeoutId;

        if (generateReportPdf === true) {
            timeoutId = setTimeout(() => {
                handleReportDownload();
                toast.success('Download report successfully');
            }, 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [generateReportPdf]);

    useEffect(() => {
        let timeoutId;

        if (generateCertificatePdf === true) {
            timeoutId = setTimeout(() => {
                handleCertificateDownload();
                toast.success('Download certificate successfully');
            }, 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [generateCertificatePdf]);

    useEffect(() => {
        if (resultData?.result) {
            const {
                totalQuestions: tQ,
                correctAnswers: cA,
                wrongAnswers: wA,
                totalMarks: tM,
                marksGained: mG,
                passingmarks: pM,
                testID: tID,
                _id: id,
                reportType: rT,
                title: tl,
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
            setTestId(tID);

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

    // const { mutate: uploadReportPdf, data: uploadPdfResponse } = useMutation({
    //     mutationFn: (payload) => uploadReport(payload),
    //     onSuccess: (response) => {
    //         if (response?.data?.report) {
    //             handleReportDownload();
    //             setPdfStatus(1);
    //             // setShareLink(generateShareableLink(response?.data?.report));
    //             setShareLink(response?.data?.report);
    //             setOpenWhatsappSharePopup(true);
    //         } else {
    //             console.log('unable to download report 2');
    //         }
    //     },
    // });

    // const {
    //     mutate: uploadCertificatePdf,
    //     data: uploadCertificatePdfResponse,
    //     isPending: isUploading,
    // } = useMutation({
    //     mutationFn: (payload) => uploadCertificate(payload),
    //     onSuccess: (response) => {
    //         if (response?.data?.certificate) {
    //             handleCertificateDownload();
    //             setPdfStatus(0);
    //             setShareLink(response?.data?.certificate);
    //             setOpenWhatsappSharePopup(true);
    //         } else {
    //             console.log('unable to download certificate 2');
    //         }
    //     },
    // });

    // setShareLink(generateShareableLink(response?.data?.certificate));

    // useEffect(() => {
    //     if (uploadPdfResponse?.data?.success) {
    //         const link = `${BASE_URL}/reports/${userId}.pdf`;
    //         setShareLink(link);
    //         setOpenWhatsappSharePopup(true);
    //     }
    // }, [uploadPdfResponse]);

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

    const studentName = `${userData?.data?.data?.f_name} ${userData?.data?.data?.l_name}`;

    return (
        <>
            <div className="relative bg-white shadow-lg max-w-7xl overflow-hidden mx-auto rounded-xl border border-gray-200">

                <div className="bg-gradient-to-r from-slate-100 to-blue-100 text-slate-800 px-4 py-6 sm:px-6 sm:py-10">
                    <div className="max-w-4xl mx-auto text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <FaStar className="text-yellow-400 text-xl sm:text-2xl" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Test Results</h2>
                            <FaStar className="text-yellow-400 text-xl sm:text-2xl" />
                        </div>
                        <div className="text-4xl sm:text-5xl font-extrabold text-blue-700">
                            {marksGained}/{totalMarks}
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-left">
                        <div className="text-center sm:text-left">
                            <h1 className="text-sm sm:text-base text-slate-500 uppercase tracking-wider">Candidate Name</h1>
                            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 italic">
                                {certificateData.name}
                            </p>
                        </div>

                        <div className="text-center sm:text-right">
                            <h2 className="text-sm sm:text-base text-slate-500 uppercase tracking-wider">Test Title</h2>
                            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 italic">
                                {certificateData.title}
                            </p>
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


                <div
                    className={`p-5 text-center ${isPassed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                    <div className="flex justify-center gap-2">{resultIcon}</div>
                    <p className="text-lg font-medium">
                        {passFailMessage} {resultEmoji}
                    </p>
                </div>


                <div className="absolute -top-[10000px] -left-[10000px] w-[210mm] bg-white">
                    <Certificate
                        ref={certificateRef}
                        name={certificateData.name}
                        course={certificateData.title}
                    />
                    <IqTestReport
                        ref={iqTestReportRef}
                        studentName={certificateData.name}
                        studentScore={marksGained}
                        totalMarks={totalMarks}
                        course={certificateData.title}
                    />
                </div>

                <div className="flex justify-center py-6 px-4">
                    <div className="w-full max-w-md">
                        <AutoDownload
                            generateReportPdf={generateReportPdf}
                            generateCertificatePdf={generateCertificatePdf}
                        />
                    </div>
                </div>

                <div className="fixed bottom-12 left-8 md:left-6 z-10 animate-bounce">
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-5 px-7 md:px-6 rounded-full shadow-xl transition-all duration-300 text-sm md:text-base">
                        <AiFillHome className="text-xl md:text-2xl" />
                        Go To Home
                    </Link>
                </div>

                <div className="fixed bottom-12 right-8 md:right-6 z-10 animate-bounce">
                    <Link
                        to="/iqtest/popup"
                        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-5 px-7 md:px-6 rounded-full shadow-xl transition-all duration-300 text-sm md:text-base">
                        <FaBrain className="text-xl md:text-2xl" />
                        Go IQ Test
                    </Link>
                </div>
            </div>

        </>
    );
}

export default ShareTestResult;
