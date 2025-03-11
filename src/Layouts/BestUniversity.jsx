import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaCrown } from 'react-icons/fa'

const BestUniversity = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const fullText = 'SEARCH BEST UNIVERSITY'
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
    navigate('/university')
  }

  return (
    <div id='search-university' className="  w-full h-[70vh] flex flex-col items-center justify-center bg-cover bg-center relative p-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHVuaXZlcnNpdHl8ZW58MHx8fHwxNjc4MDMwMjUw&ixlib=rb-1.2.1&q=80&w=1080')" }}>
      <div className="rounded-lg absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="z-10 text-center text-white max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-6 flex items-center justify-center gap-3">
          <FaCrown className="text-yellow-400 animate-pulse"  /> {text}
        </h1>
        <p className="text-base mb-8 leading-relaxed">
          Unleash your potential by exploring top universities designed to match your aspirations and build a successful future.
        </p>
        <button
          onClick={handleSearch}
          className="cursor-pointer w-full flex items-center justify-center gap-3 bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          <FaSearch /> Search Universities
        </button>
      </div>
    </div>
  )
}

export default BestUniversity
