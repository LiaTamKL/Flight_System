

const CustomerCard = ({customer}) => {
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{customer.first_name} {customer.last_name}</h5>
                <small className="text-muted">Username: {customer.account}</small>          <br/><br/>
            <p className="mb-1">Lives in {customer.address}. Phone Number: {customer.phone_number}</p>
            </div>
    )
}

export default CustomerCard