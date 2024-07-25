import './Footer.css'
import {translations} from './Translations.jsx'


export default function Footer({selectedLanguage}) {

    const currentTranslations = translations[selectedLanguage];

    return (
        <footer>
            <div className="container-2">
                <a href="#" id="logo">Kirsikka</a>
                <div className="spacer-30"></div>
                <p>Kirsikka-kirjasto Coy</p>
                <p>&copy; 2024, Team Orange</p>
            </div>
            <div className="container-2">
                <ul>
                    <li><a href="#">{currentTranslations.categories}</a></li>
                    <li><a href="#">{currentTranslations.libInfo}</a></li>
                    <li><a href="#">{currentTranslations.contacts}</a></li>
                    <li><a href="#">{currentTranslations.terms}</a></li>
                    <li><a href="#">{currentTranslations.privacypolicy}</a></li>
                </ul>
            </div>
        </footer>
    )
}
