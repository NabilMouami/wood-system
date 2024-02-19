import React, { useState, Fragment } from "react";

import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { GetBoisBlanc } from "../../../models/bois/BoisBlanc";
import custom_axios from "../../../axios/AxiosSetup";

function UpdBoisBlanc() {
  const Detail = useSelector((state: any) => state.Load);
  const { Col } = Detail;
  const [marque, setMarque] = useState(Col.marque);
  const [fornisseur, setFor] = useState(Col.fornisseur);
  const [n_fardou, setNumFard] = useState(Col.n_fardou);
  const [pieces, setPieces] = useState(Col.pieces);
  const [long, setLong] = useState(Col.long);
  const [larg, setLarg] = useState(Col.larg);
  const [epaisseur, setEp] = useState(Col.epaisseur);
  const [volume, setVolume] = useState(Col.volume);
  const [prix_unity, setPrix] = useState(Col.prix_unity);
  const [date_creation, setDateCreation] = useState(Col.date_creation);

  const post = {
    marque,
    fornisseur,
    n_fardou,
    pieces,
    long,
    larg,
    epaisseur,
    volume,
    prix_unity,
    date_creation,
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    custom_axios
      .put(`/stock/boisblanc/${Col.id}`, JSON.stringify(post), {
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
      <div className="w-full min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Bois Blanc Form
            </h2>
            <p className="text-gray-500 mb-6">
              Form Pour Changemet de(s) detail(s).
            </p>

            <div className="bg-white text-black rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Changer Details</p>
                  <p>De Bois Blanc {Col.marque}.</p>
                  <img
                    className="mt-4"
                    src="/images/bois-blanc.jpg"
                    alt="bois-blanc"
                    height="300"
                    width="250"
                  />
                </div>

                <div className="md:col-span-2">
                  <form
                    onSubmit={submitHandler}
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                  >
                    <div className="md:col-span-3">
                      <label>Marque:</label>
                      <input
                        type="text"
                        defaultValue={Col.marque}
                        onChange={(e) => setMarque(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Fornisseur</label>
                      <input
                        type="text"
                        defaultValue={Col.fornisseur}
                        onChange={(e) => setFor(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Fornisseur"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label>Num Fardou:</label>
                      <input
                        type="text"
                        defaultValue={Col.n_fardou}
                        onChange={(e) => setNumFard(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Num Fardou"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Pieces</label>
                      <input
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="number"
                        step="any"
                        defaultValue={Col.pieces}
                        onChange={(e) => setPieces(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Longueur:</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          placeholder="Long"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          type="number"
                          step="any"
                          defaultValue={Col.long}
                          onChange={(e) => setLong(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label>Largeur:</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          placeholder="Larg"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          type="number"
                          step="any"
                          defaultValue={Col.larg}
                          onChange={(e) => setLarg(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label>Epaisseur:</label>
                      <input
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="number"
                        step="any"
                        defaultValue={Col.epaisseur}
                        onChange={(e) => setEp(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Volume:</label>
                      <input
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="number"
                        step="any"
                        defaultValue={Col.volume}
                        onChange={(e) => setVolume(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>Prix Unite:</label>
                      <input
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="number"
                        step="any"
                        defaultValue={Col.prix_unity}
                        onChange={(e) => setPrix(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>Date Ajoutement:</label>
                      <input
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        type="date"
                        defaultValue={Col.date_creation}
                        onChange={(e) => setDateCreation(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdBoisBlanc;
