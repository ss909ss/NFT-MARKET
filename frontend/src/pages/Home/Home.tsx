import React from 'react'
import CreatorInfo from '../../components/Creator/CreatorInfo/CreatorInfo'
import CreatorSingle from '../../components/Creator/CreatorSingle/CreatorSingle'
import Crypter from '../../components/Crypter/Crypter'
// import Sellers from '../../components/Sellers/Sellers'


const Home = () => {
  return (
    <div>
      <CreatorInfo/>
      <CreatorSingle/>
      {/* <Sellers/> */}
      <Crypter/>
    </div>
  )
}

export default Home
