import React from 'react'
import CreatorInfo from '../../components/Creator/CreatorInfo/CreatorInfo'
import CreatorSingle from '../../components/Creator/CreatorSingle/CreatorSingle'
import Crypter from '../../components/Crypter/Crypter'
import Seller from "../../components/Sellers/Seller/Seller";
import Wallet from '../../components/Wallet/Wallet';
import ModalToken from '../../components/ModalToken/ModalToken';
import ModalFollowSteps from '../../components/modalFollowSteps/ModalFollowSteps';
import ModalSuccessfully from '../../components/ModalSuccessfully/ModalSuccessfully';
import ModalRemove from '../../components/ModalRemove/ModalRemove';


const Home = () => {
  return (
    <div>
      <CreatorInfo />
      <CreatorSingle />
      <Seller />
      <Crypter />
    </div>
  )
}

export default Home