const MainPage= (message) => {
    console.log('WELCOME USER')
    console.log(message)
    return (
    <div><h1>WHAT A WONDERFUL MAIN PAGE</h1>
    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage