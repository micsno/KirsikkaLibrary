import { useState, useEffect } from 'react'
import { useMediaQuery } from "@uidotdev/usehooks";
import './App.css'
import Header from './Header.jsx'
import { Landing } from './Landing.jsx'
import Footer from './Footer.jsx'

function App() {
  const [token, setToken] = useState('')
  const [storedToken, setStoredToken] = useState('');
  const [storedUserName, setStoredUserName] = useState('');
  const [name, setName] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('suomi');
  const [books, setBooks] = useState([]);
  const [myLoans, setMyLoans] = useState([]);
  const [profile, setProfile] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const isMobile = useMediaQuery('only screen and (max-width : 1024px)');
  const [searchCategory, setSearchCategory] = useState('title');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [firstLetterOfName, setFirstLetterOfName] = useState('');


  // This useEffect fetches the earlier made language selections and brings them into use.
  // In case no selection was made earlier this assumes 'suomi', Finnish, as the default language.
    useEffect(() => {
    const storedLanguage = localStorage.getItem("myLanguageSelection");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      const defaultLanguage = 'suomi';
      setSelectedLanguage(defaultLanguage);
      localStorage.setItem("myLanguageSelection", defaultLanguage);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // This makes the page scroll to the top when the page is reloaded.
  }, []);

  const smoothScrollToTop = () => { 
    window.scrollTo({ top: 550, behavior: 'smooth' });
  }
    
    return (
      <>
        <Header
        token={token} setToken={setToken}
        storedToken={storedToken} setStoredToken={setStoredToken}
        storedUserName={storedUserName} setStoredUserName={setStoredUserName}
        name={name} setName={setName}
        selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}
        myLoans={myLoans} setMyLoans={setMyLoans}
        profile={profile} setProfile={setProfile}
        firstLetterOfName={firstLetterOfName} setFirstLetterOfName={setFirstLetterOfName} 
        isMobile={isMobile}
      />
      <Landing token={token} setToken={setToken}
        storedToken={storedToken} setStoredToken={setStoredToken}
        storedUserName={storedUserName} setStoredUserName={setStoredUserName}
        name={name} setName={setName} selectedLanguage={selectedLanguage}
        books={books} setBooks={setBooks}
        myLoans={myLoans} setMyLoans={setMyLoans}
        profile={profile} setProfile={setProfile}
        setSelectedBook={setSelectedBook} selectedBook={selectedBook}
        reviews={reviews} setReviews={setReviews} showReviews={showReviews} setShowReviews={setShowReviews}
        searchCategory={searchCategory} setSearchCategory={setSearchCategory}
        showDropdown={showDropdown} setShowDropdown={setShowDropdown} 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        firstLetterOfName={firstLetterOfName} setFirstLetterOfName={setFirstLetterOfName}
        isMobile={isMobile} smoothScrollToTop={smoothScrollToTop}
        />
      <Footer selectedLanguage={selectedLanguage} />
    </>
  )
}

export default App
