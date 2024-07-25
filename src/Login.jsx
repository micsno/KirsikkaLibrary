import { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { translations } from './Translations';

const Login = ({ selectedLanguage, token, setToken,
    setStoredToken, name, setName, setStoredUserName, isPopupVisible,
    setIsPopupVisible, isLoggedIn, setIsLoggedIn, profile, setProfile, firstLetterOfName, setFirstLetterOfName }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiError, setApiError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Retrieve the token and username from local storage when the component mounts
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        const usernameFromStorage = localStorage.getItem('username');
        if (tokenFromStorage && usernameFromStorage) {
            setToken(tokenFromStorage);
            setStoredToken(tokenFromStorage);
            setName(usernameFromStorage);
            setStoredUserName(usernameFromStorage);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const firstLetter = name.charAt(0).toUpperCase();
        if (token && name) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', name);  // Changed to 'username'
            setStoredToken(token);
            setStoredUserName(name);  // Changed to 'setStoredUserName'
            setFirstLetterOfName(firstLetter);
        }
    }, [token, name]);

    const handleLoginClick = () => {
        setIsLogin(true);
        setIsPopupVisible(true);
        setUsername('');
        setPassword('');
        clearErrors();
    };

    const handleSignupClick = () => {
        setIsLogin(false);
        setIsPopupVisible(true);
        setUsername('');
        setPassword('');
        clearErrors();
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setUsername('');
        setPassword('');
        clearErrors();
        setRegistrationSuccess(false);
    };

    const clearErrors = () => {
        setUsernameError('');
        setPasswordError('');
        setApiError('');
    };

    const handleProfile = () => {
        setProfile(!profile)
    };


    const registerNewUser = async (username, password) => {
        setIsLoading(true);
        try {
            const body = { username, password };
            const url = 'https://buutti-library-api.azurewebsites.net/api/users/register';
            const response = await axios.post(url, body);
            setToken(response.data.token);
            setName(username);
            loginUser(username, password)
            // console.log('Token that we received:', response.data.token);
            setRegistrationSuccess(true);
            setUsername('');
            setPassword('');

        } catch (error) {
            setApiError(currentTranslations.registrationFailed || 'Registration failed');
            console.error('Error:', error);
        }
        setIsLoading(false);
    };

    const loginUser = async (username, password) => {
        setIsLoading(true);
        try {
            const body = { username, password };
            const url = 'https://buutti-library-api.azurewebsites.net/api/users/login';
            const response = await axios.post(url, body);
            setToken(response.data.token);
            setName(username);
            setIsLoggedIn(true)
            // console.log('My token is:', response.data.token);
            closePopup();
        } catch (error) {
            setApiError(currentTranslations.loginFailed || 'Login failed');
            console.error('Error:', error);
        }
        setIsLoading(false);
    };

    const handleSubmit = () => {
        clearErrors();
        let valid = true;
        if (!username) {
            setUsernameError(currentTranslations.usernameError);
            valid = false;
        }
        if (!password) {
            setPasswordError(currentTranslations.passwordError);
            valid = false;
        }
        if (valid) {
            if (isLogin) {
                loginUser(username, password);
            } else {
                registerNewUser(username, password);
            }
        }
    };

    const logOutUser = async () => {
        setToken('');
        setName('');
        localStorage.removeItem('token');
        setStoredToken('');
        localStorage.removeItem('username');
        setStoredUserName('');
        setIsLoggedIn(false);
        window.location.reload();
    };

    const currentTranslations = translations[selectedLanguage];

    return (
        <div className='Login'>
            {isLoggedIn ? (
                <>
                    <div id='nav-profile-element'>
                        <div id='nav-profile-inner' title='Avaa profiili'>
                            <div id='nav-avatar'>{firstLetterOfName}</div>
                            <button id='nav-username'>{name}<span>&gt;</span></button>
                        </div>
                        <div id='nav-profile-dropdown'>
                            <button className='simple-btn' onClick={() => handleProfile()} >{currentTranslations.profile}</button><br />
                            <button className='dark-btn' onClick={() => logOutUser()}>{currentTranslations.logout}</button>
                        </div>
                    </div>
                </>
            ) : (
                <div id='nav-profile-element'>
                    <button className='light-btn' onClick={handleLoginClick}>
                        {currentTranslations.login}
                    </button>
                </div>
            )}

            {isPopupVisible && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup} title={currentTranslations.closeButtonTitle}>+</button>
                        {isLogin ? (
                            <div className="login">
                                <form className="login-form active">
                                    <div className="login-header">
                                        <h2>{currentTranslations.loginHeader}</h2>
                                    </div>

                                    {/* Username */}
                                    <label htmlFor="nickname">{currentTranslations.usernameLabel}</label>
                                    <input
                                        type="text"
                                        id="nickname"
                                        placeholder={currentTranslations.usernameLabel}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    {usernameError && <div className="error">{usernameError}</div>}

                                    {/* Password */}
                                    <label htmlFor="lpassword">{currentTranslations.passwordLabel}</label>
                                    <input
                                        type="password"
                                        id="lpassword"
                                        placeholder={currentTranslations.passwordLabel}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {passwordError && <div className="error">{passwordError}</div>}
                                    {isLoading ? (
                                        <div className="loader"></div>

                                    ) : (

                                        /* Log in button */
                                        <button
                                            className="dark-btn"
                                            type="button"
                                            onClick={handleSubmit}
                                            onKeyDown={e => e.key === 'Enter' ? 'Klikattu enter' : 'Testi viesti'}
                                        >
                                            {currentTranslations.loginButtonText}
                                        </button>
                                    )}

                                    {apiError && <div className="error">{currentTranslations.apiError}{apiError}</div>}

                                    {/* Switch to registration */}
                                    <p className="toggle-text">
                                        {currentTranslations.toggleTextLogin}
                                    </p>
                                    <button type="button" className="simple-btn" onClick={handleSignupClick}>
                                        {currentTranslations.toggleButtonLogin}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="signup">
                                <form className="signup-form active">
                                    <div className="login-header">
                                        <h2>{currentTranslations.signupHeader}</h2>
                                    </div>

                                    {/* Username */}
                                    <label htmlFor="nickname">{currentTranslations.usernameLabel}</label>
                                    <input
                                        type="text"
                                        id="nickname"
                                        placeholder={currentTranslations.usernameLabel}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    {usernameError && <div className="error">{usernameError}</div>}

                                    {/* Password */}
                                    <label htmlFor="spassword">{currentTranslations.passwordLabel}</label>
                                    <input
                                        type="password"
                                        id="spassword"
                                        placeholder={currentTranslations.passwordLabel}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {passwordError && <div className="error">{passwordError}</div>}
                                    {isLoading ? (
                                        <div className="loader"></div>

                                    ) : (

                                        /* Sign up button */
                                        <button
                                            className="dark-btn"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            {currentTranslations.signupButtonText}
                                        </button>
                                    )}

                                    {registrationSuccess && <div className="success">{currentTranslations.registrationSuccess}</div>}
                                    {apiError && <div className="error">{currentTranslations.apiError}{apiError}</div>}

                                    {/* Switch to log in */}
                                    <p className="toggle-text">
                                        {currentTranslations.toggleTextSignup}
                                    </p>
                                    <button type="button" className="simple-btn" onClick={handleLoginClick}>
                                        {currentTranslations.toggleButtonSignup}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
