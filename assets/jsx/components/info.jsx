import React, { PropTypes } from 'react';


const InfoView = ({ home, work, directions }) => (
    <div className="info">
        <h3>Set your home and work locations</h3>
        {(home.place)
            ? <p>Home: {home.place.name}</p>
            : <p>Home: Please input your address</p>
        }
        {(!home.place)
            ? null
            : (work.place)
                ? <p>Work: {work.place.name}</p>
                : <p>Work: Please input your address</p>
        }
        {(!directions.routes)
            ? null
            : <div>
                <h5>Route</h5>
                <p>Summary: {directions.routes[0].summary}</p>
                <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
                <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
            </div>
        }

    </div>
);

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default InfoView;
