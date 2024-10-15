import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const ProductList = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    console.log(response.data);
    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      }
      getProducts();
    });
  }

  return (
    <div>
       <h1 className='title'>Product</h1>
        <h2 className='subtitle'>List Of Product</h2>
        <Link to={"/products/add"} className='button is-primary mb-2'>Add New Product</Link>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, index) => {
  console.log(product.image); // Tambahkan ini untuk debugging
  console.log(`http://localhost:5000/images/${product.image}`);
  return (
    <tr key={product.uuid}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        {product.image ? (
          <img 
            src={`http://localhost:5000/images/${product.image}`} 
            alt={product.name} 
            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
          />
        ) : (
          <span>No Image</span>
        )}
      </td>
      <td>{product.user.name}</td>
      <td>
        <Link
          to={`/products/edit/${product.uuid}`}
          className="button is-small is-info mx-1"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteProduct(product.uuid)}
          className="button is-small is-danger mx-1"
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
    </div>
  )
}

export default ProductList
