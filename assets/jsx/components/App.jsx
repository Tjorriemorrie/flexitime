import React from 'react';

require("normalize.css");
require("./../../less/main.less");

            //'api_key': 'AIzaSyAbmf11zMmjPhRaPXnfVJq1JDiMWrMj4N0'

class App extends React.Component {

    render() {
        console.info('[App] render');
        return <div>
            {React.cloneElement(this.props.children, {})}
        </div>;
    }
}

export default App;
