import React, { PropTypes } from 'react';
import LocationsContainer from './container/locations.jsx';
import InfoContainer from './container/info.jsx';
import TimingsContainer from './container/timings.jsx';


const Home = () => (
    <div className="main_page">
        <LocationsContainer />
        <InfoContainer />
        <TimingsContainer />
    </div>
);

Home.propTypes = {
  //onClick: PropTypes.func.isRequired,
  //completed: PropTypes.bool.isRequired,
  //text: PropTypes.string.isRequired
};

export default Home;
