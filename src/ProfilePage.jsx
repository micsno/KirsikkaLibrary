import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { translations } from './Translations.jsx'
import './ProfilePage.css'
import { GenreImages } from './BookPage.jsx';

export const ProfilePage = ({
    token,
    name,
    myLoans, setMyLoans,
    profile, setProfile,
    books,
    selectedLanguage,
    firstLetterOfName,
    handleBookSelect,
    translateCategory,
}) => {
    const [returnBookButton, setReturnBookButton] = useState(false)
    const [extendLoan, setExtendLoan] = useState(false)
    const [isbn, setIsbn] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [personalRecomendations, setPersonalRecomendations] = useState('true')

    const currentTranslations = translations[selectedLanguage];

    useEffect(() => {
        if (profile) {
            const fetchData = async () => {
                try {
                    const loans = await getMyLoans(token);
                    setMyLoans(loans);
                } catch (error) {
                    console.error('Error fetching loans:', error);
                }
            };
            fetchData();
            setReturnBookButton(false)
        }

    }, [profile, extendLoan, returnBookButton]);

    useEffect(() => {
        if (returnBookButton) {
            returnBook(isbn, token)
            setIsbn('')
        }
    }, [returnBookButton])

    useEffect(() => {
        if (extendLoan) {
            extendLoanTime(isbn, token)
            setIsbn('')
            setExtendLoan(false)
        }
    }, [extendLoan])

    function recomendedBooks(loanHistory) {
        let lastLoan = loanHistory[loanHistory.length - 1];
        let recomendationCategory = lastLoan.genre;

        // filter three books from given category
        let threeBooksFromTheCategory = books.filter((fbook) => { if (Math.random() > 0.90) return fbook })
        threeBooksFromTheCategory = threeBooksFromTheCategory.filter((book) => (book.genre === recomendationCategory)).slice(0, 3); //arvotaan kolme random kirjaa esitettäväksi

        return (
            <>
                {threeBooksFromTheCategory.map((book, index) => (
                    <div onClick={() => showBook(book.isbn, books)} key={index} className="books-item" style={{marginLeft: '-8px'}}>
                        <div className="thumbnail" style={{ backgroundColor: 'yellow' }}>
                            <GenreImages genre={book.genre} selectedLanguage={selectedLanguage} translateCategory={translateCategory} />
                            <div className="genre-cover-size"></div>
                        </div>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.genre}, {book.year}</p>
                        <p>&#127826; {book.rndRating}</p>
                    </div>
                ))}
            </>
        );
    }

    const timestamp = (unixTimestamp) => {
        let date = moment(unixTimestamp);
        // console.log(date)
        let formattedTime = date.format("DD-MM-YYYY HH:mm:ss");
        return formattedTime;
    };

    const getMyLoans = async (token) => {
        const url = 'https://buutti-library-api.azurewebsites.net/api/loans';
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        const response = await axios.get(url, config);
        //console.log('lainat', response)
        return response.data;
    };

    const returnBook = async (isbn, token) => {
        const url = 'https://buutti-library-api.azurewebsites.net/api/loans/' + isbn;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.put(url, {}, config);
        } catch (error) {
        }
    };

    const extendLoanTime = async (isbn, token) => {
        const url = 'https://buutti-library-api.azurewebsites.net/api/loans/' + isbn;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.patch(url, {}, config);
        } catch (error) {
        }
    };

    const handleReturn = (isbn) => {
        setReturnBookButton(true)
        setIsbn(isbn)
    }

    const handleExtend = (isbn) => {
        setExtendLoan(true)
        setIsbn(isbn)
    }

    const showHistoryButton = () => {
        setShowHistory(!showHistory)
    }

    const handleCloseBook = () => {
        setProfile(false)
        window.scrollTo(0, 0)
    };

    const showBook = (isbn, books) => {
        handleBookSelect(isbn, books)
        setProfile(false)
    }

    // Make a copy of all books array filtered with only title and genre 
    const isbnToDetails = {}
    books.forEach(book => {
        isbnToDetails[book.isbn] = { title: book.title, genre: book.genre }
    })

    // Map myLoans based on isbn and add title and genre to details 
    const arrayWithTitles = myLoans.map(item => {
        const bookDetails = isbnToDetails[item.book_isbn] || { title: 'Title Not Found', genre: 'Genre Not Found' }
        return {
            ...item,
            title: bookDetails.title,
            genre: bookDetails.genre
        }
    })

    // filter books that have not been returned and are shown in current loans
    const currentLoans = arrayWithTitles.filter(loan => !loan.returned);
    // filter books tha have been returned and are used in loan history
    const loanHistory = arrayWithTitles.filter(loan => loan.returned);

    const deleteAccount = () => window.alert(currentTranslations.deleteAccMsg)

    return (
        <>
            {profile && (
                <div className='ProfilePage'>
                    <div className='full-width pink-bg'>
                        <div className='wrapper'>
                            <div className='spacer-30'></div>
                            <div className='flex-row'>
                                <div className='profile-avatar'>{firstLetterOfName}</div>
                                <h1>{currentTranslations.hello}, {name}!</h1>
                            </div>
                        </div>
                    </div>
                    <div className='full-width white-bg'>
                        <div className='wrapper'>
                            <button className='simple-btn' onClick={handleCloseBook}>&larr; {currentTranslations.backToMain}</button>
                            <div className='container'>
                                <h2>{currentTranslations.myLoanedBooks}</h2>
                                {currentLoans.length > 0 ? (
                                    currentLoans.map((loan, index) => (
                                        <div key={'loan' + index} className='loan-item'>
                                            <div className='container-2'>
                                                <h3 onClick={() => showBook(loan.book_isbn, books)}>{loan.title}</h3>
                                                <p><b>{currentTranslations.genre}:</b> {loan.genre}</p>
                                                <p><b>ISBN:</b> {loan.book_isbn}</p>
                                                <p><b>{currentTranslations.loaned}:</b> {timestamp(loan.loaned)}</p>
                                                <p><b>{currentTranslations.due}:</b> {timestamp(loan.due)}</p>
                                            </div>
                                            <div className='container-2'>
                                                <button className='dark-btn' onClick={() => handleReturn(loan.book_isbn)}>{currentTranslations.return}</button>
                                                <button className='light-btn' onClick={() => handleExtend(loan.book_isbn)}>{currentTranslations.extend}</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>{currentTranslations.loansNotFound}</div>
                                )}
                            </div>
                            <div className='container'>
                                <button className='simple-btn' onClick={showHistoryButton}>{currentTranslations.loanHistoryHeading} <span className={showHistory ? 'rotated' : null}>&gt;</span>
                                </button>

                                {showHistory && (
                                    <>
                                        {loanHistory.length > 0 ? (
                                            loanHistory.map((loan, index) => (
                                                <div key={index} className='loan-history-item'>
                                                    <div className='container-2'>
                                                        <h3 onClick={() => showBook(loan.book_isbn, books)}>{loan.title}</h3>
                                                        <p><b>{currentTranslations.genre}:</b> {loan.genre}</p>
                                                        <p><b>ISBN:</b> {loan.book_isbn}</p>
                                                        <p><b>{currentTranslations.loaned}:</b> {timestamp(loan.loaned)}</p>
                                                        <p><b>{currentTranslations.returned}:</b> {timestamp(loan.returned)}</p>
                                                    </div>
                                                    <div className='container-2'>
                                                        <button className='dark-btn' onClick={() => showBook(loan.book_isbn, books)}>Lainaa uudelleen</button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>{currentTranslations.loansNotFound}</div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='full-width gray-bg'>
                        <div className='wrapper'>
                            <div className='container'>
                                {personalRecomendations && (
                                    <>
                                        <h2>{currentTranslations.personalRecomendationsTitle}</h2>
                                        {loanHistory.length > 0 ? <>{recomendedBooks(loanHistory)}</> : <p>{currentTranslations.noLoansYet}</p>}
                                    </>
                                )

                                }
                            </div>
                        </div>
                    </div>
                    <div className='full-width white-bg'>
                        <div className='wrapper'>
                            <h2>{currentTranslations.manageAcc}</h2>
                            <button className='dark-btn red' onClick={deleteAccount}>{currentTranslations.deleteAccBtn}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
