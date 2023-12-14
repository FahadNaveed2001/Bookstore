import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import './booklist.scss';
import CardModal from './CardModal';


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

const Booklist = () => {
  const [width, setWidth] = useState(0);
  const carousel1 = useRef();
  const [modalState, setModalState] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (carousel1.current) {
      setWidth(carousel1.current.scrollWidth - carousel1.current.offsetWidth);
    }
  }, []);

  const openModal = (cardIndex) => {
    setModalState({ [cardIndex]: true });
  };

  const closeModal = (cardIndex) => {
    setModalState({ [cardIndex]: false });
  };

 
  const cards = [
    {
      title: 'To Kill a Mockingbird',
      authorName: 'Harper Lee',
      publishDate: '1960',
      description: 'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools.',
    },
    {
      title: 'Pride and Prejudice',
      authorName: 'author Jane Austen',
      publishDate: '1813',
      description: 'The novel follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
    },
    {
      title: 'The Lord of the Rings',
      authorName: 'J. R. R. Tolkien.',
      publishDate: '1937',
      description: 'The Lord of the Rings is an epic high-fantasy novel by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien s 1937 childrens book The Hobbit, but eventually developed into a much larger work.',
    },
    {
      title: 'War and Peace',
      authorName: 'Leo Tolstoy',
      publishDate: '1869',
      description: 'War and Peace is a literary work by Russian author Leo Tolstoy. Set during the Napoleonic Wars, the work mixes fictional narrative with chapters discussing history and philosophy. First published serially beginning in 1865, the work was rewritten and published in its entirety in 1869.',
    },
    {
      title: 'Lolita',
      authorName: 'Vladimir Nabokov',
      publishDate: '1955',
      description: 'Lolita is a 1955 novel written by Russian-American novelist Vladimir Nabokov which addresses hebephilia. The protagonist is an unreliable narrator, a French literature professor who moves to New England and writes under the pseudonym Humbert Humbert.',
    },
    {
      title: 'One Hundred Years of Solitude',
      authorName: 'Gabriel García Márquez',
      publishDate: '1967',
      description: 'Story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the fictitious town of Macondo. The novel is often cited as one of the supreme achievements in world literature.',
    },
    {
      title: 'Beloved',
      authorName: 'Toni Morrison',
      publishDate: '1987',
      description: 'Set in the period after the American Civil War, the novel tells the story of a dysfunctional family of formerly enslaved people whose Cincinnati home is haunted by a malevolent spirit.',
    },
    {
      title: 'Invisible Man',
      authorName: 'Ralph Ellison',
      publishDate: '1952',
      description: 'The novel addresses many of the social and intellectual issues facing African-Americans in the early.',
    },
    {
      title: 'The Color Purple',
      authorName: 'Alice Walker',
      publishDate: '1982',
      description: 'Steven Spielberg created a stellar adaptation of Alice Walkers novel, and one that is extremely faithful to the novel.',
    },
    {
      title: 'The Kite Runner',
      authorName: 'Khaled Hosseini',
      publishDate: '2003',
      description: 'it tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul.',
    },
    {
      title: 'The Alchemist',
      authorName: 'Paulo Coelho',
      publishDate: '1988',
      description: 'Written in only two weeks, The Alchemist has sold more than two million copies worldwide — and the magical story of Santiagos journey to the pyramids of Egypt.',
    },
    {
      title: 'Life of Pi',
      authorName: 'Yann Martel',
      publishDate: '2001',
      description: 'The protagonist is Piscine Molitor "Pi" Patel, an Indian boy from Pondicherry, India, who explores issues of spirituality and metaphysics from an early age.',
    },
    {
      title: 'Book Title ',
      authorName: 'Author Name ',
      publishDate: '-------',
      description: '        ',
    },


  ];

  const totalPageCount = Math.ceil(cards.length / itemsPerPage);
  const paginatedCards = cards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <motion.div className='bg'>
      <motion.div className="main" variants={variants} initial="initial" whileInView="animate">
        <motion.h1 variants={variants} initial="initial" whileInView="animate">Here Are Some Books</motion.h1>
        <motion.div ref={carousel1} className="crsl" >
          <motion.div drag="x" dragConstraints={{ right: 0, left: -3000 }} className="inner-crsl">
            <motion.div className="item" >
              {paginatedCards.map((card, index) => (
                <div className="card" key={currentPage * itemsPerPage + index}>
                  <h2 className="title">{card.title}</h2>
                  <p className="author-name">Author: {card.authorName}</p>
                  <p className="publish-date">Publish Date: {card.publishDate}</p>
                  <p className="description">{card.description}</p>
                  <button className="card-button" onClick={() => openModal(currentPage * itemsPerPage + index)}>Details</button>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
          <div className="movingbox">
        <motion.div 
        className='box1'
        animate={{
          x: isAnimating ? 800 : 0,
          oppacity: isAnimating ? 0 : 0.5,
          rotate: isAnimating ? 720 : 0,

        }}
        initial={{
          oppacity: 0.1,
        }}

        transition={{
          
          type: "spring",
          stiffness: 60
        }}
        onClick={() => setIsAnimating(!isAnimating)}
        >Tap Me!</motion.div>
        </div>
       

        {paginatedCards.map((card, index) => (
          <CardModal
            key={currentPage * itemsPerPage + index}
            isOpen={modalState[currentPage * itemsPerPage + index]}
            onClose={() => closeModal(currentPage * itemsPerPage + index)}
            title={card.title}
            authorName={card.authorName}
            publishDate={card.publishDate}
            description={card.description}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Booklist;
