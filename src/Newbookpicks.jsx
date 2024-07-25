import { useState, useEffect } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import { GenreImages } from './BookPage.jsx';
import './Newbookpicks.css'

const truncateLength = 46;
const initialSliderShiftValue = 216;
const initialBooksSliderMargin = -8;

// setBooks, genreColors, setSelectedBook were recently removed from the next line due to not being used
export const Newbookpicks = ({ isMobile, selectedLanguage, books, handleBookSelect, scaleUp, scaleDown, truncate, translateCategory }) => {
    const [newPickedBooks, setNewPickedBooks] = useState([]);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [sliderIndexDifference, setSliderIndexDifference] = useState([0])
    const [sliderShiftValue, setSliderShiftValue] = useState(initialSliderShiftValue)
    const [disabled, setDisabled] = useState({
        left: false,
        right: false,
    })
    const isLaptop = useMediaQuery('only screen and (max-width : 1200px)');
    // console.log('laptop:', isLaptop, 'mobile:', isMobile)

    // This useEffect sorts books according to the year attribure of the book object and creates list of latest books (pickedBooks)
    useEffect(() => {
        if (books && books.length > 0) {
            const sortedBooks = [...books];
            sortedBooks.sort((p1, p2) => (p1.year < p2.year) ? 1 : (p1.year > p2.year) ? -1 : 0);
            const newbooks = sortedBooks.slice(0, 10);
            setNewPickedBooks(newbooks);
        }
    }, [books]); // Add books as dependency

    // slider development
    useEffect(() => {
        if (sliderIndex === 0) {
            setDisabled({ left: true, right: false })
        } else if (sliderIndex === -5) {
            setDisabled({ left: false, right: true })
        } else {
            setDisabled({ left: false, right: false })
        }
    }, [sliderIndex])

    useEffect(() => {
        isMobile ? setSliderIndexDifference(newPickedBooks.length - (newPickedBooks.length - 9)) : setSliderIndexDifference(newPickedBooks.length - (newPickedBooks.length - 5))
        //console.log(sliderIndexDifference, 'index', isMobile, 'is mobile')
        //console.log(newPickedBooks.length - (newPickedBooks.length - 9) + ' tämä katos, HOX korjaa myös disabled tilamuuttuja')
    }, [isMobile])

    const moveSliderLeft = (n) => {
        if (sliderIndex < 0 && sliderIndex >= (-1 * sliderIndexDifference)) {
            setSliderIndex(sliderIndex + (n))
            //console.log(sliderIndex, 'slider index')
            setSliderShiftValue(initialSliderShiftValue)
        }
    }

    const moveSliderRight = (n) => {
        if (sliderIndex <= 0 && sliderIndex >= (-1 * (sliderIndexDifference - 1))) {
            setSliderIndex(sliderIndex + (n))
            //console.log(sliderIndex, 'slider index')
            if (sliderIndex === (-1 * (sliderIndexDifference - 1))) {
                setSliderShiftValue(initialSliderShiftValue - 26)
            } else {
                setSliderShiftValue(initialSliderShiftValue)
            }
            //console.log(sliderIndexDifference, 'dihiverense')
        }
    }

    return (
        <div id="Newbookpicks">
            <div className='slider-wrapper'>
                <div className='books-slider' style={{ marginLeft: `${sliderIndex * sliderShiftValue + initialBooksSliderMargin}px` }}>
                    {newPickedBooks.length > 0 && newPickedBooks.map((book, index) => (
                        <div key={'NewBookPicks' + index} className="books-item" onClick={(e) => handleBookSelect(book.isbn, books)} onMouseOver={(e) => scaleUp(e.currentTarget)} onMouseOut={(e) => scaleDown(e.currentTarget)}>
                            <GenreImages genre={book.genre} selectedLanguage={selectedLanguage} translateCategory={translateCategory} />
                            <h3>{truncate(book.title, truncateLength)}</h3>
                            <p>{book.author}</p>
                            <p>{translateCategory(book.genre, selectedLanguage)}, {book.year}</p>
                            <p>&#127826; {book.rndRating}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button className={`books-slider-btn arr-left ${disabled.left && 'disabled'}`} onClick={() => moveSliderLeft(+1)}>
                <span className='material-symbols-outlined'>
                    chevron_left
                </span></button>
            <button className={`books-slider-btn arr-right ${disabled.right && 'disabled'}`} onClick={() => moveSliderRight(-1)}>
                <span className='material-symbols-outlined'>
                    chevron_right
                </span>
            </button>
        </div>
    );
};
