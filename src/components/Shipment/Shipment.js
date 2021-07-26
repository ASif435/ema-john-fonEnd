import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../processPayment/ProcessPayment';
import { useState } from 'react';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shipingData,setShipingData ]= useState(null) ;
  const onSubmit = data => {
      process(data);
    };

    const process =paymentId=>{
      const saveCart = getDatabaseCart();
      const orderDetails = {...loggedInUser,
        products:saveCart,
         shipment:shipingData ,
         orderTime: new Date().toString()
        }
         fetch('https://organic-ribbon-starburst.glitch.me/addOrder',{
           method:'Post',
           headers:{
            ' Content-Type': 'application/json'
           },
           body:JSON.stringify(orderDetails)
         })
         .then(res=>res.json())
         .then(data => {
           if(data){
             processOrder();
             alert('orderp shipment success')
           }
         })
    }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: shipingData ?'none': 'block'}} className="col-xl-6">
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
     
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}
     
      <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}
     
      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
      
      <input type="submit" />
    </form>
      </div>
      <div style={{display: shipingData ?'block': 'none'}} className="col-xl-6">
        <p>please payment</p>
        <ProcessPayment/>
      </div>
    </div>
  );
};

export default Shipment;