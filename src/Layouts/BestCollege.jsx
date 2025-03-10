import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaUniversity } from 'react-icons/fa'

const BestCollege = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const fullText = 'SEARCH BEST COLLEGE'
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
    navigate('/college')
  }

  return (
    <div className="w-full h-[80vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-12">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D" 
          alt="College Illustration" 
          className=" cursor-pointer rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left p-8">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <FaUniversity /> {text}
          <span className="animate-blink">|</span>
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          Discover top colleges that match your dreams and goals. Your future starts with the right choice.
        </p>
        <button 
          onClick={handleSearch} 
          className="cursor-pointer flex items-center w-full justify-center gap-3 bg-green-400 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gren-500 transition-transform duration-300 hover:scale-110"
        >
          <FaSearch />
          Search College
        </button>
      </div>
    </div>
  )
}

export default BestCollege
