import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { IUser } from '../../no-state/users/models';
import { IProduct } from '../../no-state/products/models';
import UserService from '../../services/UserService';
import HeroDesktop from '../../assets/illustrations/hero-desktop.png';
import NavBar from '../NavBar/NavBar';
import { Button } from 'react-bootstrap';

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

  const changeBalanceCard = async () => {
    debugger;
    setIsBalanceCardOpen(!isBalanceCardOpen);
  };

  const addPointsOptions = [1000, 5000, 7500];

  const handleAddPoints = async () => {
    debugger;
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
          <div className='illustration-container'>
            <img src={HeroDesktop} alt="" />
          </div>
          <div className='copy-and-cta'>
            <div className='landing-copy'>
              <div className='label-and-title'>
                <div className='explore-the'>
                  Explore the
                </div>
                <div className='tech'>
                  TECH
                </div>
                <div className='zone'>
                  ZONE
                </div>
                <div className='long-text'>
                  Here you’ll be able to exchange all of your hard-earned Aeropoints and exchange them for cool tech.
                </div>
              </div>
            </div>
            <Button variant={'view-products'}>
              <div className='view-products-text'>VIEW ALL PRODUCTS</div>
            </Button>
          </div>
          <NavBar user={user} handleAddPoints={handleAddPoints}></NavBar>
        </div>
        </>
      )}
    </>
  );
};

export default Home;
