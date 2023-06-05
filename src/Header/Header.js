import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'


const Header = () => {

  // let accounts = useSelector(state=>state.accounts)

  // const user = localStorage.getItem('User')

  // const history = useNavigate()
  
  // const LogOutHendler = () => {
  //   localStorage.removeItem('app_token')
  //   sessionStorage.removeItem('app_token')
  //   history('/login')
  // }


  return (
    <div className='main-header'>
      <div className='header'>
          <Link className='link_to_home' to='/'>
            <div className="logo">
                <span>Header</span>
            </div>
          </Link>
          <div className='photo_and_log'>
            
            <div className='log_out' 
            >Log Out</div>
          </div>
      </div>
    </div>
   
  )
}

export default Header