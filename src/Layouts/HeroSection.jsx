import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LuNotebookPen } from 'react-icons/lu';
import CheckEligibility from './CheckEligibility';
import BestCollege from './BestCollege';
import BestClass from './BestClass';
import BestUniversity from './BestUniversity';
import Carouseldiv from './CarouselDiv';
import Typewriter from 'typewriter-effect';
import Logopage from './logopage';
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const HeroSection = () => {
	// Auto-scroll to top on page load or route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="relative bg-green-200 overflow-hidden">
				<div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 mt-30">
					{/* Main Floating Button */}
					<div className="flex items-center justify-center w-[80px] h-[45px] bg-white rounded-full rounded-bl-[50%] shadow-lg animate-bounce">
						<NavLink
							to="profile/test"
							className="text-white hover:text-green-800 flex flex-row gap-2"
						>
							<div className="flex items-center justify-center">
								<h1 className="font-bold text-2xl text-green-500">
									<LuNotebookPen />
								</h1>
							</div>
							<div className="flex items-center justify-center w-[35px] h-[35px] bg-green-500 rounded-br-[50%] rounded-tl-[50%] rounded-tr-[50%] mr-1">
								<h1 className="font-bold text-2xl">Q</h1>
							</div>
						</NavLink>
					</div>

					{/* Social Media Icons */}
					<div className="flex flex-col items-center gap-2 mt-4">
						{/* Whats app Icon */}
						<a
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center animate-bounce justify-center w-[40px] h-[40px] bg-green-500 rounded-full text-white hover:bg-green-600 transition"
						>
							<FaWhatsapp size={22} />
						</a>

						{/* Instagram Icon */}
						<a
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center animate-bounce justify-center w-[40px] h-[40px] bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
						>
							<FaInstagram size={22} />
						</a>

						{/* YouTube Icon */}
						<a
							href="https://www.youtube.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center animate-bounce justify-center w-[40px] h-[40px] bg-red-500 rounded-full text-white hover:bg-red-600 transition"
						>
							<FaYoutube size={22} />
						</a>
					</div>
				</div>
			</div>
			<br />

			<Carouseldiv />
			<br />
			<Logopage />
			<br />
			<CheckEligibility />
			<br />
			<BestCollege />
			<br />
			<BestClass />
			<br />
			<BestUniversity />
		</>
	);
};

export default HeroSection;
