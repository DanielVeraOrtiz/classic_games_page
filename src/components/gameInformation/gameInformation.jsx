import './gameInformation.css';
import React from 'react';
import PropTypes from 'prop-types'

function GameInformation({description, instructions}) {
    return(
        <div className='game-information-container'>
            <h2>Description</h2>
            <p>{description}</p>
            <h2>Instructions</h2>
            <p>{instructions}</p>
        </div>
    );
}

export default React.memo(GameInformation);

GameInformation.propTypes = {
    description: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired
}