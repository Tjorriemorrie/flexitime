import React, { PropTypes } from 'react';


const InfoView = ({ home, work, directions, onRouteSelect }) => (
    <div className="info">
        <h3>Set your home and work locations</h3>
        {(home.place)
            ? <p>Home: {home.place.name}</p>
            : <p>Home: Please input your address</p>
        }
        {(!home.place)
            ? <p></p>
            : (work.place)
                ? <p>Work: {work.place.name}</p>
                : <p>Work: Please input your address</p>
        }
        {(!directions.directions)
            ? <p></p>
            : <div>
                <h3>Select your preferred route</h3>
                {directions.directions.routes.map((directions_route, i) => {
                    return <p key={'route_' + i} className={(directions_route == directions.route) ? 'active': ''}>
                        <a href="#foo" onClick={() => onRouteSelect(directions_route)}>{directions_route.summary}</a>
                    </p>;
                })}
                {(!directions.route)
                    ? <p></p>
                    : <div>
                        <h3>Route</h3>
                        <p>{directions.route.summary}</p>
                    </div>
                }
            </div>
        }

    </div>
);

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default InfoView;
