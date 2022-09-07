import axios from "axios";
import { useState, useEffect } from "react";
import '../../App.css'
import { Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import



export default function AddBrand() {

  const [Name, setbrandName] = useState('');

  const [brands, setBrands] = useState([]);

  const fetchBrand = () => {
    axios.get('http://localhost:64082/api/brand/getall')
      .then(response => {
        setBrands(response.data)

      }).catch(error => {
        return alert("Error: " + error);
      })

  }


  const deleteBrand = (id) => {

    axios.post(`http://localhost:64082/api/brand/delete/${id}`)
      .then(() => {
        fetchBrand()

      }).then(()=>{
        window.alert("brand deleted.")
      })
      .catch(error => {
        return alert("Error: " + error);
      })
  }


  useEffect(() => {
    fetchBrand()

  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "post",
        url: " http://localhost:64082/api/brand/add",
        data: {
          Name
        }
      }).then(()=>{
        fetchBrand()
      });
      return alert("Success!");
    } catch (error) {
      return alert("Error: " + error);
    }
  };


  function handleShow(id){

    confirmAlert({
        title: 'WARNING!',
        message: 'Are you sure to delete brand!',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteBrand(id)
          },
          {
            label: 'No',
            
          }
        ]
      });
}


  return (


    <div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>brand</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand) => (

            <tr>
              <td>{brand.name}</td>

              <td>
                <Link to={`/UpdateBrand/${brand.brandId}`}>
                  <button className="btn btn-warning" variant="primary" >
                    edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShow(brand.brandId)}
                >
                  delete
                </button>
              </td>
            </tr>

          ))}


        </tbody>
      </table>



      <div className="space">


        <div className="create">
          <h2>Add a New Brand</h2>
          <form onSubmit={handleSubmit}>
            <label>Brand Name:</label>
            <input
              type="text"
              required
              value={Name}
              placeholder="please enter Brand name..."
              onChange={(e) => setbrandName(e.target.value)}
            />



            <button>Add Brand</button>
          </form>
        </div>

      </div>

    </div>
  )


}