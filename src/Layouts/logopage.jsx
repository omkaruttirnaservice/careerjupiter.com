"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Logopage = () => {
  const [totalCount, setTotalCount] = useState(0)
  const [partyCount, setPartyCount] = useState(0)
  const [currentLogo, setCurrentLogo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

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
    setCurrentLogo((prev) => (prev >= logos.length - 4 ? 0 : prev + 4))
  }

  const prevLogo = () => {
    setCurrentLogo((prev) => (prev === 0 ? logos.length - 4 : prev - 4))
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="w-full bg-gray-100 py-10 px-5 md:h-[51vh] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
        
        <div className="text-center md:ml-24">
          <h2 className="text-5xl sm:text-6xl text-red-500 font-bold">{totalCount}+</h2>
          <p className="text-lg font-bold sm:text-xl">Total</p>
        </div>

        <div 
          className="w-full md:w-1/2 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-64 flex items-center justify-center space-x-4">
            {logos.slice(currentLogo, currentLogo + 4).map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center"
              >
                <img 
                  src={logo || "/placeholder.svg"} 
                  alt="Partner logo" 
                  className="cursor-pointer w-40 h-40 object-contain transition-transform duration-300 ease-in-out"
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(logos.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentLogo(index * 4)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentLogo === index * 4 ? "bg-red-500 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center md:mr-24">
          <h2 className="text-5xl sm:text-6xl text-red-500 font-bold">{partyCount}+</h2>
          <p className="font-bold text-lg sm:text-xl">Partner</p>
        </div>
      </div>
    </div>
  )
}

export default Logopage