import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        card ${glow ? 'card-glow' : ''} ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export default Card
