import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Userlist = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users'); // Ambil data pengguna dari API
      console.log("Data yang diterima:", response.data); // Log data yang diterima
      // Periksa apakah data yang diterima adalah array
      if (Array.isArray(response.data)) {
        setUsers(response.data); 
      } else {
        console.error("Data yang diterima bukan array:", response.data);
        setUsers([]); // Jika bukan array, set ke array kosong
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    // Tampilkan SweetAlert konfirmasi
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi, lakukan penghapusan
        try {
          await axios.delete(`http://localhost:5000/users/${userId}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // Memanggil fungsi untuk memperbarui daftar pengguna
          getUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the user.",
            icon: "error"
          });
        }
      }
    });
  };
  
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>List Of User</h2>
        <Link to={"/users/add"} className='button is-primary mb-2'>Add New User</Link>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info mx-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)} // Perbaikan: gunakan user.uuid
                  className="button is-small is-danger mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
    </div>
  )
}

export default Userlist
