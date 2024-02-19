import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { PostBoisDur } from "../../../models/bois/BoisDur";
import custom_axios from "../../../axios/AxiosSetup";

const AddBoisDur: React.FC = () => {
  const [post, setUser] = useState<PostBoisDur>({
    marque: "",
    fornisseur: "",
    n_fardou: "",
    pieces: 0,
    long: 0,
    larg: 0,
    epaisseur: 0,
    volume: 0,
    prix_achat: 0,
    prix_vente: 0,
    date_creation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...post,
      [name]: value,
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(post));
    custom_axios
      .post("/stock/boisdur", JSON.stringify(post), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Ajoute Success De Bois Dur!!", {
          position: "top-right",
        });
      });
  };
  return (
    <Fragment>
      <div className="w-full bg-gray-300 m-8 rounded-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-center text-4xl mt-5 font-bold leading-6 text-teal-500">
                Enregistrez Le Detail De Bois:
                <span className="ml-3 underline text-yellow-500 font-bold">
                  Bois Dur
                </span>
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-4 md:mt-18">
            <form onSubmit={submitHandler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="border-dashed border-4 border-orange-900 text-2xl bg-white text-black ml-4 mb-5 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Le Type De Bois Dur:
                      </label>
                      <input
                        type="text"
                        name="marque"
                        defaultValue={post.marque}
                        placeholder="Type"
                        className=" w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Fornisseur:
                      </label>
                      <input
                        type="text"
                        name="fornisseur"
                        placeholder="Fornisseur:"
                        defaultValue={post.fornisseur}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        N-Fardou:
                      </label>
                      <input
                        type="text"
                        name="n_fardou"
                        placeholder="Num De Fardou:"
                        defaultValue={post.n_fardou}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Le Prix Unite:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="prix_achat"
                        placeholder="Le Prix Dh:"
                        defaultValue={post.prix_achat}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Le Prix Vente:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="prix_vente"
                        placeholder="Le Prix Dh:"
                        defaultValue={post.prix_vente}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Piece Total:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="pieces"
                        placeholder="Nbr En Fardou:"
                        defaultValue={post.pieces}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Volume:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="volume"
                        placeholder="Volume En Fardou:"
                        defaultValue={post.volume}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Long/m:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="long"
                        placeholder="Longueur:"
                        defaultValue={post.long}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Largeur/mm:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="larg"
                        placeholder="Larg:"
                        defaultValue={post.larg}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Epaisseur/mm:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="epaisseur"
                        placeholder="Ep:"
                        defaultValue={post.epaisseur}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Date:
                      </label>
                      <input
                        type="date"
                        name="date_creation"
                        defaultValue={post.date_creation}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBoisDur;
