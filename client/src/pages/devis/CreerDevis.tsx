import React, { useRef, useState, useEffect, Fragment } from "react";
import SelectOpt from "react-select";
import { GetClient } from "../../models/client/Client";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetBon } from "../../actions/action";
import custom_axios from "../../axios/AxiosSetup";
import { getLoginInfo } from "../../utils/LoginInfo";
interface NumFacture {
  max: number;
}
function CreerDevis() {
  const Bon = useSelector((state: any) => state.Bon);
  const { devis } = Bon;
  const userId = getLoginInfo()?.userId;
  const firstName = getLoginInfo()?.firstName;
  const lastName = getLoginInfo()?.lastName;
  const [listUsers, setListUsers] = useState<Array<GetClient>>([]);
  const [numFact, setNumFact] = useState<NumFacture>({ max: 1 });

  const [clientId, setClientId] = useState<number>();
  const [clientName, setClientName] = useState<string>("");
  const [dateCreation, setDateCreation] = useState<string>("");
  const [totalBon, setTotalBon] = useState<number>(0);
  const [reglement, setReglement] = useState("espece");
  const [remise, setRemise] = useState(1);
  const [tva, setTva] = useState(0.2);

  const dispatch = useDispatch();
  const componentRef1: any = useRef();

  const handlePrint = () => {
    window.print();
  };
  const handleAfterPrint = React.useCallback(() => {
    dispatch(resetBon() as any); // tslint:disable-line no-console
  }, []);

  function toPrecision(num: number, precision: number) {
    num = Math.trunc(num * 10 ** precision) / 10 ** precision;
    return num;
  }
  const handleSelectRemise = (e: any) => {
    setRemise(e.target.value);
  };
  const handleSelectTva = (e: any) => {
    setTva(e.target.value);
  };

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

  useEffect(() => {
    custom_axios
      .get("/clients", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListUsers(res.data);
      });
  }, []);
  useEffect(() => {
    custom_axios
      .get("/devis/lastid/NumDev", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setNumFact(res.data);
      });
  }, []);
  const selOptions = [];
  // var test = [...new Set(projectsList)];
  // console.log("after: " + test);

  const ids = listUsers?.map((o) => o.fullName);
  const filtered = listUsers?.filter(
    ({ fullName }, index) => !ids.includes(fullName, index + 1)
  );

  for (var i = 0; i < filtered.length; i++) {
    var obj: any = {};
    if (filtered.length > 0) {
      obj["id"] = filtered[i].idclient;
      // obj["date"] = projectsList[i].date;
      obj["value"] = filtered[i].fullName;
      obj["label"] = filtered[i].fullName;
    }
    selOptions.push(obj);
  }
  const handle = (e: any) => {
    setClientId(e.id);
    setClientName(e.value);
  };

  const handleSelectRegl = (e: any) => {
    setReglement(e.target.value);
  };
  const handleSubmitBon = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      toast.error("Choisissez Le Client !!");
    }
    const data2 = {
      reglement: reglement,
      remise: remise,
      tva: tva,
      date_creation: dateCreation,
    };
    console.log(data2);
    custom_axios
      .post(`/devis/${userId}/${clientId}`, data2, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Success Devis!!");
      });
  };
  return (
    <div className="bg-[#E6E6FA] font-sans">
      <Typography variant="h1" color="blue-gray" className="text-center">
        Creation Devis Pour Un Client.
      </Typography>
      <form
        onSubmit={handleSubmitBon}
        className="bg-white rounded-2xl m-8 p-5 flex justify-between items-center"
      >
        <div className="projects">
          <span className="font-bold text-xl mr-2">Selectez Client :</span>
          <SelectOpt
            className="selOptions"
            options={selOptions}
            onChange={handle}
          />
        </div>
        <div className="projects">
          <label className="font-bold text-xl mr-2">Date Creation:</label>
          <input
            className="p-3"
            type="date"
            placeholder="date bon"
            onChange={(e) => {
              setDateCreation(e.target.value);
            }}
          />
        </div>

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-10 m-5">
        <ReactToPrint
          trigger={() => (
            <button
              className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
              onClick={() => handlePrint()}
            >
              Print / Download
            </button>
          )}
          content={() => componentRef1.current}
          onAfterPrint={handleAfterPrint}
        />
      </div>
      <div className="bg-white p-5 rounded">
        <div ref={componentRef1} className="p-5">
          <Typography
            variant="h3"
            color="red"
            className="text-center underline"
          >
            Devis:
          </Typography>

          <div className="flex items-center justify-around">
            <img
              src="/dazizwood.jpg"
              alt="logo-sarl"
              className="object-cover"
              width="100"
              height="100"
            />
            <div>
              <Typography color="blue" className="text-center">
                Ste Dazizwood Sarl.
              </Typography>
              <Typography color="black" className="text-center">
                Import et Ventes des bois et sont composition.
              </Typography>
              <Typography color="gray" className="text-center">
                N371,rue Mekness,Hay Salam ,Tel: ....., Email:bois@gmail.com.
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-centers p-4 m-4 rounded-2xl bg-slate-200">
            <div className="flex flex-col gap-7 mb-2">
              <p>
                <span className="font-bold underline">Commerciel:</span>{" "}
                {firstName} {lastName}
              </p>
              <p>
                <span className="font-bold underline">Client:</span>
                {clientName}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Date Creation:</span> {dateCreation}
              </p>
              <p>
                <span className="font-bold">Devis Nº:</span> {numFact?.max + 1}
              </p>
            </div>
          </div>
          <table width="100%" className="mb-10">
            <thead>
              <tr className="bg-gray-100 p-1">
                <td className="font-bold">Type</td>
                <td className="font-bold">Designation</td>
                <td className="font-bold">Pieces</td>
                <td className="font-bold">Long</td>
                <td className="font-bold">Quantity</td>
                <td className="font-bold">Prix Unite TTC</td>
                <td className="font-bold">Montant</td>
              </tr>
            </thead>
            {devis?.map(
              ({
                classbois,
                type,
                pieces,
                long,
                prix_unity,
                quantity,
                unity,
                prix_total,
              }: any) => (
                <Fragment>
                  <tbody>
                    <tr className="h-8 font-bold">
                      <td>{classbois}</td>
                      <td>{type}</td>
                      <td>{pieces}</td>
                      <td>{long}</td>
                      <td>
                        {toPrecision(quantity, 2)} {unity}
                      </td>
                      <td>{prix_unity}</td>
                      <td className="amount1">{toPrecision(prix_total, 2)}</td>
                    </tr>
                  </tbody>
                </Fragment>
              )
            )}
          </table>
          <hr className="text-black w-full" />

          <div>
            <h2 className="flex items-end justify-end text-gray-800 text-xl font-bold">
              Total Brut: {totalBon.toLocaleString()} Dh.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreerDevis;
