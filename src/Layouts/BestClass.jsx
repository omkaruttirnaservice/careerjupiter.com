import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaChalkboardTeacher } from 'react-icons/fa'

const BestClass = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const fullText = 'SEARCH BEST CLASS'
  const typingSpeed = 100
  const erasingSpeed = 50
  const delayBeforeErase = 1500

  useEffect(() => {
    let index = 0
    let isDeleting = false

    const typeWriter = () => {
      if (!isDeleting && index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
        if (index > fullText.length) {
          setTimeout(() => (isDeleting = true), delayBeforeErase)
        }
      } else if (isDeleting && index >= 0) {
        setText(fullText.slice(0, index))
        index--
        if (index === 0) {
          isDeleting = false
        }
      }
    }

    const interval = setInterval(typeWriter, isDeleting ? erasingSpeed : typingSpeed)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    navigate('/class')
  }

  return (
    <div id='search-class' className="w-full rounded-lg h-[80vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-400 via-teal-500 to-green-400 p-12">
      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left p-8">
        <h1 className="text-2xl font-bold mr-4 md:text-5xl   flex items-center gap-3">
          <FaChalkboardTeacher /> {text}
         
        </h1>
        <p className="text-lg mb-8 leading-relaxed md:mt-5 ">
          Explore top classes tailored to elevate your skills and knowledge. The right class leads to a brighter future.
        </p>
        <button 
          onClick={handleSearch} 
          className="cursor-pointer  flex items-center w-full justify-center gap-3 bg-pink-400 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-500 transition-transform duration-300 hover:scale-110"
        
        >
          <FaSearch />
          Search Class
        </button>
      </div>

      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="https://t3.ftcdn.net/jpg/03/35/00/02/360_F_335000208_XJyUUnkg2TPfrMfiHPWW9LtCvea3x46K.jpg" 
          alt="Class Illustration" 
          className=" cursor-pointer rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  )
}

export default BestClass
