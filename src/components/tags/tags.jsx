import './tags.css';
import React from 'react';
import PropTypes from 'prop-types';

function Tag({tag}) {
    console.log('Este tag se esta renderizando nuevamente');
    return(
        <div className='tag-container'>
            <p>{tag}</p>
        </div>
    );
}

Tag.propType = {
    tag: PropTypes.string.isRequired,
}

// Para que el rerender de GamePage haga rerender de tag.
export default React.memo(Tag);
