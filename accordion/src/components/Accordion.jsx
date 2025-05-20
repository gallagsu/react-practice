'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

export default function Accordion(props) {
    const { title, content } = props;
    const [openIndex, setOpenIndex] = useState(null);

    function handleToggle(index) {
        console.log(`handling index ${index}`);
        openIndex === index ? setOpenIndex(null) : setOpenIndex(index);
    }

    return (
        <div className={styles.accordion}>
            <h1>{title}</h1>

            {content.map((item, index) => {
                const isOpen = index === openIndex;

                return (
                    <div className={styles.accordionItem} key={item.title}>
                        <div className={styles.itemTitle}>
                            {item.title}
                        </div>
                        <button className={styles.toggle} onClick={() => handleToggle(index)} aria-expanded={isOpen} aria-controls={`item-${index}`} id={`toggle-${index}`}>
                            {isOpen ? `-` : `+`}
                        </button>
                        <div className={`${styles.itemContent} ${isOpen ? '' : styles.hidden}`} id={`item-${index}`} role="region" aria-labelledby={`toggle-${index}`} hidden={!isOpen}>
                            {item.content}
                        </div>
                    </div>
            );
            })}
        </div>
    );
}