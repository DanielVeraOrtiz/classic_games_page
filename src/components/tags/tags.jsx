import './tags.css';
import React from 'react';
import PropTypes from 'prop-types';

function Tag({tag}) {
    return(
        <div className='tag-container'>
            <p>{tag}</p>
        </div>
    );
}

export default React.memo(Tag);

Tag.propType = {
    tag: PropTypes.string.isRequired,
}