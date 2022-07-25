// import { Link } from 'react-router-dom'

// const NotFound = () => {
//     console.log('404 not found')
//     return (<div>
//         <h1>This page does not exist</h1>
//         <Link to="/" >Back home</Link>
//         </div>)
// }

// export default NotFound


import { Link } from 'react-router-dom'
import './PagesCss/404.css';
import clouds from '../pages/PagesCss/Images/clouds.png'


const NotFound = () => {

return (
    <div className="wrapper-404">
    <div className="text_group">
        <p className="text_404">404</p>
        <p className="text_lost">The page you are looking for <br />has been lost among the clouds.</p>
    </div>
    <div className="window_group">
        <div className="window_404">
                <img id="clouds" src={clouds} alt="clouds"/>

        </div>
    </div>
    </div>
    )
}

export default NotFound

