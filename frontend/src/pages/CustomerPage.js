import React , {useContext , useEffect , useState } from 'react';
import AuthContext from "../context/authentication";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../methods/UserMethods';
import { ViewMyTickets } from "../methods/TicketMethods";
import AddTicketCreateButton from '../components/AddTicketCreateButton'
import { ListIFlightitem } from '../components/ListItem'
import { FilteredFlightsByIdMethod } from '../methods/FilterMethods';


// import './Pages.css';

const CustomerPage = () => {
    let navigate = useNavigate();
    let [tickets, setTickets] = useState();
    let [userData, setUserData] = useState();
    let {user, authToken} = useContext(AuthContext)
    let [myFlights, setMyFlights] = useState();

    // const flight_id = useRef(tickets.flight)

// console.log(user , userData);
    useEffect(() => {
        getUserData() 
        getMyTickets()
        // eslint-disable-next-line
    }, [user])

let getUserData = async () => {
        let result = await getUserInfo(authToken)
        if(result.status === 200){
        setUserData(result.data)
    }
}


//gets tickets and flights connected to them 
let getMyTickets = async () => {

    let result = await ViewMyTickets(authToken)
    let data =  result.data
    let status = result.status


    if (status ===200){
        setTickets(data)
        data = await FilteredFlightsByIdMethod(data)
        setMyFlights(data)}

    else{alert(status, data)}
}




    return (
        <div className='all'>
          <div className='all-header'>
            <h2 className='all-title'>&#9782; Tickets of {userData?.first_name} {userData?.last_name} </h2>
            <p className='all-count'>{tickets?.length}</p>
          </div>

          {/* tickets.find(id) => id === flight.id)} */}
          <div className="all-list">
                    {myFlights?.map((myflight, index) => (
                    <ListIFlightitem key={index} flight={myflight} userrole={user.account_role}  />
                    
                ))}

            </div>  
            {/* <AddTicketCreateButton tickets_id = {tickets.id} userData = { userData } /> */}
            <AddTicketCreateButton userData = { userData }  />

        </div>
  )

  
}

export default CustomerPage





// let flightsByTickets = async (flight_id) =>{
//   let searchurl = '/backend/flights/?id__in='

//   flight_id.map((ticket) => (
//         searchurl += ticket + ','
//     ))
//     console.log(searchurl);
//     let response = await fetch(searchurl)
//     let data = await response.json()
//     console.log(data);
//     }


// let flightsByTickets = async () =>{
//     if (tickets) {let searchurl = '/backend/flights/?id__in='

//     tickets?.map((ticket) => (
//         searchurl += ticket.flight + ','
//     ))
//     console.log(searchurl);
//     let response = await fetch(searchurl)
//     let data = await response.json()
//     // console.log(data);
//     }


// let test = async () => {
//     let searchurl = '/backend/api/tickets/?tiket_id=4'
//     // console.log(searchurl);
//     let response = await fetch(searchurl)
//     let data = await response.json()
//     console.log(data);

// }


    