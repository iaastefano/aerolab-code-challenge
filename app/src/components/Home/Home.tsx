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
import GithubDefaultSvg from '../../assets/icons/github-default.svg';
import TechZone from '../TechZone/TechZone';
import IntroCard from '../IntroCard/IntroCard';
import ProductGrid from '../Product/ProductSection';
import { NotificationContainer, NotificationManager} from 'react-notifications';

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
      const response = await UserService.fetchUser();
      setUser(response);
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
    UserService.addPoints(addPointsOptions[addPointsOption])    
    .then(response => {
      NotificationManager.success(response.message);
    })
    .catch(error => {
      NotificationManager.error(error.message ? error.message : '');
    });
  };

  const handleViewAllProducts = async () => {
    window.scrollTo(0, 1833);
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
        <ProductGrid points={parseInt(user.points)} fetchUser={fetchUser}></ProductGrid>
        <footer className='footer'>
          <a target='_blank' href='https://github.com/iaastefano/aerolab-code-challenge' className='nav-link'>
            <img className='icon' src={GithubDefaultSvg} alt="" />
            <div className='default-link'>View this repository</div>
          </a>          
        </footer>
        <div className='background-pattern'>
        </div>
        <NotificationContainer/>
        </>
      )}
    </>
  );
};

export default Home;

