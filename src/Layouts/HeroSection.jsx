import { NavLink } from 'react-router-dom';
import { LuNotebookPen } from 'react-icons/lu';
import CheckEligibility from './CheckEligibility';
import BestCollege from './BestCollege';
import BestClass from './BestClass';
import BestUniversity from './BestUniversity';
import Carouseldiv from './CarouselDiv';
import Typewriter from 'typewriter-effect';
import Logopage from './logopage';
const HeroSection = () => {
	return (
		<>
			<div className="relative bg-green-200 overflow-hidden">
			<div className="fixed flex items-center justify-center top-1/2 right-4 transform -translate-y-1/2 w-[80px] h-[45px] bg-white rounded-full rounded-bl-[50%] z-50 shadow-lg animate-bounce">
            <NavLink
              to="profile/test"
              className="  text-white hover:text-green-800 flex flex-row gap-2"
            >
              <div className="flex items-center justify-center">
                <h1 className="font-bold text-2xl text-green-500">
                  <LuNotebookPen />
                </h1>
              </div>
              <div className=" flex items-center justify-center w-[35px] h-[35px]  bg-green-500 rounded-br-[50%] rounded-tl-[50%] rounded-tr-[50%] mr-1">
                <h1 className="font-bold text-2xl">Q</h1>
              </div>
            </NavLink>
          </div>

				<div className="pt-2 pb-2 sm:pt-4 sm:pb-4 md:pt-6 md:pb-6">
					<main className="mx-auto max-w-7xl px-4">
						<div className="text-center">
							<div className="flex flex-row justify-center gap-2 sm:gap-4 md:gap-5 text-lg sm:text-3xl md:text-4xl font-bold">
								<h1 className="text-gray-900 font-extrabold text-base sm:text-xl md:text-3xl">
									FIND YOUR
								</h1>
								<span className="font-extrabold text-transparent bg-clip-text animated-gradient text-base sm:text-xl md:text-3xl">
									<Typewriter
										options={{
											strings: ['Best College', 'Best School', 'Best Class'],
											autoStart: true,
											loop: true,
										}}
									/>
								</span>
							</div>
							<p className="mt-1 sm:mt-2 max-w-xs sm:max-w-md md:max-w-3xl mx-auto text-sm sm:text-lg md:text-xl font-bold text-blue-600">
								"EMPOWER YOUR FUTURE, UNLOCK YOUR POTENTIAL, AND BUILD THE
								CAREER OF YOUR DREAMS! ✨"
							</p>
						</div>
					</main>
				</div>
			</div>
			<br/>

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
