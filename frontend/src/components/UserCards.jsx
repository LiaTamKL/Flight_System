
export const AccountCard = ({account}) => {
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{account.username} {account.email}</h5>
                <small className="text-muted">Role: {account.account_role}, Superuser Status: {account.is_superuser}</small><br/><br/>

            </div>
    )
}

const CustomerCard = ({customer}) => {
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{customer.first_name} {customer.last_name}</h5>
                <small className="text-muted">Username: {customer.account}</small>          <br/><br/>
            <p className="mb-1">Lives in {customer.address}. Phone Number: {customer.phone_number}</p>
            </div>
    )
}
export const AirlineCard = ({airline}) => {
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{airline.name}</h5>
                <small className="text-muted">Username: {airline.account}</small>          <br/><br/>
            <p className="mb-1">From {airline.country}.</p>
            </div>
    )
}


export const AdminCard = ({admin}) => {
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{admin.first_name} {admin.last_name}</h5>
                <small className="text-muted">Username: {admin.account}</small><br/><br/>

            </div>
    )
}



export default CustomerCard