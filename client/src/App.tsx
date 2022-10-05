import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import Actions from "./components/Actions";
import Header from "./components/Header";
import List from "./components/List";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <React.Suspense fallback={<h1 style={{ textAlign: "center", marginTop: "80px" }}>{t("loading")}</h1>}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Actions />} />
            <Route path="/list" element={<List />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer autoClose={8000} />
      </React.Suspense>
    </React.Fragment>
  );
}

export default App;
