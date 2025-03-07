import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    });
    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const AddProduct = async () => {
        console.log(productDetails);
        let responseData;
        let products = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data});

        if(responseData.success)
        {
            products.image = responseData.image_url;
            console.log(products);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(products),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            });
        }
    }

  return (
    <div className='AddProduct'>
        <div className="item-fields">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="product-price">
            <div className="item-fields">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here'/>
            </div>
            <div className="item-fields">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here'/>
            </div>
        </div>
        <div className="item-fields">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="item-fields">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='thumnail-image'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{AddProduct()}} className='addproduct-button'>ADD</button>
    </div>
  )
}

export default AddProduct