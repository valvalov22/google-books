import React from 'react';
import Select from '../Select';
import finder from '../../assets/find.svg';
import { observer } from 'mobx-react-lite';
import { store } from '../../store/Store';
import { useNavigate } from 'react-router';
import { categories, sorts } from '../../utils/data';

const Header: React.FC = observer(() => {
    const navigate = useNavigate();
    return (
        <header className="p-10 bg-sky-400 md:p-0">
            <h1 className="text-center text-4xl font-bold text-slate-50 py-4">
                Search for books
            </h1>
            <div className="flex items-center justify-center gap-2 ">
                <input
                    autoFocus
                    className="border-2 p-2 rounded-md w-2/3"
                    type="text"
                    onChange={(e) => {
                        e.preventDefault();
                        store.changeInputValue(e.target.value);
                        store.setId("");
                    }}
                    onKeyDown={(e) => {
                        e.key === "Enter" && store.findBooks();
                    }}
                    onKeyUp={(e) => {
                        e.key === "Enter" && navigate('/')
                    }}
                    tabIndex={0}
                />
                <button className="font-bold" onClick={store.findBooks}>
                    <img src={finder} alt="finder" onClick={() => navigate('/')} className="h-6" />
                </button>
            </div>
            <div>
                <div className="p-3 flex justify-center w-auto gap-4 flex-row md:w-full md:flex-col">
                    <Select options={categories} name="Categories" />
                    <Select options={sorts} name="Sorting by" />
                </div>
            </div>
        </header>
    )
});

export default Header