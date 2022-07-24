import React , {useContext , useEffect , useState } from 'react';
import { useNavigate} from "react-router-dom";
import { CreateTicket, RemoveTicket } from '../methods/TicketMethods';


import AuthContext from "../context/authentication";
import { getUserInfo } from '../methods/UserMethods';
import { ViewMyTickets } from "../methods/TicketMethods";
import FlightCard from '../components/FlightPage/FlightCard';
import { AllCountries } from '../methods/CountriesMethods';
import ReactPaginate from "react-paginate"

// import './Pages.css';

const CustomerPage = () => {
    let  navigate = useNavigate();

    let [userData, setUserData] = useState();
    let {user, authToken} = useContext(AuthContext)
    let [myFlights, setMyFlights] = useState();
    const [noData, setNoData] = useState();
    const [countries, setCountries] = useState([]);
    
    const [pagenumber, setPageNumber] = useState(0)
    const flightsPerPage = 6
    const pagesSeen = pagenumber * flightsPerPage
  

    useEffect(() => {
        getUserData() 
        getMyTickets()
            
            // eslint-disable-next-line
        }, [])

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

        if (status ===200)
        {
            if (data.length === 0){
                setNoData(true) 
                return
            } 
                setMyFlights(data)

                let country_data = await AllCountries()
                if (country_data){setCountries(country_data)}
                else{alert(status, data)}
        }
        else{alert(status, data)}
    }


    if (myFlights!==undefined && !noData){

        if (myFlights!==undefined){
            var displayFlights = myFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((myFlight, index)=>{
            
            return (
                    <FlightCard key={index} custFlight={myFlight} countries={countries} custPage={true} />

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




export default CustomerPage