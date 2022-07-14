import { MdFlight } from 'react-icons/md';
import FlightItem from './FlightItem'
import "./FlightPage.css"


const FlightCard = (props) => {
    let flight = props.flight

  

    return (
        <>
        <div className="col-lg-4">    
        <article className="card card-big mb15">
            <div className="card__img-wrap">

                <img src="https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg?t=st=1657567736~exp=1657568336~hmac=406f5538d84653e99bfa2965180cda9c32dd871fc3f7b30b3f173c29db7f10a6&w=1800" alt="" />
                <h4 className="title title-overlay-center"> Explore {flight?.destination_country}</h4>
            </div>
            <div className="card__info">
                <div className="title-left-wrap"> <h5>{flight?.origin_country}</h5> <small> {flight?.origin_country.slice(0, 3)} </small></div>
                <span className="icon-center-wrap"><i className='icon-size'><MdFlight className='flight-icon' /> </i></span>
                <div className="title-right-wrap"> <h5>{flight?.destination_country}</h5> <small>{flight?.destination_country.slice(0, 3)} </small></div>
            </div> 
            
            <FlightItem  flight={flight} />

        </article> 
    </div>
    </>
  )
}



export default FlightCard