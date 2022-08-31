
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsSlice, { filterprice, selectproducts } from '../features/products/productsSlice';
const ProductsItem = ({ product }) => {

    const products = useSelector(selectproducts)
    const dispatch = useDispatch()
return(
  <div>
     

    <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Quantite</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.quantite}</td>
      <td>{product.price}</td>
    </tr>
    
  </tbody>
</table>
  </div>  
)






}
export default ProductsItem