

const CustomerCard = ({customer}) => {
    return (
        <div key={customer.id} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{customer.first_name} {customer.last_name}</h5>
                <small className="text-muted">Username: {customer.account}</small>
            </div>
            <br/>
            <p className="mb-1">Lives in {customer.address}. Phone Number: {customer.phone_number}</p>
            <button className="btn btn-primary btn-sm" >Add as Admin</button>
            <button className="btn btn-primary btn-sm" >Add as Airline</button>
            <button className="btn btn-danger btn-sm" >Delete</button>
        </div>
    )
}

export default CustomerCard