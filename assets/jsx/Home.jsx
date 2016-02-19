import React from 'react';


export default class Home extends React.Component {

    render() {
        console.info('[Home] render');
        return <div className="main_page">
            main page

            <div className="controls">
                <p>controls</p>
            </div>
            <div className="viz">
                <p>viz</p>
            </div>
        </div>;
    }

}
