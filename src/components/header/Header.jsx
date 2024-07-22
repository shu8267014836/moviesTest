import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import BackArrowIcon from '../../assets/icons/arrow-left.svg';
import SearchIcon from '../../assets/icons/search.svg';

const Header = ({onchange}) => {
    
    const [scroll, setScroll] = useState(false);
    const [searchFlag, setSearchFlag] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    return (
        <div className={`d-flex align-items-center justify-content-between position-relative ${styles.header} ${scroll === true && styles.boxShadow}`}>
            {!searchFlag &&
                <>
                    <div className={`d-flex align-items-center ${styles.pageTitle}`}>
                        <button type="button">
                            <img src={BackArrowIcon} alt="" />
                        </button>
                        <h4>Romantic Comedy</h4>
                    </div>
                    <button type="button" onClick={() => setSearchFlag(true)}>
                        <img src={SearchIcon} alt="" />
                    </button>
                </>
            }

            {searchFlag &&
                <div className={styles.searchInput}>
                    <button type="button" onClick={() => setSearchFlag(false)}>
                        <img src={BackArrowIcon} alt="" />
                    </button>
                    <input type="search" name="search" placeholder="Search title" onChange={(e)=>onchange(e.target.value)} />
                </div>
            }
        </div>
    )
}

export default Header