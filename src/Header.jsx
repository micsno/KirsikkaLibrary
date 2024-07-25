import { useState, useEffect } from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import Login from './Login';
import './Header.css'
import { translations } from './Translations.jsx'

const Header = ({ token, setToken, storedToken, setStoredToken, storedUserName, setStoredUserName,
  name, setName, selectedLanguage, setSelectedLanguage, books, setBooks, genreColors,
  myLoans, setMyLoans, profile, setProfile, firstLetterOfName, setFirstLetterOfName, isMobile }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [changeMenuBtn, setChangeMenuBtn] = useState('')

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    localStorage.setItem("myLanguageSelection", e.target.value);

  };

  const currentTranslations = translations[selectedLanguage];


  const handleMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
      if (isMobileMenuOpen) {
        setChangeMenuBtn('')
      } else {
        setChangeMenuBtn('change-mobile-menu-btn')
      }
    }
  }


  return (
    <header>
      <nav>
        <div id='nav-inner'>
          <a href="index.html" id="logo">Kirsikka</a>
          {!isMobile ? (
            <>
              <ul>
                <li><a href="#">{currentTranslations.categories}</a></li>
                <li><a href="#">{currentTranslations.libInfo}</a></li>
                <li><a href="#">{currentTranslations.contacts}</a></li>
              </ul>

              <div id='nav-align-right'>
                <Login token={token} setToken={setToken} setStoredToken={setStoredToken} 
                name={name} setName={setName} setStoredUserName={setStoredUserName} 
                isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} selectedLanguage={selectedLanguage} 
                isPopupVisible={isPopupVisible} setIsPopupVisible={setIsPopupVisible} myLoans={myLoans} setMyLoans={setMyLoans} profile={profile} setProfile={setProfile}
                firstLetterOfName={firstLetterOfName} setFirstLetterOfName={setFirstLetterOfName} />
                <span className="material-symbols-outlined">
                  language
                </span>
                <select id="languageSelector" value={selectedLanguage} onChange={handleLanguageChange} title='Choose language'>
                  <option value="suomi">suomi</option>
                  <option value="english">English</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div id='mobile-login-section'>
                <Login token={token} setToken={setToken} setStoredToken={setStoredToken} name={name} setName={setName} 
                setStoredUserName={setStoredUserName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} selectedLanguage={selectedLanguage} 
                isPopupVisible={isPopupVisible} setIsPopupVisible={setIsPopupVisible} myLoans={myLoans} setMyLoans={setMyLoans} profile={profile} setProfile={setProfile}
                firstLetterOfName={firstLetterOfName} setFirstLetterOfName={setFirstLetterOfName} />
                <button id='mobile-menu-btn' className={changeMenuBtn} onClick={handleMobileMenu}>
                  <div id='menu-top'></div>
                  <div id='menu-center'></div>
                  <div id='menu-bottom'></div>
                </button>
              </div>

              {isMobileMenuOpen ? (
                <>
                  <ul>
                    <li><a href="#Kategoriat">{currentTranslations.categories}</a></li>
                    <li><a href="#">{currentTranslations.libInfo}</a></li>
                    <li><a href="#">{currentTranslations.contacts}</a></li>
                  </ul>
                  <div id='nav-align-right'>
                    <span className="material-symbols-outlined">
                      language
                    </span>
                    <select id="languageSelector" value={selectedLanguage} onChange={handleLanguageChange} title='Choose language'>
                      <option value="suomi">suomi</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

