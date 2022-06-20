const AdminForm = (e)=>{

    return(
        <>
        <input type="text" name="first_name" placeholder="First Name" defaultValue = {e?(e.first_name):null} required />
        <input type="text" name="last_name" placeholder="Last Name" defaultValue = {e?(e.last_name):null} required />
        </>
    )
}


export default AdminForm