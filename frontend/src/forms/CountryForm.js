const CountryForm = (country)=>{
    country = country.country
    let set = null
    if (country!==undefined){
        set = true
    }
    return(
        <>
        <input type="text" name="country_name" className="mb-3" placeholder="Country Name" defaultValue = {set?country.country_name:null} required />
        <input type="file" className="custom-file-input" id="flag" name="flag" accept="image/*" required />
        </>
    )
}

export default CountryForm