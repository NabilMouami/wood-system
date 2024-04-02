import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { PostBoisRouge } from "../../../models/bois/BoisRouge";
import ListLongLarg from "./ListLongLarg";
import custom_axios from "../../../axios/AxiosSetup";

const AddBoisRouge: React.FC = () => {
  const [serviceList, setServiceList] = useState([{ long: 0, piece: 0 }]);

  const [post, setPost] = useState<PostBoisRouge>({
    type: "",
    marque: "",
    fornisseur: "",
    n_fardou: "",
    epaisseur: 0,
    larg: 0,
    pieces: 0,
    metre_lineare: 0,
    prix_unity: 0,
    volume: 0,
    long_moyenne: 0,
    quality: "",
    date_creation: "",
    long: 0,
    piece: 0,
  });
  const handleServiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list: any = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { long: 0, piece: 0 }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    custom_axios
      .post("stock/boisrouge", post, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Ajoute Success De Bois Rouge!!", {
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
                Enregistrez Le Detail De Produit:
                <span className="ml-3 underline text-red-500 font-bold">
                  Bois Rouge
                </span>
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-4 md:mt-18">
            <form onSubmit={submitHandler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="border-dashed border-4 border-teal-500 text-2xl bg-white ml-4 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Le Type De Bois Rouge:
                      </label>
                      <input
                        type="text"
                        name="type"
                        defaultValue={post.type}
                        placeholder="Type"
                        className=" w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        La Marque:
                      </label>
                      <input
                        type="text"
                        name="marque"
                        placeholder="Marque:"
                        defaultValue={post.marque}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Quality:
                      </label>
                      <input
                        type="text"
                        name="quality"
                        placeholder="La qualite:"
                        defaultValue={post.quality}
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
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
                        placeholder="Bum De Fardou:"
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
                        name="prix_unity"
                        placeholder="Le Prix Dh:"
                        defaultValue={post.prix_unity}
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
                        Longueur Moyenne/M:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="long_moyenne"
                        placeholder="Long Moyene En Fardou:"
                        defaultValue={post.long_moyenne}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Metre Lineare:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="metre_lineare"
                        placeholder="Metre Lin En Fardou:"
                        defaultValue={post.metre_lineare}
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
                        placeholder="Larg:"
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
                  <h3 className="font-bold m-3">
                    Ajoute les Longueurs avec leur Nombre De Pieces En Fardou:
                  </h3>

                  <div className="form-field">
                    {serviceList.map((singleService, index) => (
                      <div key={index} className="services">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-2">
                            <label className="block text-xl font-bold text-gray-700">
                              Longueur:
                            </label>

                            <input
                              name="long"
                              type="number"
                              id="long"
                              value={singleService.long}
                              className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xl font-bold text-gray-700">
                              Piece:
                            </label>

                            <input
                              name="piece"
                              type="number"
                              id="piece"
                              value={singleService.piece}
                              className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>

                          {serviceList.length - 1 === index && (
                            <button
                              type="button"
                              onClick={handleServiceAdd}
                              className="add-btn"
                            >
                              <span>Ajoute</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
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

export default AddBoisRouge;
