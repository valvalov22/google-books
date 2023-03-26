import { observer } from 'mobx-react-lite';
import React from 'react'
import { store } from '../store/Store';
import { Book } from '../types/items';
import unkbook from '../assets/book.jpg';

const BookCard = observer((book: Book) => {
  return (
    <div
        // className="bg-sky-400 p-1 flex flex-col w-3/5 h-4/5 m-10"
        className="bg-sky-400 p-1 flex flex-col w-4/5 h-4/5 mb-40 text-base"
        onClick={() => {
            store.setId(book.id);
        }}
    >
        {book.volumeInfo.imageLinks ? (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="Изображение" className="w-64 h-64" />
        ) : (
            <img src={unkbook} alt="Изображение" className="w-64 h-64" />
        )}
        <div className="text-slate-500 underline">{book.volumeInfo.categories}</div>
        <div className="text-black font-bold">{book.volumeInfo.title}</div>
        <div className="text-slate-500">
            {book.volumeInfo.authors
                ? book.volumeInfo.authors[0]
                : book.volumeInfo.authors}
        </div>
    </div>
  )
});

export default BookCard