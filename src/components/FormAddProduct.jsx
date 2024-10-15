import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState("");

    const navigate = useNavigate()

    const saveProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !image) {
            setMsg("Name, Price, and Image are required.");
            return;
        }

        if (isNaN(price) || price <= 0) {
            setMsg("Price must be a valid number greater than zero.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg("Product added successfully!");
            // Redirect ke halaman produk setelah beberapa detik
            setTimeout(() => {
                navigate('/products');
            }, 1500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An unexpected error occurred.");
            }
        }
    }
  return (
    <div>
      <h1 className='title'>Add Product</h1>
       <h2 className='subtitle'>Add New Product</h2>
       <div className="card is-shadowless" style={{borderColor: "transparent"}}>
        <div className='card-content'>
            <div className="content">
            <form onSubmit={saveProduct}>
                <p className='has-text-centered'>{msg}</p>
                        <div className="field">
                            <label  className="label">Name</label>
                            <div className="control">
                                <input type="text" 
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
                               <button type='submit' className="button is-link">Save</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
       </div>
    </div>
  )
}

export default FormAddProduct
