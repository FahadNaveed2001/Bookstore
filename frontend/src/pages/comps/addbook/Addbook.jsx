import React, { useState } from 'react';
import Modal from 'react-modal';
import './addbook.scss';
import { motion, AnimatePresence } from 'framer-motion';




const BookCard = ({ book, openModal, onDelete, onEdit }) => {
  return (
    <div className='card1'>
    <motion.div
      className="book-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publish Date:</strong> {book.publishDate}</p>
  
      <button onClick={() => openModal(book)} className='btn6'>Open</button>
      <button onClick={() => onDelete(book)} className='btn6'>Delete</button>
     
      
    </motion.div>
    </div>
  );
};

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    publishDate: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const addBook = () => {
    if (newBook.title && newBook.author && newBook.description && newBook.publishDate) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '', description: '', publishDate: '' });
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalOpen(false);
    setEditing(false);
  };

  const onDelete = (bookToDelete) => {
    const updatedBooks = books.filter((book) => book !== bookToDelete);
    setBooks(updatedBooks);
  };

  const onEdit = (bookToEdit) => {
    setSelectedBook(bookToEdit);
    setEditing(true);
    setModalOpen(true);
  };

  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book === selectedBook ? updatedBook : book
    );
    setBooks(updatedBooks);
    setModalOpen(false);
    setEditing(false);
    setSelectedBook(null);
  };


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

  return (
    <motion.div className='main2' variants={variants} initial="initial" whileInView="animate">
      <motion.h1 className="app-title" variants={variants} initial="initial" whileInView="animate">Create Your Own Book Here</motion.h1>

      <motion.div className="form-container" variants={variants} initial="initial" whileInView="animate">
        <motion.div className="input-row" variants={variants} initial="initial" whileInView="animate">
          <input
            type="text"
            name="title"
            value={newBook.title}
            placeholder="Title"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="author"
            value={newBook.author}
            placeholder="Author"
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="number"
            name="publishDate"
            value={newBook.publishDate}
            placeholder="Publish Year"
            onChange={handleInputChange}
            className="input-field"
          />
        </motion.div>
        <textarea
          name="description"
          value={newBook.description}
          placeholder="Description"
          onChange={handleInputChange}
          className="input-field2"
        />
        <button onClick={addBook}>Add Book</button>
      </motion.div>
       
      <div className="book-list">
        <AnimatePresence>
          {books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              openModal={openModal}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="modal-content"
            >
              {selectedBook && (
                <div>
                  <h2>{selectedBook.title}</h2>
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Publish Date:</strong> {selectedBook.publishDate}</p>
                  <button onClick={closeModal}>Close</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
