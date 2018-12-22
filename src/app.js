import React, { PureComponent } from 'react';
import TopBar from './components/topBar';
import SavedTournaments from './components/savedTournaments';

import "./styles.scss";

class App extends PureComponent{
    render() {
        return (
            <div className="main-content">
                <TopBar/>
                <SavedTournaments/>
            </div>
        );
    }
}

export default App;