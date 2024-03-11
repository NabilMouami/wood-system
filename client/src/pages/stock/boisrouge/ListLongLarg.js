import React from 'react'

function ListLongLarg({serviceList,setServiceList,handleChange,post,setPost}) {
    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
        setPost({
          ...post,
          [name]: value,
        });
    
      };
    
      const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
      };
    
      const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
      };
    
  return (
    <form>
                <h3 className="font-bold m-3">Ajoute les Longueurs avec leur Nombre De Pieces En Fardou:</h3>

      <div className="form-field">

        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="grid grid-cols-6 gap-6">

            <div className="col-span-2">
                    <label
                      className="block text-xl font-bold text-gray-700"
                    >
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
                    <label
                      className="block text-xl font-bold text-gray-700"
                    >
                      Piece:
                    </label>

                <input
                name="larg"
                type="number"
                id="larg"
                value={singleService.larg}
                className=" w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"

                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              </div>

              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Ajoute</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  )
}

export default ListLongLarg
