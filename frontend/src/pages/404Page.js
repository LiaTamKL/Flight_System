import { Link } from 'react-router-dom'

const NotFound = () => {
    console.log('404 not found')
    return (<div>
        <h1>This page does not exist</h1>
        <Link to="/" >Back home</Link>
        </div>)
}

export default NotFound