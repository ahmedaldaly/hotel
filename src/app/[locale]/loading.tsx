'use client'
import React from 'react'
import { motion } from 'framer-motion'

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        <motion.p
          className="text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          جاري التحميل...
        </motion.p>
      </div>
    </div>
  )
}

export default loading
