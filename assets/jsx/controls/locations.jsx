import React, { PropTypes } from 'react';


const Locations = ({home, work, onChange}) => (
    <div className="controls">
        <p>
            <label>Home2</label>
            <datalist id="home_suggestions">
                {home.suggestions.map(suggestion => {
                    return <option value={suggestion} />;
                })}
            </datalist>
            <input type="text" name="home" list="home_suggestions" value={home.address} onChange={(e) => onChange(e.target.value, 'home')}/>
        </p>
        <p>
            <label>Work</label>
            <input type="text" name="work" list="location_suggestions" value={work.address} onChange={(e) => onChange(e.target.value, 'work')}/>
        </p>
    </div>
);

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default Locations;
