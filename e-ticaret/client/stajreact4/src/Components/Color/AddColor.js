import axios from "axios"
import { useState, useEffect} from "react";
import '../../Css/Space.css'
import '../../App.css'
import { Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import


export default function AddColor() {


  const [Name, setcolorName] = useState('');

  const [colors, setColors] = useState([]);

  const fetchColor = () => {
    axios.get('http://localhost:64082/api/color/getall')
      .then(response => {
        setColors(response.data)

      }).catch(error => {
        return alert("Error: " + error);
      })

  }



  useEffect(() => {
    fetchColor()

  }, [])



  const deleteColor = (id) => {

    axios.post(`http://localhost:64082/api/color/delete/${id}`)
      .then(() => {
        fetchColor()

      }).catch(error => {
        return alert("Error: " + error);
      })
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "post",
        url: "http://localhost:64082/api/color/add",
        data: {
          Name
        }
      }).then(() => {
        fetchColor()
      });
      return alert("Success!");
    } catch (error) {
      return alert("Error: " + error);
    }
  };



  function handleShow(id){

    confirmAlert({
        title: 'WARNING!',
        message: 'Are you sure to delete color!',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteColor(id)
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
            <th>color</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {colors.map((color) => (

            <tr>
              <td>{color.name}</td>

              <td>
                <Link to={`/UpdateColor/${color.colorId}`}>
                  <button className="btn btn-warning" variant="primary" >
                    edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShow(color.colorId)}
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
          <h2>Add a New Color</h2>
          <form onSubmit={handleSubmit}>
            <label>color Name:</label>
            <input
              type="text"
              required
              value={Name}
              placeholder="please enter color name..."
              onChange={(e) => setcolorName(e.target.value)}
            />



            <button>Add Color</button>
          </form>
        </div>
      </div>
    </div>
  )

}