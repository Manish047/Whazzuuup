import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import JoinRoom from './components/JoinRoom/JoinRoom';
import Chat from './components/Chat/Chat';

const App = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={JoinRoom} />
          <Route exact path="/chat" component={Chat} />
          <Route path="/" render={() => <h1>404: Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
