import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CheckEligibility = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState('');

	const handleCheckEligibility = () => {
		if (!inputValue.trim()) {
			setError('Please Enter Percentage ');
			return;
		}
	
		setError(''); // Clear error if input is valid
		document.getElementById('container').classList.add('fade-out');
	
		// SPGE madhun percentage calculate karne (Assume SPGE / 10 formula)
		let percentage = parseFloat(inputValue); 
		if (percentage > 10) {
			percentage = percentage; // Already percentage
		} else {
			percentage = percentage * 10; // Convert SPGE to Percentage
		}
	
		setTimeout(() => {
			navigate('/my-eligibility', { state: { percentage } });
		}, 600);
	};
	

	return (
		<div id='check-eligibility-section' className="relative h-80 flex justify-center items-center">
			{/* Background Image with Blur & Opacity */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://media.istockphoto.com/id/963192098/photo/exam-with-school-student-having-a-educational-test-thinking-hard-writing-answer-in-classroom.jpg?s=612x612&w=0&k=20&c=sxRP5p66TLsonilgf4rlF8n7IxmraPVFpS5f5h-KEu0=')",
					filter: 'blur(5px)', // Blur effect
					opacity: 0.7, // Transparency
					zIndex: -1, // Keep it behind content
				}}
			></div>

			{/* Main Content */}
			<motion.div
				className="relative flex flex-col items-center justify-center bg-white/80 p-8 gap-6 rounded-lg shadow-2xl backdrop-blur-md"
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.h1
					className="font-extrabold text-black mb-4 text-center text-3xl md:text-5xl drop-shadow-2xl tracking-wide"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					STUDENT ELIGIBILITY CHECK
				</motion.h1>

				{/* Input Box (Can enter Percentage OR SPGE) */}
				<motion.input
					type="text"
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						if (e.target.value.trim()) {
							setError(''); // Clear error when user starts typing
						}
					}}
					placeholder="Enter your Percentage"
					className="w-full max-w-md p-3 text-lg rounded-lg border-2 border-gray-300 bg-white text-indigo-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500 shadow-lg"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				/>

				{/* Error Message */}
				{error && (
					<p className="text-red-600 font-semibold text-lg mt-2">{error}</p>
				)}

				{/* Check Eligibility Button */}
				<motion.button
					id='container'
					onClick={handleCheckEligibility}
					className="cursor-pointer px-8 py-3 text-white bg-pink-500 rounded-full font-bold text-lg shadow-2xl flex justify-center items-center gap-2 hover:bg-purple-700 transition-all tracking-wider"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					Check Eligibility
					<motion.span
						className="text-2xl ml-2 "
						animate={{ x: [0, 10, 0] }}
						transition={{ repeat: Infinity, duration: 1 }}
					>
						➡️
					</motion.span>
				</motion.button>
			</motion.div>
		</div>
	);
};

export default CheckEligibility;
