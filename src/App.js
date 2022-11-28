import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SnackBarContainer from "./component/common/Snackbar";
import QueuesView from "./pages/Queues";

function App() {
  return (
    <>
      <SnackBarContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<QueuesView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
