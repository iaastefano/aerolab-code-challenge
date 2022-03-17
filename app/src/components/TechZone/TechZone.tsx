import React from 'react';
import HeroDesktop from '../../assets/illustrations/hero-desktop.png';
import { Button } from 'react-bootstrap';
import ArrowDownSvg from '../../assets/icons/arrow-down.svg';

interface TechZoneProps {
  handleViewAllProducts: () => void;
}

const TechZone: React.FC<TechZoneProps> = ({
  handleViewAllProducts
}) => {

  return (
    <>
      <div>
        <div className='illustration-container'>
          <div className='illustration'>
            <div className='illustration-bg'>
            </div>
            <div className='saly-19'>
              <img src={HeroDesktop} alt="" />
            </div>
            </div>
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
          <Button variant={'view-products'} onClick={(e: any) => handleViewAllProducts()}>
            <div className='view-products-text'>
              VIEW ALL PRODUCTS
            </div>
            <div className='arrow-down'>
              <img src={ArrowDownSvg} alt="" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default TechZone;
