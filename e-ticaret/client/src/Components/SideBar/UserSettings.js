import axios from "axios"
import { useState, useEffect } from "react";
import '../../Css/Space.css'
import '../../App.css'
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import


export default function AddColor() {



    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get('http://localhost:64082/api/users/getall')
            .then(response => {
                setUsers(response.data)

            }).catch(error => {
                return alert("Error: " + error);
            })

    }



    useEffect(() => {
        fetchUsers()

    }, [])

   
    function unblockUser(userid){

        axios.post(`http://localhost:64082/api/users/unblockuser/${userid}`)
            .then(function(result){

            if(result.status === 200){
                window.alert(" user's block removed .")
                console.log(result)
                fetchUsers()
            }
        }).catch(e=>{
            console.log(e)
            window.alert("error !")
        })

    }

        function handleShow(name,lastname,userId) {

            confirmAlert({
                title: 'WARNING!',
                message: `This feature is used to re-open the accounts of blocked users.
                Are you sure you want to unblock the ${name} ${lastname} user's account ?`,

                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => unblockUser(userId)

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
                            <th>name</th>
                            <th>last name</th>
                            <th>mail</th>
                            <th>user lock count</th>
                            <th>user is lock</th>
                            <th>user role</th>
                            <th>unblock the user</th>


                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (

                            <tr>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.mail}</td>
                                <td>{user.lockCount}</td>
                                <td>{String(user.isLock)}</td>
                                <td>{user.role}</td>

                                <td>

                                    {user.isLock && <button onClick={()=>handleShow(user.name,user.lastName,user.userID)}
                                        className="btn btn-warning" variant="primary" >
                                        unblock
                                    </button>
                                    }
                                </td>

                            </tr>

                        ))}


                    </tbody>
                </table>



            </div>



        )

    }
