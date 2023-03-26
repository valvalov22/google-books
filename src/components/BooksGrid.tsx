import React from 'react'
import { store } from '../store/Store';
import BookCard from './BookCard';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import NotFound from './NotFound';

const BooksGrid = observer(() => {
    const books = store.books;
    return (
        <div className="p-3">
        <div className="text-center mb-4">Found {store.amount} result</div>
        {store.loader && store.value !== '' ? (
            <Loader />
        ) : books ? (
            <div className="grid grid-cols-4 gap-3 md:grid-cols-2 sm:grid-cols-1 ml-24 sm:ml-16">
                {books.map((book) => (
                    <Link to={`book/${book.id}`} >
                        <BookCard key={book.id} {...book} />
                    </Link>
                ))}
            </div>
        ) : <NotFound />}
        <div className="w-full flex justify-center py-4">
            {books && books.length !== store.amount && store.value !== '' && (
                <button
                    className="rounded-md ring-2 ring-blue-500 bg-stone-400 p-2 text-white "
                    onClick={store.findMoreBooks}
                >
                    Load more
                </button>
            )}
        </div>
    </div>
    )
});

export default BooksGrid