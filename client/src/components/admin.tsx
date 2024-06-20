import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    description: "",
    ingredients: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productDetails),
      });
      const data = await response.json();
      setProducts([...products, data.product]);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productDetails),
      });
      const data = await response.json();
      setProducts(products.map(product => (product.id === data.product.id ? data.product : product)));
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const resetForm = () => {
    setProductDetails({
      id: "",
      name: "",
      category: "",
      price: "",
      description: "",
      ingredients: "",
    });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Product</h3>
        <input type="text" name="id" placeholder="ID" value={productDetails.id} onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" value={productDetails.name} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={productDetails.category} onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" value={productDetails.price} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={productDetails.description} onChange={handleChange}></textarea>
        <input type="text" name="ingredients" placeholder="Ingredients" value={productDetails.ingredients} onChange={handleChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h3>Product List</h3>
        {products.map((product: any) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => setProductDetails(product)}>Edit</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Update Product</h3>
        <input type="text" name="id" placeholder="ID" value={productDetails.id} onChange={handleChange} readOnly />
        <input type="text" name="name" placeholder="Name" value={productDetails.name} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={productDetails.category} onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" value={productDetails.price} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={productDetails.description} onChange={handleChange}></textarea>
        <input type="text" name="ingredients" placeholder="Ingredients" value={productDetails.ingredients} onChange={handleChange} />
        <button onClick={handleUpdateProduct}>Update Product</button>
      </div>
    </div>
  );
};

export default Admin;