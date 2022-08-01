import React from 'react'
import AsyncSelect from 'react-select/async';



const CountrySelectAsync = ({placeHolderLabel, getCountries , setSearchOption}) => {


  return (
    <AsyncSelect 
    className='country-input'
    classNamePrefix='country-input'
    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
    noOptionsMessage={() => null}
    placeholder = { placeHolderLabel }
    cacheOptions
    loadOptions = {getCountries}
    isSearchable
    isClearable
    maxMenuHeight = {300}
    onInputChange = {(e) => {getCountries(e)}} 
    onChange = {(e)=> e? 
        setSearchOption(e.value)
        : setSearchOption(0)
    }/>
  )
}

export default CountrySelectAsync