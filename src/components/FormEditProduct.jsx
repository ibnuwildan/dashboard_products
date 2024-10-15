import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const FormEditProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState("");
    const {id} = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setName(response.data.name)
                setPrice(response.data.price)
                setImage(response.data.image)
            } catch (error) {
                if(error.response) {
                    setMsg(error.respone.data.msg)
                }   
            }
        }
        getProductById();
    }, [id])

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (image) {
            formData.append('image', image); // Tambahkan gambar jika ada
        }
    
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Tentukan tipe konten
                }
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Update has been saved",
                showConfirmButton: false,
                timer: 1300
            });
            navigate('/products');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("Something went wrong!");
            }
        }
    }

  return (
    <div>
      <h1 className='title'> Edit Product</h1>
       <h2 className='subtitle'>Edit Product</h2>
       <div className="card is-shadowless" style={{borderColor: "transparent"}}>
        <div className='card-content'>
            <div className="content">
            <form onSubmit={updateProduct}>
                <p className='has-text-centered'>{msg}</p>
                        <div className="field">
                            <label  className="label">Name</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className="input" 
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <label  className="label">Price</label>
                            <div className="control">
                                <input 
                                type="text"
                                 className="input" 
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                                <label className="label">Image</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])} // Mengambil file gambar
                                    />
                                </div>
                            </div>
                        <div className="field ">
                            <div className="control">
                               <button type='submit' className="button is-link">Update</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default FormEditProduct;
