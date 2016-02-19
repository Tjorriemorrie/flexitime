import React from 'react';
require("./../less/main.less");


export default class App extends React.Component {

    render() {
        console.info('[App] render');
        return <div>
            {React.cloneElement(this.props.children, {})}
        </div>;
    }
}
