import React from 'react';
import './App.css';
import Header from './components/Header';
import BooksGrid from './components/BooksGrid';
import BookPage from './components/BookPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  return (
		<div className="App max-w-7xl my-0 mx-auto">
			<Header />
      <Routes>
        <Route path='/' element={<BooksGrid />} />
        <Route path='/book/:id' element={<BookPage />} />
      </Routes>
		</div>
  );
}

export default App;