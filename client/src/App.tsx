import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Actions from "./components/Actions";
import Header from "./components/Header";
import List from "./components/List";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Actions />} />
          <Route path="/list" element={<List />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
