import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import BackArrowIcon from '../../assets/icons/arrow-left.svg';
import SearchIcon from '../../assets/icons/search.svg';

const Header = () => {
    
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    return (
        <div className={`d-flex align-items-center justify-content-between ${styles.header} ${scroll === true && styles.boxShadow}`}>
            <div className={`d-flex align-items-center ${styles.pageTitle}`}>
                <button type="button">
                    <img src={BackArrowIcon} alt="" />
                </button>
                <h4>Romantic Comedy</h4>
            </div>
            <button type="button">
                <img src={SearchIcon} alt="" />
            </button>
        </div>
    )
}

export default Header