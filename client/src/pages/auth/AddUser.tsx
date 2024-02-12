import React, { useState } from "react";
import { toast } from "react-toastify";
import custom_axios from "../../axios/AxiosSetup";

function AddUser() {
  const [firstName, setNom] = useState("");
  const [lastName, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    custom_axios
      .post(
        "/user/signUp",
        JSON.stringify({ firstName, lastName, email, password, role })
      )
      .then(() => {
        toast.success("Ajoute Utilisateur Success !!", {
          position: "bottom-left",
        });
      });
  };
  const handleSelect = (e: any) => {
    setRole(e.target.value);
  };

  return (
    <div className="bg-gray-200 w-full mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-center text-3xl font-bold leading-6 text-gray-900 mt-10">
              Enregistrez Les informations Sur Un Utilisateur:
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-4 md:mt-18">
          <form onSubmit={submitHandler}>
            <div className="overflow-hidden shadow text-black sm:rounded-md">
              <div className="m-2 rounded-2xl shadow border-dashed border-4 border-teal-500 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="font-bold text-xl block text-gray-700"
                    >
                      Nom:
                    </label>
                    <input
                      type="text"
                      name="nom"
                      autoComplete="given-name"
                      className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="last-name"
                      className="font-bold text-xl block text-gray-700"
                    >
                      Prenom:
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      autoComplete="family-name"
                      className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <label
                      htmlFor="email-address"
                      className="font-bold text-xl block text-gray-700"
                    >
                      Email:
                    </label>
                    <input
                      type="text"
                      name="email"
                      autoComplete="email"
                      className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="street-address"
                      className="font-bold text-xl block text-gray-700"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="street-address"
                      className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="w-72 mt-6">
                    <select value={role} onChange={handleSelect}>
                      <option value="ADMIN">Admin</option>
                      <option value="NORMAL_USER_ROLE">No-Admin</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
