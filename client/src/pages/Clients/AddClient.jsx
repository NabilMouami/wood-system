import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import custom_axios from "../../axios/AxiosSetup";

function AddClient() {
  const [post, setUser] = useState({
    fullname: "",
    phone: "",
    ville: "",
    adresse: "",
    cne: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...post,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    custom_axios
      .post("/clients/client", JSON.stringify(post), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Ajoute Client Success !!", {
          position: "bottom-left",
        });
      });
  };

  return (
    <Fragment>
      <div className="bg-gray-200 w-full mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-center text-3xl font-bold leading-6 text-gray-900 mt-10">
                Enregistrez L'information Sur Un Client.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-4 md:mt-18">
            <form onSubmit={submitHandler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="m-2 rounded-2xl shadow border-dashed border-4 border-teal-500 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="font-bold text-xl block text-gray-700"
                      >
                        Le Nom Complete:
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        defaultValue={post.fullname}
                        autoComplete="given-name"
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="font-bold text-xl block text-gray-700"
                      >
                        Le Num Telephone:
                      </label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Telephone:"
                        defaultValue={post.phone}
                        autoComplete="family-name"
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="email-address"
                        className="font-bold text-xl block text-gray-700"
                      >
                        La Ville:
                      </label>
                      <input
                        type="text"
                        name="ville"
                        placeholder="La Ville:"
                        defaultValue={post.ville}
                        autoComplete="email"
                        className="  w-full px-4  py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="street-address"
                        className="font-bold text-xl block text-gray-700"
                      >
                        Adresse:
                      </label>
                      <input
                        type="text"
                        name="adresse"
                        placeholder="Adresse Dans La Ville:"
                        defaultValue={post.adresse}
                        autoComplete="street-address"
                        className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="street-address"
                        className="font-bold text-xl block text-gray-700"
                      >
                        Carte National Identifiant:
                      </label>
                      <input
                        type="text"
                        name="cne"
                        placeholder="Cne:"
                        defaultValue={post.cne}
                        autoComplete="street-address"
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
                      Save
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
}

export default AddClient;
