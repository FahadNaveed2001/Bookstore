import React from 'react'
import "./contact.scss"
import { animate, motion } from "framer-motion"



const variants={
    initial:{
        x: -100,
        oppacity: 0,
    },
    animate:{
        x: 0,
        oppacity: 1,
        transition:{
            duration: 0.7,
            staggerChildren: 0.1,
        }


    }
}




const Contact = () => {
  return (
    <motion.div className='contact' variants={variants} initial="initial" whileInView="animate">
      <motion.div className="textcontainer1" variants={variants}>
        <motion.h1 variants={variants}>Lets work together</motion.h1>
        <motion.div className="item" variants={variants}>
            <h2>Mail</h2>
            <span>Fahad@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
            <h2>Address</h2>
            <span>Hello Street</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
            <h2>Phone</h2>
            <span>123456789</span>
        </motion.div>
      </motion.div>
      <div className="formcontainer1">
        <form>
            <input type="text" required placeholder='Name'/>
            <input type="email" required placeholder='Email'/>
            <textarea rows={8} placeholder='Message' />
            <button className='btn'>Submit</button>
            </form>
      </div>
    </motion.div>
  )
}

export default Contact
