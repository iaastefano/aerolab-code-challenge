import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { IUser } from '../../no-state/users/models';
import UserService from '../../services/UserService';
import WalkthroughOne from '../../assets/illustrations/walkthroug-1-desktop.png';
import WalkthroughTwo from '../../assets/illustrations/walkthroug-2-desktop.png';
import WalkthroughThree from '../../assets/illustrations/walkthroug-3-desktop.png';
import NavBar from '../NavBar/NavBar';
import ChooseSvg from '../../assets/icons/choose.svg';
import BrowseSvg from '../../assets/icons/browse.svg';
import EnjoySvg from '../../assets/icons/enjoy.svg';
import TechZone from '../TechZone/TechZone';
import IntroCard from '../IntroCard/IntroCard';
import ProductGrid from '../Product/ProductSection';

interface HomeProps {
}

const CATEGORY_ALL_PRODUCTS = 'All Products';
const ITEMS_PER_PAGE = 16;

const Home: React.FC<HomeProps> = ({
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>({
    createDate: '',
    id: '',
    name: '',
    points: '',
    redeemHistory: []
  });
  const [addPointsOption, setAddPointsOption] = useState<number>(1);

  const fetchUser = async () => {
    try {
      setIsLoading(true);

      const response = await UserService.fetchUser();

      setUser(response);
    } catch (error) {
      // if (error.message) {
      //   // message.error(error.message);
      // }
    }
  };

 
  const addPointsOptions = [1000, 5000, 7500];

  const handleAddPoints = async () => {
    if(user){
      setUser({
        createDate: user.createDate,
        id: user.id,
        name: user.name,
        redeemHistory: user.redeemHistory,
        points: user.points + addPointsOptions[addPointsOption],
      });
    }
  };


  const handleViewAllProducts = async () => {
    //TODO
  };



  useEffect(
    () => {
      if(isLoading){
        fetchUser();
        setIsLoading(false);
      }
    },
  );

  return (
    <>
      {isLoading ? (
        <div className="spin-container">
        </div>
      ) : (
        <>
        <div className='landing-section'>
          <TechZone handleViewAllProducts={handleViewAllProducts}></TechZone>
          <NavBar 
            user={user} 
            handleAddPoints={handleAddPoints} 
            setAddPointsOption={setAddPointsOption} 
            addPointsOption={addPointsOption}>
          </NavBar>
        </div>
        <div className="walkthrough-section">
          <div className="walkthrough-cards-bg">
          </div>
          <div className="walkthrough-cards">
            <IntroCard 
              type={'browse'} 
              image={WalkthroughOne} 
              title={'1—browse'} 
              text={'Browse our tech catalog with more than 20 top tech products'} 
              icon={BrowseSvg} 
            />
            <IntroCard 
              type={'choose'} 
              image={WalkthroughTwo} 
              title={'2—choose'} 
              text={'Exchange your hard earned AeroPoints for the item you want'} 
              icon={ChooseSvg}
            />
            <IntroCard 
              type={'enjoy'} 
              image={WalkthroughThree} 
              title={'3—enjoy!'} 
              text={'All done, you can relax! We’ll take care of delivery of your tech item!'} 
              icon={EnjoySvg}
            />
          </div>
        </div>
        <ProductGrid></ProductGrid>
        </>
      )}
    </>
  );
};

export default Home;

