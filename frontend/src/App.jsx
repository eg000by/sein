import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ValueSelection from "./pages/ValueSelection";
import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import UserDashboard from "./pages/UserDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<UserDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-values" element={
                    <PrivateRoute>
                        <ValueSelection />
                    </PrivateRoute>
                } />

                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <UserDashboard />
                    </PrivateRoute>
                } />

                <Route path="/" element={
                    <PrivateRoute>
                        <UserDashboard />
                    </PrivateRoute>
                } />
      </Routes>
    </Router>
  );
}
