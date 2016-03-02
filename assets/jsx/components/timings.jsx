import React, { PropTypes } from 'react';
import moment from 'moment';


const TimingsView = ({ directions }) => (
    <div className="timings">
        <h4>Timings</h4>
        {renderTable(directions)}
    </div>
);

const renderTable = (directions) => {
    if (directions) {
        return <table width="100%">
            <thead>
                <tr>
                    <th>Shift</th>
                    <th>Leave home at</th>
                    <th>Time to work</th>
                    <th>Leave work at</th>
                    <th>Time to home</th>
                    <th>v/u</th>
                </tr>
            </thead>
            <tbody>
                {directions.map((dir, i) => {
                    return <tr key={"timing_" + i}>
                        <td>{Math.round(dir.shift)} min</td>
                        <td>{moment(dir.dir_begin.request.drivingOptions.departureTime).format('HH:mm')}</td>
                        <td>{dir.dir_begin.routes[0].legs[0].duration_in_traffic.text}</td>
                        <td>{moment(dir.dir_end.request.drivingOptions.departureTime).format('HH:mm')}</td>
                        <td>{dir.dir_end.routes[0].legs[0].duration_in_traffic.text}</td>
                        <td>{Math.round(dir.vpu)}</td>
                    </tr>;
                })}
            </tbody>
        </table>;
    }

};

//Locations.propTypes = {
//    suggestions: PropTypes.arrayOf(PropTypes.string),
//    onChange: PropTypes.func.isRequired,
//};

export default TimingsView;
