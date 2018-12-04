import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

const Index = () => {
  return (
    <div>
      Index
      {/* <a href="/dashboard">Go to dashboard</a> */}
      <Link to="/dashboard">Go to dashboard</Link>
    </div>
  );
};
const Dashboard = () => {
  return (
    <div>
      Dashboard
      {/* <a href="/">Go to main page</a> */}
      <Link to="/">Go to main page</Link>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;