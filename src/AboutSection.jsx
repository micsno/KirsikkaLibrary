import bookReadImg from './assets/journal-woman-looking-at-a-book.png';
import booksDeliveryImg from './assets/journal-delivery-box.png';
import booksReviewImg from './assets/journal-man-with-laptop.png';
import './AboutSection.css';
import { translations } from './Translations.jsx';
import { SocialIcon } from 'react-social-icons'

export default function AboutSection({ selectedLanguage }) {
    const currentTranslations = translations[selectedLanguage];

    return (
        <div className='AboutSection full-width pink-bg'>
            <div className='wrapper'>
                <h2 className='center-heading-big'>{currentTranslations.abouttitle}</h2>
                <div className="spacer-30"></div>
                <div className='wrapper about-containers'>
                    <div className="container-3">
                        <div className='img-frame-horizontal'>
                            <img src={bookReadImg} alt="Loan books online" />
                        </div>
                        <h3>{currentTranslations.aboutloanbooks}</h3>
                    </div>
                    <div className="container-3">
                        <div className='img-frame-horizontal smaller'>
                            <img src={booksDeliveryImg} alt="Get books delivered to you" />
                        </div>
                        <h3>{currentTranslations.aboutgetbooks}</h3>
                    </div>
                    <div className="container-3">
                        <div className='img-frame-vertical padding-top-30'>
                            <img src={booksReviewImg} alt="Leave a book review" />
                        </div>
                        <h3>{currentTranslations.aboutgivereview}</h3>
                    </div>
                </div>
                <p className="narrow-p">{currentTranslations.abouttext}</p>
                <div className="spacer-50"></div>
                <h2 className="center-heading-big">{currentTranslations.followus}</h2>
                <div className="spacer-30"></div>
                <div className='about-social-media-links'>
                    <SocialIcon href='https://buuttiedu.com/starttipaketti-web-kehitykseen-2024-oulu' target='_blank' network='facebook' bgColor="#fff" fgColor="#000" />
                    <SocialIcon href='https://buuttiedu.com/starttipaketti-web-kehitykseen-2024-oulu' target='_blank' network='instagram' bgColor="#fff" fgColor="#000" />
                    <SocialIcon href='https://buuttiedu.com/starttipaketti-web-kehitykseen-2024-oulu' target='_blank' network='youtube' bgColor="#fff" fgColor="#000" />
                </div>
            </div>
        </div>
    );
}
