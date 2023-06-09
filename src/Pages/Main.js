import React, { useEffect } from 'react'
import Header from '../Header/Header'
import GoogleLogoutButton from '../GoogleLogoutButton'
import { useDispatch, useSelector } from 'react-redux';
import { GetFirestoreData } from '../findAll';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    GetFirestoreData(dispatch);
  }, []);

  let rooms = useSelector((state) => state?.data)

  console.log(rooms);

  return (
    
    <div>
        <Header/>
        <GoogleLogoutButton/>
    </div>
  )
}

export default Home