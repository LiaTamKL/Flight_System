import React from 'react'
import AsyncSelect from 'react-select/async';
import Select from 'react-select';


const CountrySelectAsync = ({placeHolderLabel, getCountries , setSearchOption}) => {


  return (
    <AsyncSelect 
    className='country-input-container'
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



const CountrySelect = ({ countryOptions , name , id , placeholder }) => {
  return (
    
    <Select
      required
      name={ name }
      id={ id }
      className='select-dropdown'
      options={ countryOptions }
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      isSearchable
      placeholder={<div className="select-dropdown-placeholder">{placeholder}</div>}
      isClearable 
    />
  )
}
export  { CountrySelectAsync , CountrySelect }