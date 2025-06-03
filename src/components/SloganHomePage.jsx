import Typewriter from 'typewriter-effect';

const SloganHomePage = ()=>{
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center bg-blue-200 p-6 md:mt-1   mt-[60px]">
          <div className="text-center md:mt-10">
            <div className="flex flex-row justify-center gap-3 text-lg md:text-4xl font-bold">
              <h1 className="text-gray-900 font-extrabold">FIND YOUR</h1>
              <span className="font-extrabold text-transparent bg-clip-text animated-gradient">
                <Typewriter
                  options={{
                    strings: ["Best College", "Best School", "Best Class","Best Career Map"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>
            <p className="mt-3  max-w-2xl mx-auto text-lg md:text-xl font-bold text-blue-600">
              "EMPOWER YOUR FUTURE, UNLOCK YOUR POTENTIAL, AND BUILD THE CAREER
              OF YOUR DREAMS! ✨"
            </p>
          </div>
        </div>
      </>
    );
}

export default SloganHomePage;