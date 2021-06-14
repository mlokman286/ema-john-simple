import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser] = useContext(UserContext)
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Enter your name"/>
            {errors.name && <span className="error">Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Enter your Email"/>
            {errors.email && <span className="error">Email is required</span>}

            <input {...register("address", { required: true })} placeholder="Enter your address"/>
            {errors.address && <span className="error">Address is required</span>}

            <input {...register("phone", { required: true })} placeholder="Enter your phone number"/>
            {errors.phone && <span className="error">Phone number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;