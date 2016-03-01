import React, { PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, SearchBox, DirectionsRenderer } from "react-google-maps";


class Locations extends React.Component {
    render() {
        let { home, work, directions, onChange } = this.props;
        return <div className="controls">

            <GoogleMapLoader
                containerElement={
                    <div
                        {...this.props}
                        style={{
                            height: '100%'
                        }} >
                    </div>
                }
                googleMapElement={
                    <GoogleMap
                        ref="map"
                        defaultZoom={15}
                        center={{
                            lat: 47.6205588,
                            lng: -122.3212725,
                        }}
                    >
                        <SearchBox
                            ref="searchBoxHome"
                            placeholder="Home"
                            controlPosition={google.maps.ControlPosition.TOP_LEFT}
                            onPlacesChanged={() => onChange(this.refs.searchBoxHome.getPlaces(), 'home')}
                        />
                        <SearchBox
                            ref="searchBoxWork"
                            placeholder="Work"
                            controlPosition={google.maps.ControlPosition.TOP_LEFT}
                            onPlacesChanged={() => onChange(this.refs.searchBoxWork.getPlaces(), 'work')}
                        />
                        {(directions.routes)
                            ? <DirectionsRenderer
                                directions={directions}
                                options={{hideRouteList: true}}
                            />
                            : null
                        }
                    </GoogleMap>
                }
            />
        </div>

    }
}

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default Locations;
