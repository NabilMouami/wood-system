import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutAuth from "./layouts/LayoutAuth";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Pages auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
// Pages admin

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListUsers from "./pages/auth/ListUsers";
import AddUser from "./pages/auth/AddUser";
import UpdUser from "./pages/auth/UpdUser";
import ListClients from "./pages/Clients/ListClients";
import AddClient from "./pages/Clients/AddClient";
import UpdClient from "./pages/Clients/UpdClient";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={3000}
        position={"top-center"}
        hideProgressBar={true}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/olvide-password" element={<ForgetPassword />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="users" element={<ListUsers />} />
          <Route path="ajoute-user" element={<AddUser />} />
          <Route path="changer-user/:id" element={<UpdUser />} />
          //Clients
          <Route path="clients" element={<ListClients />} />
          <Route path="ajoute-client" element={<AddClient />} />
          <Route path="client/:id" element={<UpdClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
