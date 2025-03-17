"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Logopage = () => {
  const [totalCount, setTotalCount] = useState(0)
  const [partyCount, setPartyCount] = useState(0)
  const [currentLogo, setCurrentLogo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let total = 0
    let party = 0
    const interval = setInterval(() => {
      total += 20
      party += 2
      if (total >= 800) total = 800
      if (party >= 50) party = 50
      setTotalCount(total)
      setPartyCount(party)
      if (total === 800 && party === 50) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", updateView)
    updateView()
    return () => window.removeEventListener("resize", updateView)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const carouselInterval = setInterval(() => {
      nextLogo()
    }, 2000)
    return () => clearInterval(carouselInterval)
  }, [currentLogo, isPaused])

  const logos = [
    "https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-scool-college-logo-victor-vector-png-image_6634445.png",
    "https://png.pngtree.com/png-clipart/20230403/original/pngtree-education-and-college-logo-design-template-png-image_9022986.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG8v_u0RRy8dnk4rd9S-Zaoi-X91NzY-3eFm53oAa-OtzIQ02NcGtwffcCmHyEM-4hZnE&usqp=CAU",
    "https://png.pngtree.com/png-clipart/20230107/original/pngtree-school-and-education-logo-png-image_8882085.png",
    "https://static.vecteezy.com/system/resources/thumbnails/023/654/784/small_2x/golden-logo-template-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/005/170/934/small/shield-college-university-logo-free-vector.jpg",
    "https://img.freepik.com/premium-vector/university-college-school-crests-logo-emblem-vector-template_441059-1012.jpg",
    "https://img.freepik.com/premium-vector/university-college-school-badge-logo-design-vector-image_502259-677.jpg"
  ]

  const nextLogo = () => {
    setCurrentLogo((prev) => (prev >= logos.length - (isMobile ? 2 : 4) ? 0 : prev + (isMobile ? 2 : 4)))
  }

  const prevLogo = () => {
    setCurrentLogo((prev) => (prev === 0 ? logos.length - (isMobile ? 2 : 4) : prev - (isMobile ? 2 : 4)))
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="w-full bg-gray-100 py-10 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        
        {/* Counters & Logo Carousel */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between">

          {/* Total Registrations (Left Side) */}
          <div className="text-center mb-6 md:mb-0  md:ml-17">
            <h2 className="text-6xl sm:text-5xl text-red-500 font-bold">{totalCount}+</h2>
            <p className="text-lg font-bold">Total Registrations</p>
          </div>

          {/* Logo Carousel */}
          <div 
            className="w-full md:w-1/2 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center space-x-4 overflow-hidden">
              {logos.slice(currentLogo, currentLogo + (isMobile ? 2 : 4)).map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-40 h-40 bg-white rounded-lg shadow-lg flex items-center justify-center"
                >
                  <img 
                    src={logo || "/placeholder.svg"} 
                    alt="Partner logo" 
                    className="w-36 h-36 object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partner Count (Right Side) */}
          <div className="text-center mt-6 md:mt-0 md:mr-17 ">
            <h2 className="text-6xl sm:text-5xl text-red-500 font-bold">{partyCount}+</h2>
            <p className="text-lg font-bold">Partners</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Logopage
