import React from 'react'
import CreatorInfo from '../../components/Creator/CreatorInfo/CreatorInfo'
import CreatorSingle from '../../components/Creator/CreatorSingle/CreatorSingle'
import Crypter from '../../components/Crypter/Crypter'
import Seller from "../../components/Sellers/Seller/Seller";


const Home = () => {
  return (
    <div>
      <CreatorInfo/>
      <CreatorSingle/>
      <Seller/>
      <Crypter/>
    </div>
  )
}

export default Home
