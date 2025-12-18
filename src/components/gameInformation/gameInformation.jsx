import './gameInformation.css';
import React from 'react';
import PropTypes from 'prop-types'

function GameInformation({description, instructions}) {
    console.log('Game Information se renderiza nuevamente');
    return(
        <div className='game-information-container'>
            <h2>Description</h2>
            <p>{description}</p>
            <h2>Instructions</h2>
            <p>{instructions}</p>
        </div>
    );
}

GameInformation.propTypes = {
    description: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired
}

// Error: No hace falta React.memo, sus props no cambian al rerender de GamePage, entonces no se renderiza
// y no tiene ningun hijo que dependa de lo que cambia en GamePage que haga rerender de GameInformation y 
// del hijo mismo.

// Aqui esta otra confusion por ChatGPT, si lo re renderiza, es React.memo quien memoiza y evita que pase 
// eso. Si no esta se renderiza cada vez que se renderiza de nuevo GamePage.
export default React.memo(GameInformation);