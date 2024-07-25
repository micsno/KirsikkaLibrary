import { useState, useEffect } from 'react';
import { GenreImages } from './BookPage.jsx';

const truncateLength = 46;
const initialSliderShiftValue = 216;
const initialBooksSliderMargin = -8;

export default function CategorySelfHelp({ books, selectedLanguage, scaleUp, scaleDown, currentTranslations, translateCategory, truncate, handleBookSelect }) {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [sliderShiftValue, setSliderShiftValue] = useState(initialSliderShiftValue)
    const [disabled, setDisabled] = useState({
        left: false,
        right: false,
    })

    // books slider usability
    useEffect(() => {
        if (sliderIndex === 0) {
            setDisabled({ left: true, right: false })
        } else if (sliderIndex === -5) {
            setDisabled({ left: false, right: true })
        } else {
            setDisabled({ left: false, right: false })
        }
    }, [sliderIndex])

    const moveSliderLeft = (n) => {
        if (sliderIndex < 0 && sliderIndex >= -5) {
            setSliderIndex(sliderIndex + (n))
            setSliderShiftValue(initialSliderShiftValue)
        }
    }

    const moveSliderRight = (n) => {
        if (sliderIndex <= 0 && sliderIndex >= -4) {
            setSliderIndex(sliderIndex + (n))
            if (sliderIndex === -4) {
                setSliderShiftValue(initialSliderShiftValue - 26)
            } else {
                setSliderShiftValue(initialSliderShiftValue)
            }
        }
    }

    return (<>
        <div>
            <h2>
                <a>{currentTranslations.selfhelp}{currentTranslations.books} <span>&rsaquo;</span></a>
            </h2>
        </div>
        <div className='slider-container'>
            <div className='slider-wrapper'>
                <div className='books-slider' style={{ marginLeft: `${sliderIndex * sliderShiftValue + initialBooksSliderMargin}px` }}>
                    {books.filter((book) => book.genre === 'Self-help').slice(0, 10).map((book, index) => (
                        <div key={'SelfHelp' + index} className='books-item'
                            onClick={(e) => handleBookSelect(book.isbn, books)}
                            onMouseOver={(e) => scaleUp(e.currentTarget)}
                            onMouseOut={(e) => scaleDown(e.currentTarget)}
                        >
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
    </>
    )
}