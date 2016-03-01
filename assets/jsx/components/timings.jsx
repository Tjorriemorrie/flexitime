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
                    <th>Depart Home At</th>
                    <th>Sec saved</th>
                    <th>Depart Work At</th>
                    <th>Sec saved</th>
                    <th>Sec saved per min shifted</th>
                </tr>
            </thead>
            <tbody>
                {directions.map((timing, i) => {
                    return <tr key={"timing_" + i}>
                        <td>{timing.shift}</td>
                        <td>{moment(timing.dir_begin.request.drivingOptions.departureTime).format('HH:mm')}</td>
                        <td>{timing.dit_begin}</td>
                        <td>{moment(timing.dir_end.request.drivingOptions.departureTime).format('HH:mm')}</td>
                        <td>{timing.dit_end}</td>
                        <td>{Math.round(timing.value_per_unit)}</td>
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
