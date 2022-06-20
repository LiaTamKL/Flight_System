import React from 'react'

const FormHeader = ( {headercheck} ) => {
  // let data = useLocation()
  if (headercheck.id){
    return(
      <div>
      <h2>Update Flight Number {headercheck.id}</h2>
      </div>

    )


  } else {
  // console.log(headercheck)

  return (
    <div>
        <h2>Create a new Flight</h2>
        
        </div>
  )
}
}

export default FormHeader