import React, { useContext, useState } from 'react';
import { User } from '../objects/UserObjects';
import { ContactsContext } from '../App';

export default function ContactListItem(props : {contact: User
}){
    const [clicked, setClicked] = useState<boolean>(false)
    const { setIdOfUserToDelete } = useContext(ContactsContext)


    const { contact } = props;
    const click = () => {
        setClicked(!clicked)
    }
    return (
        <li className='user-card' onClick={() => click()}>
            <ul>
                <li>
                {"Name: " + contact.firstName + " " + contact.lastName}
                </li>
                
                {clicked  &&
                <>
                <li>{"Street: " + contact.street}</li>
        
                <li>{"City: " + contact.city}</li>
                </>
                }
                
                
            </ul>
            <button className='delete-btn' onClick={() => setIdOfUserToDelete(contact.id)}>Delete</button>
    </li>

            
            
    );
}