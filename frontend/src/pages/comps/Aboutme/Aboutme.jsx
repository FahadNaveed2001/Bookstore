import React from 'react'
import "./aboutme.scss"
import { motion, AnimatePresence } from 'framer-motion';


const variants = {
  initial: {
    x: -100,
    oppacity: 0,
  },
  animate: {
    x: 0,
    oppacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    }


  }
}

const Aboutme = () => {
  return (
    <motion.div className='arthurs' variants={variants} initial="initial" whileInView="animate">
      <h1>Some Famous Arthurs</h1>
      <motion.div className="image-grid" 
      
      variants={variants} initial="initial" whileInView="animate">
        <motion.div className="grid-item">
            <img src="/arthur1.png" className="Image-1"/>
            <div className="overlay">Arthur Name.</div>
        </motion.div>
        <motion.iv className="grid-item" variants={variants} initial="initial" whileInView="animate">
            <img src="/arthur2.jpg" className="Image-2"/>
            <div className="overlay">Arthur Name.</div>
        </motion.iv>
        <motion.div className="grid-item" variants={variants} initial="initial" whileInView="animate">
            <img src="/arthur3.jpg" className="Image-3"/>
            <div className="overlay">Arthur Name.</div>
        </motion.div>
       </motion.div>
    </motion.div>
  )
}

export default Aboutme
