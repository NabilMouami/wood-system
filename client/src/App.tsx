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
import AddBoisBlanc from "./pages/stock/boisblanc/AddBoisBlanc";
import ListBoisBlanc from "./pages/stock/boisblanc/ListBoisBlanc";
import UpdBoisBlanc from "./pages/stock/boisblanc/UpdBoisBlanc";
import AddBoisDur from "./pages/stock/boisdur/AddBoisDur";
import ListBoisDur from "./pages/stock/boisdur/ListBoisDur";
import CreerfctBL from "./pages/facture/CreerfctBL";
import CreerfctBD from "./pages/facture/CreerfctBD";
import CreerFacture from "./pages/facture/CreerFacture";
import ListContrePlaque from "./pages/stock/contreplaque/ListContrePlaque";
import AddContrePlaque from "./pages/stock/contreplaque/AddContrePlaque";
import CreerfctCP from "./pages/facture/CreerfctCP";
import AddBoisRouge from "./pages/stock/boisrouge/AddBoisRouge";
import ListBoisRouge from "./pages/stock/boisrouge/ListBoisRouge";
import ListPann from "./pages/stock/panneau/ListPann";
import AddPann from "./pages/stock/panneau/AddPann";
import UpdPanneau from "./pages/stock/panneau/UpdPanneau";
import CreerfctPN from "./pages/facture/CreerfctPN";
import ListDevis from "./pages/devis/ListDevis";
import CreerdevBD from "./pages/devis/CreerdevBD";
import CreerDevis from "./pages/devis/CreerDevis";
import CreerdevBL from "./pages/devis/CreerdevBL";
import CreerdevCP from "./pages/devis/CreerdevCP";
import CreerdevPN from "./pages/devis/CreerdevPN";
import ListFacture from "./pages/facture/ListFacture";
import UpdBoisDur from "./pages/stock/boisdur/UpdBoisDur";
import CreerfctBR from "./pages/facture/CreerfctBR";
import CreerfsctBRFardou from "./pages/facture/CreerfctBRFardou";
import UpdContrePlaque from "./pages/stock/contreplaque/UpdContrePlaque";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdBoisRouge from "./pages/stock/boisrouge/UpdBoisRouge";
import CreerblvBD from "./pages/bonlivr/CreerblvBD";
import CreerBonLivr from "./pages/bonlivr/CreerBonLivr";
import ListBonLivrs from "./pages/bonlivr/ListBonLivrs";
import CreerblvBL from "./pages/bonlivr/CreerblvBL";
import CreerblvCP from "./pages/bonlivr/CreerblvCP";
import CreerblvPN from "./pages/bonlivr/CreerblvPN";
import CreerblvBR from "./pages/bonlivr/CreerblvBR";
import CreerblvBRFardou from "./pages/bonlivr/CreerblvBRFardou";
import CreerdevBRFardou from "./pages/devis/CreerdevBRFardou";
import CreerdevBR from "./pages/devis/CreerdevBR";

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
          <Route path="statistics" element={<Dashboard />} />
          <Route path="users" element={<ListUsers />} />
          <Route path="ajoute-user" element={<AddUser />} />
          <Route path="changer-user/:id" element={<UpdUser />} />
          //Clients
          <Route path="clients" element={<ListClients />} />
          <Route path="ajoute-client" element={<AddClient />} />
          <Route path="client/:id" element={<UpdClient />} />
          //BoisBlanc:Stock
          <Route path="/ajoute-boisblanc" element={<AddBoisBlanc />} />
          <Route path="/list-boisblanc" element={<ListBoisBlanc />} />
          <Route path="/changer-boisblanc/:id" element={<UpdBoisBlanc />} />
          //BoisDur:Stock
          <Route path="/ajoute-boisdur" element={<AddBoisDur />} />
          <Route path="/list-boisdur" element={<ListBoisDur />} />
          <Route path="/changer-boisdur/:id" element={<UpdBoisDur />} />
          //BoisRouge:Stock
          <Route path="/ajoute-boisrouge" element={<AddBoisRouge />} />
          <Route path="/list-boisrouge" element={<ListBoisRouge />} />
          <Route path="/changer-boisrouge/:id" element={<UpdBoisRouge />} />
          //ContrePlaque:Stock
          <Route path="/ajoute-contre-plaque" element={<AddContrePlaque />} />
          <Route path="/list-contreplaques" element={<ListContrePlaque />} />
          <Route
            path="/changer-contreplaque/:id"
            element={<UpdContrePlaque />}
          />
          //Panneau:Stock
          <Route path="/ajoute-panneau" element={<AddPann />} />
          <Route path="/list-panneaux" element={<ListPann />} />
          <Route path="/changer-panneau/:id" element={<UpdPanneau />} />
          //Factures
          <Route path="/list-factures" element={<ListFacture />} />
          <Route path="/creer-facture" element={<CreerFacture />} />
          <Route path="/creer-fct-BL" element={<CreerfctBL />} />
          <Route path="/creer-fct-BD" element={<CreerfctBD />} />
          <Route path="/creer-fct-BR" element={<CreerfctBR />} />
          <Route path="/creer-fct-BR/fardou" element={<CreerfsctBRFardou />} />
          <Route path="/creer-fct-CP" element={<CreerfctCP />} />
          <Route path="/creer-fct-PN" element={<CreerfctPN />} />
          //Bon Livraison
          <Route path="/list-bonlivraison" element={<ListBonLivrs />} />
          <Route path="/creer-bonlivraison" element={<CreerBonLivr />} />
          <Route path="/creer-blv-BD" element={<CreerblvBD />} />
          <Route path="/creer-blv-BL" element={<CreerblvBL />} />
          <Route path="/creer-blv-BR" element={<CreerblvBR />} />
          <Route path="/creer-blv-BR/fardou" element={<CreerblvBRFardou />} />
          <Route path="/creer-blv-CP" element={<CreerblvCP />} />
          <Route path="/creer-blv-PN" element={<CreerblvPN />} />
          //Devis
          <Route path="/list-devis" element={<ListDevis />} />
          <Route path="/creer-dev-BD" element={<CreerdevBD />} />
          <Route path="/creer-dev-BL" element={<CreerdevBL />} />
          <Route path="/creer-dev-BR" element={<CreerdevBR />} />
          <Route path="/creer-dev-BR/fardou" element={<CreerdevBRFardou />} />
          <Route path="/creer-dev-CP" element={<CreerdevCP />} />
          <Route path="/creer-dev-PN" element={<CreerdevPN />} />
          <Route path="/creer-devis" element={<CreerDevis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
