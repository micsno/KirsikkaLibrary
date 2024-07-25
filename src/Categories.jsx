import { useState, useEffect } from 'react';
import CategoryFantasy from './CategoryFantasy.jsx';
import CategoryMystery from './CategoryMystery.jsx';
import CategoryHorror from './CategoryHorror.jsx';
import CategoryWestern from './CategoryWestern.jsx';
import CategoryRomance from './CategoryRomance.jsx';
import CategoryPhilosophy from './CategoryPhilosophy.jsx';
import CategorySelfHelp from './CategorySelfHelp.jsx';
import CategoryChildrens from './CategoryChildrens.jsx';
import CategoryScifi from './CategoryScifi.jsx';
import CategoryHistory from './CategoryHistory.jsx';
import './Categories.css'
import { GenreImages } from './BookPage.jsx';

// Categories component provides listing of books in a selected category provided for the Landing.jsx
export const Categories = ({ selectedLanguage, currentTranslations,
    translateCategory, books, getBooks, setBooks, setReviews, getReviews,
    setNewBooksVisible, truncate, handleBookSelect, scaleUp, scaleDown }) => {

    const [fantasy, setFantasy] = useState([]);
    const [mystery, setMystery] = useState([]);
    const [horror, setHorror] = useState([]);
    const [western, setWestern] = useState([]);
    const [romance, setRomance] = useState([]);
    const [philosophy, setPhilosophy] = useState([]);
    const [selfhelp, setSelfhelp] = useState([]);
    const [children, setChildren] = useState([]);
    const [scifi, setScifi] = useState([]);
    const [history, setHistory] = useState([]);
    const [fantasyVisible, setFantasyVisible] = useState(false);
    const [mysteryVisible, setMysteryVisible] = useState(false);
    const [horrorVisible, setHorrorVisible] = useState(false);
    const [westernVisible, setWesternVisible] = useState(false);
    const [romanceVisible, setRomanceVisible] = useState(false);
    const [philosophyVisible, setPhilosophyVisible] = useState(false);
    const [selfHelpVisible, setSelfHelpVisible] = useState(false);
    const [childrenVisible, setChildrenVisible] = useState(false);
    const [scifiVisible, setScifiVisible] = useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [radioCategories, setRadioCategories] = useState('');
    const [areCategorySlidersVisible, setCategorySlidersVisible] = useState(false);

    //This useEffect creates book categories after we have received all books from the backend server
    useEffect(() => {
        const fetchData = async () => {
            const books = await getBooks();
            const reviews = await getReviews();
            getBooksByGenre("Fantasy", books);
            getBooksByGenre("Mystery", books);
            getBooksByGenre("Horror", books);
            getBooksByGenre("Western", books);
            getBooksByGenre("Romance", books);
            getBooksByGenre("Philosophy", books);
            getBooksByGenre("Self-help", books);
            getBooksByGenre("Children", books);
            getBooksByGenre("Sci-fi", books);
            getBooksByGenre("History", books);
            setBooks(books);
            setReviews(reviews);
            //console.log("Landing laskuri in useEffect", fantasy);
        };
        fetchData();
    }, [setBooks, setReviews, selectedLanguage]);

    const setCategoryBooksHiden = () => {
        setFantasyVisible(false);
        setMysteryVisible(false);
        setHorrorVisible(false);
        setWesternVisible(false);
        setRomanceVisible(false);
        setPhilosophyVisible(false);
        setSelfHelpVisible(false);
        setChildrenVisible(false);
        setScifiVisible(false);
        setHistoryVisible(false);
    }

    // This function creates filtered book lists and saves them to a category state variable such as fantasy, mystery or horror. There is a state variable for each book category.
    const getBooksByGenre = (reqGenre, books) => {
        //console.log("getBooksByGenre - ", reqGenre);
        let filteredList = books.filter((book) => book.genre === reqGenre).map((book) => (
            <div key={book.isbn} className="books-item" onClick={() => handleBookSelect(book.isbn, books)}>
                <GenreImages genre={reqGenre} selectedLanguage={selectedLanguage} translateCategory={translateCategory} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{translateCategory(book.genre, selectedLanguage)}, {book.year}</p>
                <p>&#127826; {book.rndRating}</p>
            </div>
        ));

        switch (reqGenre) {
            case "Fantasy":
                setFantasy(filteredList);
                break;
            case "Mystery":
                setMystery(filteredList);
                break;
            case "Horror":
                setHorror(filteredList);
                break;
            case "Western":
                setWestern(filteredList);
                break;
            case "Romance":
                setRomance(filteredList);
                break;
            case "Philosophy":
                setPhilosophy(filteredList);
                break;
            case "Self-help":
                setSelfhelp(filteredList);
                break;
            case "Children":
                setChildren(filteredList);
                break;
            case "Sci-fi":
                setScifi(filteredList);
                break;
            case "History":
                setHistory(filteredList);
                break;
            default:
                break;
        }
    };

    // The logic of the Category toggles is: if no previous selection, then when category button is pressed
    // show the category books and hide the newBooks and CherryPicks above.
    const toggleFantasyVisibility = () => {
        if (radioCategories === "Fantasy") { setRadioCategories(""); setNewBooksVisible(true); }
        else { setRadioCategories("Fantasy"); setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setFantasyVisible(!fantasyVisible);
    }

    const toggleMysteryVisibility = () => {
        if (radioCategories === "Mystery") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Mystery"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setMysteryVisible(!mysteryVisible);
    };
    const toggleHorrorVisibility = () => {
        if (radioCategories === "Horror") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Horror"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setHorrorVisible(!horrorVisible);
    };
    const toggleWesternVisibility = () => {
        if (radioCategories === "Western") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Western"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setWesternVisible(!westernVisible);
    };
    const toggleRomanceVisibility = () => {
        if (radioCategories === "Romance") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Romance"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setRomanceVisible(!romanceVisible);
    };
    const togglePhilosophyVisibility = () => {
        if (radioCategories === "Philosophy") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Philosophy", setNewBooksVisible(false)) }
        setCategoryBooksHiden();
        setPhilosophyVisible(!philosophyVisible);
    };
    const toggleSelfHelpVisibility = () => {
        if (radioCategories === "SelfHelp") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("SelfHelp"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setSelfHelpVisible(!selfHelpVisible);
    };
    const toggleChildrenVisibility = () => {
        if (radioCategories === "Children") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Children"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setChildrenVisible(!childrenVisible);
    };
    const toggleScifiVisibility = () => {
        if (radioCategories === "Scifi") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("Scifi"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setScifiVisible(!scifiVisible);
    };
    const toggleHistoryVisibility = () => {
        if (radioCategories === "History") { setRadioCategories(""), setNewBooksVisible(true); }
        else { setRadioCategories("History"), setNewBooksVisible(false); }
        setCategoryBooksHiden();
        setHistoryVisible(!historyVisible);
    };

    const showAllSliders = () => {
        setCategorySlidersVisible(true);
        setNewBooksVisible(false);
    }

    const handleCloseCategories = () => {
        setCategorySlidersVisible(false);
        setNewBooksVisible(true);
        setRadioCategories("");
        setCategoryBooksHiden();
    }

    return (
        <div id="Kategoriat" className='full-width gray-bg'>
            <div className='wrapper'>
                {(radioCategories !== '' || areCategorySlidersVisible) &&
                    <button className='simple-btn' onClick={handleCloseCategories}>&larr; {currentTranslations.backToMain}</button>
                }
                <h2 className='center-heading-big'>{currentTranslations.categories}</h2>
                <div className='category-btns'>
                    <button
                        onClick={toggleFantasyVisibility}
                        className={!fantasyVisible ? null : 'active'}
                    >
                        {currentTranslations.fantasy}
                    </button>
                    <button
                        onClick={toggleMysteryVisibility}
                        className={!mysteryVisible ? null : 'active'}
                    >
                        {currentTranslations.mystery}
                    </button>
                    <button
                        onClick={toggleHorrorVisibility}
                        className={!horrorVisible ? null : 'active'}
                    >
                        {currentTranslations.horror}
                    </button>
                    <button
                        onClick={toggleWesternVisibility}
                        className={!westernVisible ? null : 'active'}
                    >
                        {currentTranslations.western}
                    </button>
                    <button
                        onClick={toggleRomanceVisibility}
                        className={!romanceVisible ? null : 'active'}
                    >
                        {currentTranslations.romance}
                    </button>
                    <button
                        onClick={togglePhilosophyVisibility}
                        className={!philosophyVisible ? null : 'active'}
                    >
                        {currentTranslations.philosophy}
                    </button>
                    <button
                        onClick={toggleSelfHelpVisibility}
                        className={!selfHelpVisible ? null : 'active'}
                    >
                        {currentTranslations.selfhelp}
                    </button>
                    <button
                        onClick={toggleChildrenVisibility}
                        className={!childrenVisible ? null : 'active'}
                    >
                        {currentTranslations.children}
                    </button>
                    <button
                        onClick={toggleScifiVisibility}
                        className={!scifiVisible ? null : 'active'}
                    >
                        {currentTranslations.scifi}
                    </button>
                    <button
                        onClick={toggleHistoryVisibility}
                        className={!historyVisible ? null : 'active'}
                    >
                        {currentTranslations.history}
                    </button>
                </div>

                {fantasyVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.fantasy.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {fantasy}
                        </div>
                    </>
                )}

                {mysteryVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.mystery.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {mystery}
                        </div>
                    </>
                )}

                {horrorVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.horror.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {horror}
                        </div>
                    </>
                )}

                {westernVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.western.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {western}
                        </div>
                    </>
                )}

                {romanceVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.romance.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {romance}
                        </div>
                    </>
                )}

                {philosophyVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.philosophy.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {philosophy}
                        </div>
                    </>
                )}

                {selfHelpVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.selfhelp.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {selfhelp}
                        </div>
                    </>
                )}

                {childrenVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.allChildrens}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {children}
                        </div>
                    </>
                )}

                {scifiVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                {currentTranslations.all} {currentTranslations.scifi.toLowerCase()}{currentTranslations.books}
                            </h2>
                        </div>
                        <div className='books-container'>
                            {scifi}
                        </div>
                    </>
                )}

                {historyVisible && (
                    <>
                        <div>
                            <h2 className='all-books-heading'>
                                <a>{currentTranslations.all} {currentTranslations.history.toLowerCase()}{currentTranslations.books} <span>&rsaquo;</span></a>
                            </h2>
                        </div>
                        <div className='books-container'>
                            {history}
                        </div>
                    </>
                )}

                {radioCategories === '' && (<>
                    <CategoryFantasy books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                    <CategoryMystery books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />

                    {areCategorySlidersVisible ? <>
                        <CategoryHorror books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryWestern books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryRomance books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryPhilosophy books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategorySelfHelp books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryChildrens books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryScifi books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                        <CategoryHistory books={books} selectedLanguage={selectedLanguage} scaleUp={scaleUp} scaleDown={scaleDown} currentTranslations={currentTranslations} translateCategory={translateCategory} truncate={truncate} handleBookSelect={handleBookSelect} />
                    </>
                        : <a href='#Kategoriat'><button className='dark-btn' onClick={showAllSliders}>{currentTranslations.morecategories}</button></a>
                    }
                </>)}
            </div>
        </div>
    )
}
