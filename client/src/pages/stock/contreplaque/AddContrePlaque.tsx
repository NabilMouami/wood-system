import React, { useState } from "react";
import { toast } from "react-toastify";
import { PostContrePlaque } from "../../../models/bois/ContrePlaque";
import custom_axios from "../../../axios/AxiosSetup";

const AddContrePlaque: React.FC = () => {
  const [post, setUser] = useState<PostContrePlaque>({
    type: "",
    marque: "",
    fornisseur: "",
    face: "",
    pieces: 0,
    long: 0,
    larg: 0,
    epaisseur: 0,
    prix_unity: 0,
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
    custom_axios
      .post("/stock/contre-plaque", JSON.stringify(post), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Ajoute Success De Contre Plaque!!", {
          position: "top-right",
        });
      });
  };
  return (
    <div className="flex flex-row gap-10">
      <div className="w-full bg-gray-300 m-8 rounded-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-center text-4xl mt-5 font-bold leading-6 text-teal-500">
                Enregistrez Le Detail De Produit:
                <span className="ml-3 underline text-blue-500 font-bold">
                  Contre Plaque
                </span>
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-4 md:mt-18">
            <form onSubmit={submitHandler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="border-dashed border-4 border-blue-500 text-2xl bg-white ml-4 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Le Type De Contre Plaque:
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
                        Face:
                      </label>
                      <input
                        type="text"
                        name="face"
                        placeholder="Face:"
                        defaultValue={post.face}
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
                        placeholder="Nombre Piece:"
                        defaultValue={post.pieces}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Longueur/M:
                      </label>
                      <input
                        type="number"
                        step="any"
                        name="long"
                        placeholder="Long:"
                        defaultValue={post.long}
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xl font-bold text-gray-700">
                        Largeur/M:
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
    </div>
  );
};

export default AddContrePlaque;
