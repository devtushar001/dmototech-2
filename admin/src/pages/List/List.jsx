import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(list)

  const fetchList = async () => {
    try {
      const response = await fetch(`${url}/api/accessory/list`);
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      if (result.success) {
        toast.success(response.message);
        setList(result.data); 
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);


 const removeAccessory = async (accessoryId) => {

      try {
        const response = await fetch(`${url}/api/accessory/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: accessoryId }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
        
    } catch (err) {
      toast.error(err)
    }
    await fetchList();
 } 


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, i)=>{
            return (
              <>
               <div key={i} className="list-table-format">
                   {/* <img src={`${url}/images/`+item.images.mainImage} alt="" className="image"/> */}
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>{item.price.newPrice}</p>
                   <p title="Remove Product" className="cursor" onClick={()=>removeAccessory(item._id)}>X</p>
               </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default List;
