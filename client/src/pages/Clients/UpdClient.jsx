import React, { useState, Fragment } from "react";
import custom_axios from "../../axios/AxiosSetup";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { RiEdit2Fill } from "react-icons/ri";

function UpdClient() {
  const accessoire = useSelector((state) => state.Load);
  const { Col } = accessoire;

  const [fullName, setFullname] = useState(Col.fullName);
  const [phone, setPhone] = useState(Col.phone);

  const [ville, setVille] = useState(Col.ville);
  const [adresse, setAdresse] = useState(Col.adresse);
  const [cne, setCne] = useState(Col.cne);
  const post = { fullName, phone, ville, adresse, cne };
  const submitHandler = (e) => {
    e.preventDefault();
    custom_axios
      .put(`/clients/${Col.id}`, JSON.stringify({ ...post }), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Changement Success !!", {
          position: "bottom-left",
        });
      });
  };
  return (
    <Fragment>
      <div className="bg-white p-4 rounded-2xl">
        <Typography variant="h3" color="blue" className="text-center">
          Changer Les Informations De Client:{Col.fullName}
        </Typography>
        <form
          onSubmit={submitHandler}
          className="flex flex-column gap-10 m-10 p-7"
        >
          <TextField
            type="text"
            label="Nom Complete:"
            defaultValue={Col.fullName}
            onChange={(e) => setFullname(e.target.value)}
          />

          <TextField
            label="Telephone"
            type="text"
            defaultValue={Col.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            type="text"
            label="La Ville:"
            defaultValue={Col.ville}
            onChange={(e) => setVille(e.target.value)}
          />
          <TextField
            type="text"
            className="w-76"
            label="Adresse Dans Ville:"
            defaultValue={Col.adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <TextField
            type="text"
            label="Id Carte National"
            defaultValue={Col.cne}
            onChange={(e) => setCne(e.target.value)}
          />
          <Button type="submit" variant="contained" endIcon={<RiEdit2Fill />}>
            Changer
          </Button>
        </form>
      </div>
    </Fragment>
  );
}

export default UpdClient;
