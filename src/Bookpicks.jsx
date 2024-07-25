import { useState, useEffect } from 'react';
import { GenreImages } from './BookPage.jsx';
import './Bookpicks.css';

const truncateLength = 46;
const initialSliderShiftValue = 216;
const initialBooksSliderMargin = -8;

// setBooks, genreColors, isbnNumbersWithAverages, setSelectedBook, were recently removed from the next line due to not being used
export const Bookpicks = ({ selectedLanguage, reviews, books, handleBookSelect, scaleUp, scaleDown, truncate, translateCategory  }) => { 
  const [pickedBooks, setPickedBooks] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderShiftValue, setSliderShiftValue] = useState(initialSliderShiftValue)
  const [disabled, setDisabled] = useState({
    left: false,
    right: false,
  })

  // This function is to get unique ISBN numbers from the backend query
  const getUniqueIsbnNumbers = (reviews) => {
    let listToBeReturned = [];
    reviews.forEach((review) => {
      if (!listToBeReturned.includes(review.book_isbn)) {
        listToBeReturned.push(review.book_isbn);
      }
    });
    return listToBeReturned;
  };

  // This is a function to calculate averageReview score for an ISBN number based on the given reviews
  const countAverage = (reviews, ISBN) => {
    let count = 0;
    let reviewSum = 0;
    let average = 0;

    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].book_isbn === ISBN) {
        count++;
        reviewSum += reviews[i].rating;
      }
    }
    average = reviewSum / count;
    return [ISBN, average, count];
  };


  // This useEffect defines the content of the PickedBooks list after we have received the books from the backend server
  useEffect(() => {
    const isbnNumbers = getUniqueIsbnNumbers(reviews);
    const isbnNumbersWithAverages = [];

    // console.log("Unique ISBN numbers in the comments are", isbnNumbers);
    for (let i = 0; i < isbnNumbers.length; i++) {
      isbnNumbersWithAverages.push(countAverage(reviews, isbnNumbers[i]));
    }

    //console.log("List before the sorting, ISBN, average score, number of reviews given", isbnNumbersWithAverages);
    isbnNumbersWithAverages.sort((a, b) => b[1] - a[1]);
    //console.log("The best book review scores, ISBN, average score, number of reviews given", isbnNumbersWithAverages);

    if (isbnNumbersWithAverages.length) {
      // console.log(isbnNumbersWithAverages);
      const newBooks = isbnNumbersWithAverages.map(book => {
        const bookDetails = books.find(bookToFind => bookToFind.isbn === book[0]);
        if (bookDetails) {
          return [bookDetails, book[1]];
        }
        return null;
      }).filter(book => book !== null);

      // setPickedBooks writes the pickedBooks list
      // console.log("CherryPickbook table value:", newBooks);
      setPickedBooks(newBooks);

    }
  }, [books]);

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

  const moveSliderLeft = (n) => {
    if (sliderIndex < 0 && sliderIndex >= -5) {
      setSliderIndex(sliderIndex + (n))
      //console.log(sliderIndex, 'slider index')
      setSliderShiftValue(initialSliderShiftValue)
    }
  }

  const moveSliderRight = (n) => {
    if (sliderIndex <= 0 && sliderIndex >= -4) {
      setSliderIndex(sliderIndex + (n))
      //console.log(sliderIndex, 'slider index')
      if (sliderIndex === -4) {
        setSliderShiftValue(initialSliderShiftValue - 26)
      } else {
        setSliderShiftValue(initialSliderShiftValue)
      }
    }
  }

  return (
    <div id='CherryPicks'>
      <div className='slider-wrapper'>
        <div className='books-slider' style={{ marginLeft: `${sliderIndex * sliderShiftValue + initialBooksSliderMargin}px` }}>
          {pickedBooks.length > 0 && pickedBooks[0][0] && pickedBooks.slice(0, 10).map((book, index) => (
            <div key={'BookPick' + index} className="books-item"
              onClick={() => handleBookSelect(book[0].isbn, books)}
              onMouseOver={(e) => scaleUp(e.currentTarget)}
              onMouseOut={(e) => scaleDown(e.currentTarget)}
            >
              <GenreImages genre={book[0].genre} selectedLanguage={selectedLanguage} translateCategory={translateCategory} />
              <h3>{truncate(book[0].title, truncateLength)}</h3>
              <p>{book[0].author}</p>
              <p>{translateCategory(book[0].genre, selectedLanguage)}, {book[0].year}</p>
              <p>&#127826; {book[1]}</p>
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
