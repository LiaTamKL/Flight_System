import React , {useContext , useEffect , useState } from 'react';
import AuthContext from "../context/authentication";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from '../methods/UserMethods';
import { ViewMyTickets } from "../methods/TicketMethods";
import AddTicketCreateButton from '../components/AddTicketCreateButton'
import { ListIFlightitem } from '../components/ListItem'
import { FilteredFlightsByIdMethod } from '../methods/FilterMethods';
import FlightCard from '../components/FlightPage/Components/FlightCard';
import { AllCountries } from '../methods/CountriesMethods';
import ReactPaginate from "react-paginate"

// import './Pages.css';

const CustomerPage = () => {
    let navigate = useNavigate();
    // let [tickets, setTickets] = useState();
    let [userData, setUserData] = useState();
    let {user, authToken} = useContext(AuthContext)
    let [myFlights, setMyFlights] = useState();
    const [noData, setNoData] = useState();
    const [countries, setCountries] = useState([]);
    
    const [pagenumber, setPageNumber] = useState(0)
    const flightsPerPage = 5
    const pagesSeen = pagenumber * flightsPerPage
  

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


const handleNoTickets = () => {
    
    
    return (
        <div className='flights-header'>
        <h2 className='flights-title'>  No Tickets for {userData?.first_name} {userData?.last_name}  </h2>
        </div> 
    )

}



//gets tickets and flights connected to them 
let getMyTickets = async () => {

    let result = await ViewMyTickets(authToken)
    let data =  result.data
    let status = result.status


    if (status ===200){
       setNoData(data.length === 0)
        // setTickets(data)
        data = await FilteredFlightsByIdMethod(data)
        if (status ===200){
            setMyFlights(data)
            let country_data = await AllCountries()
            if (country_data){
                setCountries(country_data)       
      
        }
        }
        else{alert(status, data)}
    
    }
    
    else{alert(status, data)}
}


if (myFlights!==undefined && !noData){


    if (myFlights!==undefined){
        var displayFlights = myFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight, index)=>{
        
        return (

                <FlightCard key={index} flight={flight} countries={countries} CusPage={true}/>

            )})
            var pageCount = Math.ceil(myFlights.length / flightsPerPage)
        }

            const changePage = ({selected})=>{
                setPageNumber(selected)
            }


    return (
        <>
        <div className='flights-header'>
        <h2 className='flights-title'>  Tickets of {userData?.first_name} {userData?.last_name}  </h2>
        </div>

                <div className="container">
                <div className="row">
                        
            {
                    myFlights?.length > 0
                    ? (<>
                        {displayFlights}
                        <ReactPaginate
                        className= {"pagination"}
                        previousLabel = {'Back'}
                        nextLabel = {'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        siblingCount = {0}
                        containerClassName={""}
                        previousLinkClassName={"btn btn-outline-info"}
                        nextLinkClassName={"btn btn-outline-info"}
                        />
                        </>
                    ) :(
                    <></>
            )}
                </div>  
            </div>
        </>  

        )
    }else{  
        return (
        <div className='flights-header'>
        <h2 className='flights-title'>  No Tickets for {userData?.first_name} {userData?.last_name}  </h2>
        </div> 
    )

    }

    }




//     return (
//         // <div className='all'>
//         //   <div className='all-header'>
//             <h2 className='all-title'>&#9782; Tickets of {userData?.first_name} {userData?.last_name} </h2>
//             {/* <p className='all-count'>{tickets?.length}</p> */}
//           </div>

//           {/* tickets.find(id) => id === flight.id)} */}
//           <div className="all-list">
//                     {myFlights?.map((myflight, index) => (
//                     <ListIFlightitem key={index} flight={myflight} userrole={user.account_role}  />
                    
//                 ))}

//             </div>  
//             {/* <AddTicketCreateButton tickets_id = {tickets.id} userData = { userData } /> */}
//             <AddTicketCreateButton userData = { userData }  />

//         </div>
//   )

  
// }

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


    