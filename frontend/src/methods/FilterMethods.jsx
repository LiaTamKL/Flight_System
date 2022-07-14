import { format } from "date-fns";
import { FaPage4 } from "react-icons/fa";


const  FilteredFlightsMethod = async (...params) => {
    let flightParams = params[0]
    let searchurl = '/backend/flights/?'

    if (flightParams["departureTime"]){searchurl += `&from_departure_time=${format(new Date(flightParams["departureTime"]), "yyyy-MM-dd'T'HH:mm")}`}
    if (flightParams["arrivalTime"]){searchurl += `&to_arrival_time=${format(new Date(flightParams["arrivalTime"]), "yyyy-MM-dd'T'HH:mm")}`}        
    if (flightParams["fromSearchOption"]) {searchurl +=`&origin_country=${flightParams["fromSearchOption"]}`;}
    if (flightParams["toSearchOption"]) {searchurl +=`&destination_country=${flightParams["toSearchOption"]}`;}
  
    let response = await fetch(searchurl)
    let data = await response.json()
    
    var hist = {};
    var grouped = []
    

        // data.map( (flight, index , data) => {
        //     if ([data[index].destination_country, data[index].origin_country]  in hist) 
        //     {
        //         hist[[data[index].destination_country, data[index].origin_country ]] ++ ;

                
        //         grouped.push(data[index]);
        //         // data.splice(index, 1)
        //         // data.splice(index-1, 1)
        //         // grouped.splice(index-1, 1)
                
        //     }
        //         else { hist[[data[index].destination_country, data[index].origin_country]] = 1;
        //         // grouped.push(data[index]);   
        //     }});

        //         console.log(grouped);
        //         console.log(hist);
    // console.log(hist);
    // console.log(grouped);

//       const myFunc = (obj, prop) => {
      
//         return obj.reduce((acc, item) => {

            
//           let key = item[prop]
      
//           if (!acc[key]) {
//             acc[key] = []
//           }
      
//           acc[key].push(item)
      
//           return acc
      
//         }, {})
      
//       }
//     let gro = ["destination_country", "origin_country"] 
//    let groupedStudent = myFunc(data, gro)
// console.log(groupedStudent);


    // console.log(grouped);
    // console.log(data)

    return (data)


}



const  FilteredFlightsByIdMethod = async (ticket_ids) => {
        let searchurl = '/backend/flights/?id__in='
        ticket_ids.map((ticket) => (
            searchurl += ticket.flight + ','
        ))
        let response = await fetch(searchurl)
        ticket_ids = await response.json()
        return ticket_ids
}



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