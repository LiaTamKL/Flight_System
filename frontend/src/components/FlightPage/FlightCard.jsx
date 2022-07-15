import { MdFlight } from 'react-icons/md';
import FlightItem from './FlightItem'
import "./FlightPage.css"


const FlightCard = (props) => {
    let flight = props.flight
    let d_country = props.countries?.find(count=> count.country_name===flight.destination_country)


    return (
        <>
        <div className="col-lg-4">    
        <article className="card card-big mb15">
            <div className="card__img-wrap">

                <img src={d_country?.flag} alt={flight.destination_country + ' flag'} />
                <h4 className="title-overlay-center"> Explore {flight?.destination_country}</h4>
            </div>
            <div className="card__info">
                <div className="title-left-wrap"> <h5>{flight?.origin_country}</h5> <small> {flight?.origin_country.slice(0, 3)} </small></div>
                <span className="icon-center-wrap"><i className='icon-size'><MdFlight className='flight-icon' /> </i></span>
                <div className="title-right-wrap"> <h5>{flight?.destination_country}</h5> <small>{flight?.destination_country.slice(0, 3)} </small></div>
            </div> 
            
            <FlightItem  flight={flight} CusPage={props.CusPage} />

        </article> 
    </div>
    </>
  )
}



export default FlightCard