import React from 'react'
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header.jsx';
import CurrenciesRate from './components/CurrenciesRate';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className='mh-70 mw-100' >
          <div className='row d-flex flex-row flex-nowrap'>
            <div className='col-xsm m-0 text-center '>
              <Sidebar />
            </div>
            <div className='col sticky-top' >
              <Switch>
                <Route exact path='/:currency' component={CurrenciesRate} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>

    </>
  );
}

export default App;
