import React, { PureComponent } from 'react';
import TopBar from './components/topBar';
import SavedTournaments from './components/content/savedTournaments';

import "./styles.scss";

class App extends PureComponent{
    render() {
        return (
            <div className="main-content">
                <TopBar/>
                <main>
                    <SavedTournaments/>
                </main>
            </div>
    );
    }
}

export default App;