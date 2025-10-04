import React from 'react'
import { motion } from 'framer-motion'

interface OrbitalAnimationProps {
  className?: string
  size?: number
  planetCount?: number
}

const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({
  className = '',
  size = 300,
  planetCount = 3
}) => {
  const planets = Array.from({ length: planetCount }, (_, i) => ({
    id: i,
    radius: 60 + i * 40,
    duration: 8 + i * 4,
    color: i === 0 ? '#00d4ff' : i === 1 ? '#ff0080' : '#ffd700',
    size: 8 + i * 2
  }))

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Central star */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-space-yellow to-space-cyan rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)]"
      />
      
      {/* Orbital rings */}
      {planets.map((planet) => (
        <div
          key={planet.id}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: planet.radius * 2,
            height: planet.radius * 2,
            border: `1px solid ${planet.color}20`,
            borderRadius: '50%'
          }}
        />
      ))}
      
      {/* Orbiting planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: planet.size,
            height: planet.size,
            backgroundColor: planet.color,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${planet.color}80`
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              transform: `translateX(${planet.radius}px)`,
              backgroundColor: planet.color,
              boxShadow: `0 0 15px ${planet.color}`
            }}
          />
        </motion.div>
      ))}
      
      {/* Particle effects */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-space-cyan rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

export default OrbitalAnimation
