import React, { useState } from 'react';
import {  VolumeInfo } from '../types/items';
import close from '../assets/close.svg';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import unkbook from '../assets/book.jpg';
import { store } from '../store/Store';
import Loader from './Loader';

const BookPage = () => {

	const [book, setBook] = useState<VolumeInfo>(); 
	const { id } = useParams();

	const navigate = useNavigate();

	React.useEffect(() => {
		try {
			axios
			.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`)
			.then(res => {
				setBook(res.data.volumeInfo);
			})
		} catch(e) {
			alert('Ошибка при получении книги');
			navigate('/');
		}
	}, [])

  	return (
		<div>
			{book && !store.loader ? 
				<div className="flex py-10 md:flex-col md:items-center">
					<div className="p-4 w-1/3 flex justify-center items-center bg-sky-200 md:flex-wrap md:mb-5">
						{book.imageLinks ? <img src={book.imageLinks.thumbnail} alt="book" className="w-3/5 h-3/5" /> : <img src={unkbook} alt="book" className="w-3/5 h-3/5" />}
					</div>
					<div className="flex justify-center flex-col w-2/3 px-3 md:flex-wrap">
						<div className="mb-5 text-slate-500">{book.categories}</div>
						<h2 className="mb-5 font-bold text-lg">{book.title}</h2>
						<div className="text-slate-500 mb-5 underline">{book.authors ? book.authors.join(', ') : null}</div>
						{book.description ? <div className="border rounded-md p-4 justify-center">{book.description}</div> : null}
						<button className="flex justify-center mt-5" onClick={() => navigate('/')}>
							<img src={close} alt="close" className="h-8 w-8" />
						</button>
					</div>
				</div>
				: 
				<Loader />
			}
		</div>
  	)
}

export default BookPage