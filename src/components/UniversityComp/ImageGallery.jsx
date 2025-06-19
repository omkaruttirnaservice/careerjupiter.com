"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { BASE_URL } from "../../utils/constansts"

const ImageGallery = ({ images, universityName }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleImageClick = (index) => {
    setActiveImage(index)
    setShowModal(true)
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!images || images.length === 0) {
    return (
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="text-center py-16">
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl border border-white/20 max-w-md mx-auto">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-500">Campus images will be available shortly.</p>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <>
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaImages className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Campus Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Explore our beautiful campus through these images</p>
        </div>

        {/* Main Gallery Grid */}
        <div className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5 rounded-3xl"></div>

          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
            {/* Featured Image */}
            <motion.div
              className="relative mb-8 group cursor-pointer"
              onClick={() => handleImageClick(0)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <LazyLoadImage
                  src={images[0].startsWith("http") ? images[0] : `${BASE_URL}${images[0]}`}
                  alt={`${universityName} Campus - Featured`}
                  effect="blur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold mb-2">{universityName}</h3>
                  <p className="text-lg">Campus Overview</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaExpand className="text-white" />
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.slice(1, 13).map((image, index) => (
                <motion.div
                  key={index + 1}
                  className="relative group cursor-pointer"
                  onClick={() => handleImageClick(index + 1)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <LazyLoadImage
                      src={image.startsWith("http") ? image : `${BASE_URL}${image}`}
                      alt={`${universityName} Campus ${index + 2}`}
                      effect="blur"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                        <FaExpand className="text-white text-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            {images.length > 13 && (
              <div className="text-center mt-8">
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All {images.length} Photos
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              isFullscreen ? "bg-black" : "bg-black/90"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-xl" />
            </motion.button>

            {/* Fullscreen Toggle */}
            <motion.button
              onClick={toggleFullscreen}
              className="absolute top-4 right-20 z-10 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExpand className="text-lg" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-4 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="text-xl" />
            </motion.button>

            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm p-4 rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="text-xl" />
            </motion.button>

            {/* Main Image */}
            <motion.div
              className={`relative ${isFullscreen ? "w-full h-full" : "max-w-6xl max-h-[80vh]"}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LazyLoadImage
                src={images[activeImage].startsWith("http") ? images[activeImage] : `${BASE_URL}${images[activeImage]}`}
                alt={`${universityName} Campus ${activeImage + 1}`}
                effect="blur"
                className={`w-full h-full object-contain rounded-2xl ${isFullscreen ? "rounded-none" : ""}`}
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                <span className="font-medium">
                  {activeImage + 1} / {images.length}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            {!isFullscreen && (
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/30 backdrop-blur-sm p-3 rounded-2xl max-w-md overflow-x-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeImage ? "border-white scale-110" : "border-transparent"
                    }`}
                    whileHover={{ scale: index === activeImage ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LazyLoadImage
                      src={image.startsWith("http") ? image : `${BASE_URL}${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery
