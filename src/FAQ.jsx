import { useEffect, useState } from 'react'
import { translations } from './Translations.jsx'
import './FAQ.css'

let ids = 1

export default function FAQ({ selectedLanguage }) {
    const [FAQdata, setFAQdata] = useState([])
    const currentTranslations = translations[selectedLanguage]

    useEffect(() => {
        setFAQdata(currentTranslations.FAQ.map(item => item = { ...item, isOpen: false, id: 'FAQ' + ids++ }))
    }, [selectedLanguage])

    const toggleFAQ = (x, FAQisOpen, index) => {
        // toggles FAQ to show answer
        x.style.height === 'auto' ? x.style.height = '90px' : x.style.height = 'auto'

        // toggles right-hand button from + to x
        const updatedData = FAQdata.map((item, i) => i === index ? item = { ...item, isOpen: !item.isOpen } : item)
        setFAQdata(updatedData)
    }

    return (
        <div className='full-width gray-bg'>
            <h2 className="center-heading-big">{currentTranslations.FAQtitle}</h2>
            <div className="spacer-30"></div>

            {FAQdata.map((item, index) => {
                return (
                    <div key={item.id} className='faq-element' onClick={(e) => toggleFAQ(e.currentTarget, item.isOpen, index)}>
                        <span className='faq-title'>{item.question}{!item.isOpen ? <button>+</button> : <button className='close-FAQ'>+</button>}</span>
                        <span className='faq-text' onClick={(e) => e.stopPropagation()}>{item.answer}</span>
                    </div>
                )
            })}
        </div>
    )
}