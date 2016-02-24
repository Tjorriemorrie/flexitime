import React, { PropTypes } from 'react';
import LocationsContainer from './controls/locationsContainer.jsx';
import Viz from './Viz.jsx';


const Home = () => (
    <div className="main_page">
        <LocationsContainer />
        <Viz />
    </div>
);

Home.propTypes = {
  //onClick: PropTypes.func.isRequired,
  //completed: PropTypes.bool.isRequired,
  //text: PropTypes.string.isRequired
};

export default Home;
