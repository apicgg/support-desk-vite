import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUserAlt, FaHome } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to='/'>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUserAlt /> Register
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>
    </header>
  )
}
export default Header
