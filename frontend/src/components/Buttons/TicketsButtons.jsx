import React from 'react'
import { CreateTicket, RemoveTicket } from '../../methods/TicketMethods'
import { useNavigate} from "react-router-dom";



const TicketAddButton = (props) => {

    /**
* if user is logged in, adds a ticket for the flight selected for them
*/  
    let handleAddTicket = () => {
        if (props.authToken){CreateTicket(props.currentFlight, props.authToken)}
        window.location = "/customer/tickets"
        // navigate("/customer/tickets")
      }
    


    let  navigate = useNavigate();

    return (
            <>

                <input 
                    type="button" 
                    id='book-btn' 
                    value = "Book"
                    onClick={handleAddTicket}
                />
            </>
  )
}


const TicketRemoveButton = (props) => {
    let  navigate = useNavigate();

    
 /**
* removes the current ticket for the user
*/  
    let handleRemoveTicket = () => 
    {
       RemoveTicket(props.currentTicket, props.authToken)
    //    navigate("/customer/tickets")
    //    window.location.reload(false);
    window.location = "/customer/tickets"

    }

    return (
        <>
            <input 
                type="button" 
                id='remove-btn' 
                value = "Remove"
                onClick={handleRemoveTicket}
            />
            
        </>
            )

}

export  {TicketAddButton , TicketRemoveButton }