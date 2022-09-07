import { UsedStateAddSchema } from "../../validations/UsedStateAddSchema"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import {useState,useEffect} from 'react'


export default function AddUsedState() {


  const [usedstatus, setUsedStatus] = useState([]);

  const fetchUsedStatus = () => {
    axios.get('http://localhost:64082/api/usingstatus/getall')
      .then(response => {
        setUsedStatus(response.data)

      }).catch(error => {
        return alert("Error: " + error);
      })

  }


  const deleteUsedStatus = (id) => {

    console.log(id)
    axios.post(`http://localhost:64082/api/usingstatus/delete/${id}`)
      .then(() => {
        fetchUsedStatus()

      }).then(() => {
        window.alert("using status deleted.")
      })
      .catch(error => {
        return alert("Error: " + error);
      })
  }


  useEffect(() => {
    fetchUsedStatus()

  }, [])

  function handleShow(id){

    confirmAlert({
        title: 'WARNING!',
        message: 'Are you sure to delete using state!',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteUsedStatus(id)
          },
          {
            label: 'No',
            
          }
        ]
      });
}

  const { handleSubmit, handleChange, values, errors, touched } =

    useFormik({

      initialValues: {

        usedStatus: ""
      },
      onSubmit: (values) => {


        axios.post('http://localhost:64082/api/usingstatus/add', values)
          .then((res) => {
            console.log(res)
            window.alert(`${values.usedStatus} state successfully added`)

          }).then(()=>{
              fetchUsedStatus()
          })
          .catch(error => {
            console.log(error)
            window.alert("something went wrong....")

          })

      },
      validationSchema: UsedStateAddSchema
    })

  return (


    <div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>using state</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {usedstatus.map((state) => (

            <tr>
              <td>{state.usedStatus}</td>

              <td>
                <Link to={`/UpdateUsedState/${state.usingStatusId}`}>
                  <button className="btn btn-warning" variant="primary" >
                    edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShow(state.usingStatusId)}
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
          <form onSubmit={handleSubmit}>
            <h2>Add a New Used State</h2>
            <input
              name='usedStatus'
              value={values.usedStatus}
              onChange={handleChange}
              placeholder="add using state"
            >
              {/* <option>yeni</option>
              <option>yeni gibi</option>
              <option>eski</option>
              <option>çok eski</option> */}



            </input>
            {errors.usedStatus && touched.usedStatus && (
            <div >{errors.usedStatus}</div>
          )}
            <div>
              <button type='submit' >Add</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}