import React from 'react';
import ReactDOM from 'react-dom';

import { News } from '../news.jsx'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.props.base_url = drupalSettings.init_partial_decoupled.CurrentBaseUrl;
    }

    render(){
        return (
          <div>
              <News baseUri={this.props.base_url} />
          </div>
        );
    }
}
var process = {env : {NODE_ENV: 'production'}};

ReactDOM.render(<App/>, window.document.getElementById('app-root'));


