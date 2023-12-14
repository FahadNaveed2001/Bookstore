import React, { useState, useEffect } from 'react';

import "./hero.scss"
import { motion } from "framer-motion";




const Hero = () => {

    const [text, setText] = useState('');
    const [isFahadNaveed, setIsFahadNaveed] = useState(true);

    const texts = isFahadNaveed ? ['Fahad Bin Naveed'] : ['Book Store By'];
    const speed = 200;

    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < texts[0].length) {
                currentText += texts[0][currentIndex];
                setText(currentText);
                currentIndex++;
            } else {
                setIsFahadNaveed(!isFahadNaveed);
                clearInterval(interval);
            }
        }, speed);

        return () => {
            clearInterval(interval);
        };
    }, [isFahadNaveed]);

    const sliderVariants = {
        initial: {
            x: 0,
        },
        animate: {
            x: "-220%",
            transition: {
                repeat: Infinity,
                repeatType:"mirror",
                duration: 20,
            },
        },
    };


    return (
        <div className="hero">
            <div className="container">
                <div className="textcontainer">
                    <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .6 }}>{text}</motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}>Scroll Down To View Books</motion.h1>

                     <motion.h3
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4 }}>Step into a world where imagination knows no bounds at Whimsical Pages Bookstore. Nestled in the heart of a charming, cobblestone-lined street, our bookstore is a literary haven that beckons book lovers of all ages. As you cross the threshold, you'll be enchanted by the unmistakable aroma of well-worn pages and the promise of new adventures waiting to be discovered.</motion.h3>
                </div>
                <motion.div className="buttons"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.8 }}>
                    <button className="btn2">Contact Us</button>
                </motion.div>
            </div>
            <motion.div 
            className="slidingTextContainer"
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            >
                You Can View And Add Your Own Books
            </motion.div>
            <motion.div
                className="imagecontainer"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}>
                <img src="/booksimage.png" className="img" />
            </motion.div>
        </div>
    )
}

export default Hero
