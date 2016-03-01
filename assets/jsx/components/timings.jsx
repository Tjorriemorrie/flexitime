import React, { PropTypes } from 'react';


const TimingsView = ({ timings }) => (
    <div className="timings">
        <h4>Timings</h4>
        {timings.directions.map(timing => {
            return <p>{timing.shift}</p>
        })}
    </div>
);

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default TimingsView;
