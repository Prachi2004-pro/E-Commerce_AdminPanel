import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);
    const fetchInfo = async ()=>{
      await fetch ('http://localhost:4000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    },[])

    const remove_product = async(id)=>{
      await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className='ListProduct'>
      <h1>All Products List</h1>
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="all-products">
        <hr/>
        {allproducts.map((product,index)=>{
          return <>
            <div key={index} className="format-main product-format">
              <img className='product-icon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='remove_icon' src={cross_icon} alt="" />
            </div>
            <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct