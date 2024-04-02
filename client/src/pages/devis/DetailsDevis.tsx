import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import custom_axios from "../../axios/AxiosSetup";

function DetailsDevis() {
  const Detail = useSelector((state: any) => state.Load);
  const { Col } = Detail;
  const [listProd, setListProd] = useState([]);
  const [totalBon, setTotalBon] = useState(0);
  useEffect(() => {
    custom_axios
      .get(`/devis/${Col.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListProd(res.data);
      });
  }, []);

  useEffect(() => {
    let rows = document.querySelectorAll(".amount1");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount1") {
        sum += parseInt(rows[i].innerHTML);
        setTotalBon(sum);
      }
    }
  });

  function toPrecision(num: number, precision: number) {
    num = Math.trunc(num * 10 ** precision) / 10 ** precision;
    return num;
  }

  return (
    <div className="bg-[#E6E6FA]">
      <Typography variant="h3" color="red" className="text-center underline">
        Devis:
      </Typography>

      <div className="flex items-center justify-around">
        <img
          src="/novacsarl.png"
          alt="logo-sarl"
          className="object-cover"
          width="100"
          height="100"
        />
        <div>
          <Typography color="blue" className="text-center">
            Ste Nova Sarl.
          </Typography>
          <Typography color="black" className="text-center">
            Import et Ventes des bandes de chants.
          </Typography>
          <Typography color="gray" className="text-center">
            N371,rue Fes,Hay Salam ,Tel: ....., Email:novasarl@gmail.com.
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-centers p-4 m-4 rounded-2xl bg-slate-200">
        <div className="flex flex-col gap-7 mb-2">
          <p>
            <span className="font-bold underline">Commerciel:</span>{" "}
            {Col.firstName} {Col.lastName}
          </p>
          <p>
            <span className="font-bold underline">Client:</span>
            {Col.clientName}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Date Creation:</span>{" "}
            {Col.date_creation}
          </p>
          <p>
            <span className="font-bold">Devis Nº:</span> {Col.id}
          </p>
        </div>
      </div>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Designation</td>
            <td className="font-bold">Pieces</td>
            <td className="font-bold">Long</td>
            <td className="font-bold">Larg</td>
            <td className="font-bold">Epaisseur</td>
            <td className="font-bold">Prix Unite TTC</td>
            <td className="font-bold">Montant</td>
          </tr>
        </thead>
        {listProd?.map(
          ({ designation, qte, long, larg, ep, prix_ht, montant_ht }: any) => (
            <Fragment>
              <tbody>
                <tr className="h-8 font-bold">
                  <td>{designation}</td>
                  <td>{qte}</td>
                  <td>{long}</td>
                  <td>{larg}</td>
                  <td>{ep}</td>
                  <td>{prix_ht}</td>
                  <td>{montant_ht}</td>
                </tr>
              </tbody>
            </Fragment>
          )
        )}
      </table>
    </div>
  );
}

export default DetailsDevis;
