import React from "react";
import RegisterPayment from "./components/RegisterPayment";
import ViewPayments from "./components/ViewPayments";

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">ParcialT2</a>
        </div>
      </nav>
      <div className="container">
        <RegisterPayment />
        <hr />
        <ViewPayments />
      </div>
    </div>
  );
}

export default App;