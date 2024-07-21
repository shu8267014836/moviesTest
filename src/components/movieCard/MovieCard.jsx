import React from 'react';

const MovieCard = ({ preview, title, cardClass }) => {
    return (
        <>
            <figure className={cardClass}>
                <img src={preview} alt="" />
                <figcaption>{title}</figcaption>
            </figure>
        </>
    )
}

export default MovieCard