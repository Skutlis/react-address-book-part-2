import React, { createContext, useContext, useState } from "react";
import { User } from "../../objects/UserObjects";
import { Link, Route, useFormAction, useNavigate } from "react-router-dom";
import { useForm, UseFormRegister } from "react-hook-form";
import UserInput from "../../components/TextInput";
import { ContactsContext } from "../../App";

export interface UserFormFunctions{
    register: UseFormRegister<User>
}

export const ContactFormContext = createContext({} as UserFormFunctions);


export default function CreateContact(){
    const {createdUser, setCreatedUser, userCreated, setUserCreated } = useContext(ContactsContext);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        defaultValues: createdUser,
    });
    const onSubmit = (data) => {
        setCreatedUser((prevUser) => ({ 
            ...prevUser, 
            ...data,
        })) //Create a user
        const created = userCreated;
        setUserCreated(!created); //Allert app to post user
        navigate("/")
    };

    return (
        
    <ContactFormContext.Provider value={{register}} >
        
        <div className="form-container">
            <h1> Create Contact</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <UserInput userProp="firstName" label="First Name"/>
                <UserInput userProp="lastName" label="Last Name"/>
                <UserInput userProp="street" label="Street"/>
                <UserInput userProp="city" label="City"/>
                <button type="submit">Submit</button>
            </form>
            
        </div>   
    </ContactFormContext.Provider>
    );
}