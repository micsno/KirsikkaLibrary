import { useState } from 'react';
import axios from 'axios';
import './Landing.css';
import { translations } from './Translations.jsx';
import { Bookpicks } from './Bookpicks.jsx';
import { Newbookpicks } from './Newbookpicks.jsx';
import BookPage from './BookPage.jsx';
import AboutSection from './AboutSection.jsx';
import FAQ from './FAQ.jsx';
import { ProfilePage } from './ProfilePage.jsx'
import { useMediaQuery } from "@uidotdev/usehooks";
import { Categories } from './Categories.jsx'

const booksItemHeight = 406;

export const getReviews = async () => {
    const url = 'https://buutti-library-api.azurewebsites.net/api/reviews';
    const response = await axios.get(url);
    return response.data;
};

export const getReviewsISBN = async (isbn) => {
    try {
        const url = 'https://buutti-library-api.azurewebsites.net/api/reviews/' + isbn;
        const response = await axios.get(url);
        return response.data;  // Return the processed reviews
    } catch (error) {
        return [];  // Return an empty array in case of an error
    }
};

export const postReviews = async (isbn, token) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const reviewObject = {
        "review": writeReview,
        "rating": Number(rate)
    };
    const url = 'https://buutti-library-api.azurewebsites.net/api/reviews/' + isbn;
    const response = await axios.post(url, reviewObject, config);
    setWriteReview(response.data);
};

export const loanBook = async (isbn, token) => {
    const url = `https://buutti-library-api.azurewebsites.net/api/loans/${isbn}`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    try {
        await axios.post(url, {}, config);
        return { success: true, message: "Lainaus onnistui" }; // Success message
    } catch (error) {
        return { success: false, message: "Kirjaa ei voi lainata" }; // Error message
    }
};

export function Landing({
    token, setToken, storedToken, setStoredToken, storedUserName, setStoredUserName,
    name, setName, selectedLanguage, books, setBooks, genreColors, isbnNumbersWithAverages,
    myLoans, setMyLoans, profile, setProfile,
    setSelectedBook, selectedBook, reviews, setReviews, showReviews, setShowReviews, searchCategory, setSearchCategory, showDropdown, setShowDropdown,
    searchTerm, setSearchTerm, smoothScrollToTop,
    firstLetterOfName,
    isMobile
}) {

    const [newBooksVisible, setNewBooksVisible] = useState(true);
    const currentTranslations = translations[selectedLanguage];

    function translateCategory(category, selectedLanguage) {
        if (selectedLanguage === 'english') { return category }
        else if (selectedLanguage === 'suomi') {
            switch (category) {
                case "Fantasy":
                    return 'Fantasia';
                    break;
                case "Mystery":
                    return 'Jännitys';
                    break;
                case "Horror":
                    return 'Kauhu';
                    break;
                case "Western":
                    return 'Länkkäri';
                    break;
                case "Romance":
                    return 'Romanssi';
                    break;
                case "Philosophy":
                    return 'Filosofia';
                    break;
                case "Self-help":
                    return 'Elämäntaito';
                    break;
                case "Children":
                    return 'Lapset';
                    break;
                case "Sci-fi":
                    return 'Sci-fi';
                    break;
                case "History":
                    return 'Historia';
                    break;
                default:
                    break;
            }
        }
    }

    // const getBooks = async () => {

    //     const url = 'https://buutti-library-api.azurewebsites.net/api/books';
    //     const response = await axios.get(url);
    //     const tempvar = response.data
    //     function rndRating() { 
    //         return  (Math.ceil(Math.random()*8)/2)}
    //     console.log("Kaikki kirjat:", tempvar)
    //     tempvar.map((book) => {})

    //     return response.data;
    // };

    const getBooks = async () => {
        const url = 'https://buutti-library-api.azurewebsites.net/api/books';
        const response = await axios.get(url);
        const books = response.data;

        function rndRating() {
            return (Math.ceil(Math.random() * 8) / 2);
        }

        const booksWithRatings = books.map((book) => ({
            ...book,
            rndRating: rndRating()
        }));

        console.log("Kaikki kirjat:", booksWithRatings);

        return booksWithRatings;
    };


    // Functions for books-slider items
    const scaleUp = (x) => {
        x.style.transform = 'scale(1.1) translateY(-8px)';
        x.style.margin = '10px 12px';
        x.style.height = (booksItemHeight - 20) + 'px';
    };

    const scaleDown = (x) => {
        x.style.transform = 'scale(1) translateY(0px)';
        x.style.margin = '0 8px';
        x.style.height = booksItemHeight + 'px';
    };

    // Shortens books-item heading to limited characters
    const truncate = (str, n) => {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    }

    const getReviews = async () => {
        const url = 'https://buutti-library-api.azurewebsites.net/api/reviews';
        const response = await axios.get(url);
        return response.data;
    };

    const handleBookSelect = (isbn, books) => {
        setSelectedBook(isbn);
        //console.log('isbn', isbn)
        if (books) {

            const selected = books.find(book => book.isbn === isbn);
            setSelectedBook(selected);
        }
        setSearchCategory('title')
        setShowDropdown(false)
        setSearchTerm('')
        smoothScrollToTop()
    };

    return (
        <>
            <main>

                {(!profile) &&
                    <BookPage selectedLanguage={selectedLanguage} books={books} setBooks={setBooks}
                        genreColors={genreColors} selectedBook={selectedBook} setSelectedBook={setSelectedBook}
                        reviews={reviews} setReviews={setReviews} showReviews={showReviews} setShowReviews={setShowReviews} token={token}
                        searchCategory={searchCategory} setSearchCategory={setSearchCategory}
                        showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleBookSelect={handleBookSelect}
                        searchTerm={searchTerm} setSearchTerm={setSearchTerm} translateCategory={translateCategory} name={name} />
                }

                <ProfilePage token={token} name={name} profile={profile} setProfile={setProfile} myLoans={myLoans} setMyLoans={setMyLoans} books={books}
                    selectedLanguage={selectedLanguage} setNewBooksVisible={setNewBooksVisible} newBooksVisible={newBooksVisible}
                    firstLetterOfName={firstLetterOfName} handleBookSelect={handleBookSelect} translateCategory={translateCategory} />

                {(newBooksVisible && !profile) && (
                    <div className='full-width white-bg'>
                        <h2><a>{currentTranslations.latestadds} <span>&rsaquo;</span></a></h2>

                        <Newbookpicks isMobile={isMobile} selectedLanguage={selectedLanguage} books={books} setBooks={setBooks} genreColors={genreColors}
                            setSelectedBook={setSelectedBook} scaleUp={scaleUp} scaleDown={scaleDown} truncate={truncate} handleBookSelect={handleBookSelect} translateCategory={translateCategory} />

                        <h2><a>{currentTranslations.cherrypics} <span>&rsaquo;</span></a></h2>
                        <Bookpicks isMobile={isMobile} selectedLanguage={selectedLanguage} reviews={reviews} books={books} setBooks={setBooks} genreColors={genreColors}
                            isbnNumbersWithAverages={isbnNumbersWithAverages} setSelectedBook={setSelectedBook} scaleUp={scaleUp} scaleDown={scaleDown}
                            truncate={truncate} handleBookSelect={handleBookSelect} translateCategory={translateCategory} />

                    </div>
                )}
                {(!profile) && (<>
                    <Categories selectedLanguage={selectedLanguage} currentTranslations={currentTranslations}
                        books={books} getBooks={getBooks} setBooks={setBooks} setReviews={setReviews}
                        getReviews={getReviews} translateCategory={translateCategory} setNewBooksVisible={setNewBooksVisible}
                        scaleUp={scaleUp} scaleDown={scaleDown} truncate={truncate} handleBookSelect={handleBookSelect} />

                    {newBooksVisible && <>
                        <AboutSection selectedLanguage={selectedLanguage} />

                        <FAQ selectedLanguage={selectedLanguage} />
                    </>}
                </>)}

            </main>
        </>
    );
}


