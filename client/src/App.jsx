import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage.jsx';
import OtdPage from './Pages/OtdPage.jsx';
import { HistoryProvider } from "./Contexts/HistoryContext.jsx"
import { DateSelectProvider } from './Contexts/DateSelectContext.jsx';

function App() {
  console.log("app render")
  return (
      <div className="App">
        <Router>
          <HistoryProvider>
          <DateSelectProvider>  
              <Routes>
                <Route exact path="/otdih" element={<WelcomePage />} />
                <Route path="/otdih/today" element={<OtdPage />} />
                <Route path="/otdih/:month/:day" element={<OtdPage />} />
              </Routes>
          </DateSelectProvider> 
          </HistoryProvider>
        </Router>
      </div>
  );
}

export default App;