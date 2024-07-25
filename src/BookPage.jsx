import { useEffect, useState } from 'react';
import axios from 'axios';
import authorIcon from './assets/author.png';
import ISBNIcon from './assets/bar-code.png';
import genreIcon from './assets/genre.png';
import yearIcon from './assets/year.png';
import fantasyCover from './assets/fantasy.jpg';
import horrorCover from './assets/horror.jpg';
import westernCover from './assets/western.jpg'
import romanceCover from './assets/romance.jpg'
import philosophyCover from './assets/philosophy.jpg'
import kidsCover from './assets/kids.png'
import scifiCover from './assets/sci-fi.jpg'
import mysteryCover from './assets/mystery.png'
import selfHelpCover from './assets/self-help.jpg'
import historyCover from './assets/history.jpg'
import defaultCover from './assets/default.jpg'
import { translations } from './Translations.jsx';
import { getReviewsISBN, loanBook } from './Landing.jsx';
import './BookPage.css';

// In the GenreImages imported jpg-images are set to genreImages table.

export const GenreImages = ({ genre }) => {
  const genreImages = {
    'Fantasy': fantasyCover,
    'Mystery': mysteryCover,
    'Horror': horrorCover,
    'Western': westernCover,
    'Romance': romanceCover,
    'Philosophy': philosophyCover,
    'Self-help': selfHelpCover,
    'Children': kidsCover,
    'Sci-fi': scifiCover,
    'History': historyCover
  };

  const coverImage = genreImages[genre] || defaultCover;

  return (
    <div
      className="thumbnail"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* <center><b>{translateCategory(genre, selectedLanguage)}</b></center> */}
      <div className="genre-cover-size"></div>
    </div>
  );
};

const BookPage = ({
  selectedLanguage,
  books,
  setSelectedBook,
  selectedBook,
  reviews,
  setReviews,
  showReviews,
  setShowReviews,
  token,
  setSearchCategory,
  searchCategory,
  showDropdown,
  setShowDropdown,
  handleBookSelect,
  searchTerm,
  setSearchTerm,
  translateCategory,
  name
}) => {
  const [writeReview, setWriteReview] = useState('');
  const [rate, setRate] = useState('');
  const [loanMessage, setLoanMessage] = useState('');

  useEffect(() => { // Get reviews for selected book
    if (selectedBook) {
      getReviewsISBN(selectedBook.isbn);
    }
  }, [selectedBook]);

  useEffect(() => { // Reset loan message when book or language changes
    setLoanMessage('');
  }, [selectedBook, selectedLanguage]);

  const handleSearch = (event) => { // Search for books
    setSearchTerm(event.target.value);
    setSelectedBook(null);
    setShowDropdown(true);
  };

  const handleCategoryChange = (event) => { // Change search category
    setSearchCategory(event.target.value);
  };

  const handleViewReviews = () => { // Show or hide reviews
    setShowReviews(!showReviews);
    setLoanMessage('');
  };

  const handleCloseBook = () => {  // Close book page
    setSelectedBook(null);
    setShowReviews(false);
    window.scrollTo(0, 0);
  };

  const deleteReview = async (reviewId) => { // Delete review
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    const url = `https://buutti-library-api.azurewebsites.net/api/reviews/${reviewId}`;
    try {
      await axios.delete(url, config); // Delete review
      getReviewsISBN(selectedBook.isbn).then(setReviews); // Update reviews
    } catch (error) { 
      console.error('Error deleting review:', error);
    }
  };

  const handleLoanBook = async () => { // Loan book
    if (!selectedBook) return;
    if (!token) {
      setLoanMessage(currentTranslations.loginToLoan);
      return;
    }

    try {
      const { success } = await loanBook(selectedBook.isbn, token, currentTranslations, translations);
      setLoanMessage(success ? currentTranslations.loanSuccess : currentTranslations.loanFailed);
    } catch (error) {
      setLoanMessage(currentTranslations.loanFailed);
    }
  };

  const postReviews = async () => { // Post review
    if (!selectedBook || (!writeReview && !rate)) return;

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    const reviewObject = {
      "review": writeReview,
    };

    if (Number(rate) !== 0) { // Only add rating if it's not 0
      reviewObject.rating = Number(rate);
    }

    const url = `https://buutti-library-api.azurewebsites.net/api/reviews/${selectedBook.isbn}`;
    try { // Post review
      await axios.post(url, reviewObject, config);
      setWriteReview('');
      setRate('');
      getReviewsISBN(selectedBook.isbn).then(setReviews);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const currentTranslations = translations[selectedLanguage];

  const filterBooks = (book) => { // Filter books based on search term and category
    const term = searchTerm.toLowerCase();
    if (searchCategory === 'title') {
      return book.title.toLowerCase().includes(term);
    } else if (searchCategory === 'author') {
      return book.author && book.author.toLowerCase().includes(term);
    } else if (searchCategory === 'year') {
      return book.year.toString().includes(term);
    }
    return false;
  };

  const filteredBooks = books.filter(filterBooks).slice(0, 5); // Show only 5 search results

  return (
    <div className='BookPage'>
      <div id='hero'>
        <div className='wrapper'>
          <h1>{currentTranslations.welcome}</h1>
          <p>{currentTranslations.loanbooks}</p>
          <div id="search">
            <input
              value={searchTerm}
              id="search-input"
              onChange={handleSearch}
              placeholder={currentTranslations.placeholder}
            />
            <select id="search-options" value={searchCategory} onChange={handleCategoryChange}>
              <option value='title'>{currentTranslations.title}</option>
              <option value='author'>{currentTranslations.author}</option>
              <option value='year'>{currentTranslations.year}</option>
            </select>
            <button className={(!writeReview && !rate) ? 'disabled-button' : ''}><span className="material-symbols-outlined">search</span></button>
            {showDropdown && searchTerm && filteredBooks.length > 0 && (
              <div className='search-container'>
                <div className="dropdown">
                  {filteredBooks.map(book => ( // Show dropdown with search results
                    <div
                      key={book.isbn}
                      onClick={() => { handleBookSelect(book.isbn, books, setSelectedBook); }}
                      className="dropdown-item"
                    >
                      {book.title}, {book.author}, {book.isbn}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedBook && ( // Only show book page if a book is selected
        <div className='full-width white-bg'>
          <div className="book-list">
            <div className="book-item centered-book">
              <div className='wrapper'>
                <div className="selected-book-close">
                  <button id='bookpage-book-close-button' className='simple-btn' onClick={handleCloseBook}>&larr; {currentTranslations.close}</button>
                </div>
              </div>
              <div className="book-header">
                <div className='bookTitle'>
                  {selectedBook.title}
                </div>
                <button className="close-button" onClick={handleCloseBook}>+</button>
              </div>
              <GenreImages genre={selectedBook.genre} selectedLanguage={selectedLanguage} translateCategory={translateCategory} />
              <div className='bookInfo'>
                <div className='bookAuthor'>
                  <img src={authorIcon} width={20} height={20} alt="author" />
                  {currentTranslations.author}: {selectedBook.author}
                </div>
                <div className='bookYear'>
                  <img src={yearIcon} width={20} height={20} alt="year" />
                  {currentTranslations.year}: {selectedBook.year}
                </div>
                <div className='bookGenre'>
                  <img src={genreIcon} width={20} height={20} alt="genre" />
                  {currentTranslations.genre}: {translateCategory(selectedBook.genre, selectedLanguage)}
                </div>
                <div className='bookIsbn'>
                  <img src={ISBNIcon} width={20} height={20} alt="ISBN" />
                  ISBN: {selectedBook.isbn}
                </div>
              </div>
              
              <div className='selected-book-buttons'>
                <div className='flex-row'>
                  <button className='dark-btn' onClick={handleViewReviews}>
                    {showReviews ? currentTranslations.hideReviews : currentTranslations.viewReviews}
                  </button>
                  {!showReviews && (
                    <button className='light-btn' onClick={handleLoanBook}>{currentTranslations.loanbook}</button>
                  )}
                </div>
              </div>
              {loanMessage && <p>{loanMessage}</p>}

              {showReviews && ( // Only show reviews if the button is clicked
                <div className="reviews">
                  <div className="review-header-text">
                    <h3>{currentTranslations.reviews}</h3>

                    {token && ( // Only show review input if user is logged in
                      <div className="post-review">
                        <textarea
                          value={writeReview}
                          id="write-review-input"
                          onChange={(e) => setWriteReview(e.target.value)}
                          placeholder={currentTranslations.reviewPlaceholder}
                          style={{ width: '80%', height: 100, margin: 10 }}
                        /><br />
                        <label htmlFor="rate-input">{currentTranslations.rating}: {rate}/5 &#127826;</label><br />
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step={0.5}
                          value={rate}
                          id="rate-input"
                          onChange={(e) => setRate(e.target.value)}
                          style={{ width: '50%', margin: 10 }}
                        /> <br />
                        <button className={(!writeReview && !rate) ? 'disabled-button' : 'dark-btn'} onClick={postReviews} disabled={!writeReview && !rate}>
                          {currentTranslations.giveReview}
                        </button>
                      </div>
                    )}
                  </div>

                  {reviews.length > 0 ? ( // Only show reviews if there are any
                    reviews
                      .filter((each) => each.book_isbn === selectedBook.isbn)
                      .map(review => (
                        <div key={review.id} className="review">
                          {token && review.username === name && ( // Only show delete button if the review belongs to the user
                            <button id='delete-review-btn' onClick={() => deleteReview(review.id)} title={currentTranslations.deleteReview}>
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          )}
                          <div className='review-text'>
                            <p>&#127826; {review.rating}</p>
                            <p><q>{review.review}</q></p>
                            <p>{review.username}</p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>{currentTranslations.noReviews}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {searchTerm.length > 0 && filteredBooks.length === 0 && ( // Show not found message if no books are found
        <div className='full-width white-bg book-list'>{currentTranslations.notFound}</div>
      )}
    </div>
  );
};

export default BookPage;
