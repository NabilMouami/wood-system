import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import SingleCard from "./SingleCard";
import { getLoginInfo } from "../../utils/LoginInfo";

const carObj = {
  title: "Total Clients",
  totalNumber: 750,
  icon: "bx bxs-book-bookmark",
};

const tripObj = {
  title: "Factures",
  totalNumber: 1697,
  icon: "bx bxs-book-bookmark",
};

const clientObj = {
  title: "Devis",
  totalNumber: "85k",
  icon: "bx bxs-book-bookmark",
};

const distanceObj = {
  title: "Produits",
  totalNumber: 2167,
  icon: "bx bxs-book-bookmark",
};
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getLoginInfo() == null) return navigate("/");
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
