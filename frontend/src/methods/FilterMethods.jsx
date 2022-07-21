import { format } from "date-fns";
import { FaPage4 } from "react-icons/fa";

/**
 * gets all flights based on selected filters
 * @param  {Dictionary} params first item can include nothing to show all flights, or it can include one or more filters (departureTime,arrivalTime, fromSearchOption, toSearchOption)
 * @return {Dictionary} The data
 * 
 */
const  FilteredFlightsMethod = async (...params) => {
    let flightParams = params[0]
    let searchurl = '/backend/flights/?'

    if (flightParams["departureTime"]){searchurl += `&from_departure_time=${format(new Date(flightParams["departureTime"]), "yyyy-MM-dd'T'HH:mm")}`}
    if (flightParams["arrivalTime"]){searchurl += `&to_arrival_time=${format(new Date(flightParams["arrivalTime"]), "yyyy-MM-dd'T'HH:mm")}`}        
    if (flightParams["fromSearchOption"]) {searchurl +=`&origin_country=${flightParams["fromSearchOption"]}`;}
    if (flightParams["toSearchOption"]) {searchurl +=`&destination_country=${flightParams["toSearchOption"]}`;}
  
    let response = await fetch(searchurl)
    let data = await response.json()

    return (data)
}


/**
 * gets all flights based on ticket ids
 * @param  {string} ticket_ids all user's tickets
 * @return {Dictionary} returns flights that match the tickets
 * 
 */
const  FilteredFlightsByIdMethod = async (ticket_ids) => {

        let searchurl = '/backend/flights/?id__in='
        ticket_ids.map((ticket) => (
            searchurl += ticket.flight + ','
        ))
        let response = await fetch(searchurl)
        response = await response.json()
        return response
}



/**
 * returns countries based on search term
 * @param  {string} searchTerm what the user typed
 * @return {Dictionary} all countries starting with said search term
 * 
 */
const  FilteredCountryMethod = async (searchTerm) => {
    let response = await fetch(`/backend/api/country/?search=${searchTerm}`)
    let data = await response.json()
    return data
}


export { FilteredFlightsMethod, FilteredCountryMethod, FilteredFlightsByIdMethod}



// export default FilteredFlightsMethod
// consosle.log(departureTime.toUTCString());
// console.log(range[0].startDate);
// let formatteddeptime =  format(new Date(range[0].startDate), "yyyy-MM-dd'T'HH:mm")
// let formattedlandtime =  format(new Date(range[0].endDate), "yyyy-MM-dd'T'HH:mm")
// if (departureTime){ searchurl += `&from_departure_time=${formatteddeptime}`}
// if (arrivalTime){searchurl += `&to_arrival_time=${formattedlandtime}`}