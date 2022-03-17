import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { IUser } from '../../no-state/users/models';
import { IProduct } from '../../no-state/products/models';
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
import { Button, Dropdown } from 'react-bootstrap';

interface HomeProps {
}

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
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isBalanceCardOpen, setIsBalanceCardOpen] = useState<boolean>(false);
  const [addPointsOption, setAddPointsOption] = useState<number>(1);
  const [sortSelectorActive, setSortSelectorActive] = useState<number>(0);


  const unique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index
  }

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

  const fetchProducts = async () => {
    try {

      setIsLoading(true);

      const response = await ProductService.fetch();

      setProducts(response);

      let categories = response.map(product => product.category);

      setCategories(categories.filter(unique));

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

  const sortSelectors  = ['Most Recent', 'Lowest Price', 'Highest Price'];

  const handleViewAllProducts = async () => {
    //TODO
  };

  useEffect(
    () => {
      if(isLoading){
        fetchUser();
        fetchProducts();
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
        <div className='product-section'>
          <div className='header-products-and-bottom-pager'>
            <div className='title-and-controls'>
              <div className='title'>
                <span className='title-tech'>
                  {'TECH '}
                </span>
                <span className='title-products'>
                  PRODUCTS
                </span>
              </div>
              <div className='filter-sort-and-pager'>
                <div className='filters'>
                  <div className='filter-by'>
                    <div className='filter-text'>
                      Filter by
                    </div>
                    <div className='filter-container'>
                      <select className='filter'  placeholder='All products'>
                      </select>
                    </div>
                  </div>
                  <div className='sort-by-container'>
                    <div className='sort-by-text'>
                      Sort by:
                    </div>
                    <div className='sort-row'>
                      <Button variant={sortSelectorActive != 0 ? 'sort-selector' : 'sort-selector-active'}>
                        <div className={sortSelectorActive != 0 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                          {sortSelectors[0]}
                        </div>
                      </Button>
                      <Button variant={sortSelectorActive != 1 ? 'sort-selector' : 'sort-selector-active'}>
                        <div className={sortSelectorActive != 1 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                          {sortSelectors[1]}
                        </div>
                      </Button>
                      <Button variant={sortSelectorActive != 2 ? 'sort-selector' : 'sort-selector-active'}>
                        <div className={sortSelectorActive != 2 ? 'sort-selector-text' : 'sort-selector-text-active'}>
                          {sortSelectors[2]}
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Home;
