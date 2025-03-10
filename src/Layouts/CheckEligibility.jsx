import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CheckEligibility = () => {
	const navigate = useNavigate();
	const [percentage, setPercentage] = useState('');

	const handleCheckEligibility = () => {
		if (!percentage || percentage <= 0 || percentage > 100) {
			toast.error('Please enter a valid percentage before proceeding.');
			return;
		}
		document.getElementById('container').classList.add('fade-out');
		setTimeout(() => {
			navigate('/my-eligibility', { state: { percentage } }); // Pass percentage to next page
		}, 600);
	};

	return (
		<motion.div
			id="container"
			className="relative flex flex-col items-center justify-center min-h-[40vh] bg-cover bg-center transition-all duration-500 p-8 gap-6 rounded-lg shadow-2xl"
			style={{
				backgroundImage:
					"url('https://media.istockphoto.com/id/963192098/photo/exam-with-school-student-having-a-educational-test-thinking-hard-writing-answer-in-classroom.jpg?s=612x612&w=0&k=20&c=sxRP5p66TLsonilgf4rlF8n7IxmraPVFpS5f5h-KEu0=')",
			}}
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.h1
				className="text-5xl font-extrabold text-black mb-4 text-center drop-shadow-2xl tracking-wide"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				STUDENT ELIGIBILITY CHECK
			</motion.h1>

			<motion.input
				type="number"
				value={percentage}
				onChange={(e) => setPercentage(e.target.value)}
				placeholder="Enter your percentage"
				className="w-full max-w-md p-3 mb-4 text-lg rounded-lg border-2 border-white bg-white text-indigo-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-lg"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			/>

			<motion.button
				onClick={handleCheckEligibility}
				className="cursor-pointer px-8 py-3 text-white bg-pink-500 rounded-full font-bold text-lg shadow-2xl flex justify-center items-center gap-2 hover:bg-purple-700 transition-all tracking-wider"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				Check Eligibility
				<motion.span
					className="text-2xl ml-2"
					animate={{ x: [0, 10, 0] }}
					transition={{ repeat: Infinity, duration: 1 }}
				>
					➡️
				</motion.span>
			</motion.button>
		</motion.div>
	);
};

export default CheckEligibility;

const style = document.createElement('style');
style.innerHTML = `
    .fade-out {
      animation: fadeOut 0.6s ease forwards;
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.9); }
    }
  `;
document.head.appendChild(style);
