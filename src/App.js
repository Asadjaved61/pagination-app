import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./container/BookList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={BookList}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
