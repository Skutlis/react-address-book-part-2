import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import CreateContact from './pages/CreateContactsPage/CreateContact';
import { User } from './objects/UserObjects';
import Dashboard from './pages/Dashboard/DashBoard';
import NavigationBar from './components/NavigationBar';
import { Route, Router, Routes } from 'react-router-dom';

export interface ContactsManagement {
    contacts: User[];
    setContacts: Dispatch<SetStateAction<User[]>>;
    createdUser: User;
    setCreatedUser:  Dispatch<SetStateAction<User>>;
    userCreated: boolean;
    setUserCreated: Dispatch<SetStateAction<boolean>>;
    idOfUserToDelete: number;
    setIdOfUserToDelete: Dispatch<SetStateAction<number>>;
}
export const ContactsContext = createContext<ContactsManagement>({} as ContactsManagement)
const contactsURL = "https://boolean-uk-api-server.fly.dev/Skutlis/contact"



function App() {
    const [contacts, setContacts] = useState<User[]>([]);
    const [createdUser, setCreatedUser] = useState({} as User)
    const [userCreated, setUserCreated] = useState<boolean>(false);
    const [dbUpdated, setDbUpdated] = useState<boolean>(false);
    const [idOfUserToDelete, setIdOfUserToDelete] = useState<number>(0);

    // Get contacts
    useEffect(() => {
        fetch(contactsURL)
            .then(response =>  response.json())
            .then(data => setContacts(data))
    }, [dbUpdated]);

    // Add a contact
    useEffect(() => {
        if (contacts.length > 0){
            const a = fetch(contactsURL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(createdUser)
            }).then((response) => response.json())
            .then(() => {
                setDbUpdated(!dbUpdated);
                setCreatedUser({} as User)
            });  
        }

    }, [userCreated])

    useEffect(() => {
        if(idOfUserToDelete != 0){
            fetch(contactsURL + "/" + idOfUserToDelete.toString(), {
                method: "Delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                }).then((response) => response.json())
            .then(() => {
                setDbUpdated(!dbUpdated);
                
            });
        }
          
    }, [idOfUserToDelete])

    

    return (
        <ContactsContext.Provider value={{contacts, setContacts, createdUser, setCreatedUser, userCreated, setUserCreated, idOfUserToDelete, setIdOfUserToDelete}}>
        <div>
            <NavigationBar />
        </div>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="CreateContact" element={<CreateContact />} />
        </Routes>

        </ContactsContext.Provider>
    );
}

export default App;
