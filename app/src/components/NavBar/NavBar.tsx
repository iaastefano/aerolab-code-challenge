import React from 'react';
import { IUser } from '../../no-state/users/models';
import chevronActiveIcon from '../../assets/icons/chevron-active.svg';
import aeropayOne from '../../assets/icons/aeropay-1.svg';
import aeropayTwo from '../../assets/icons/aeropay-2.svg';
import aeropayThree from '../../assets/icons/aeropay-3.svg';
import aerolabLogo from '../../assets/icons/aerolab-logo-1.svg';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

interface NavBarProps {
  user: IUser;
  handleAddPoints: () => void;
  setAddPointsOption: (option: number) => void;
  addPointsOption: number;
}

const NavBar: React.FC<NavBarProps> = ({
  user, handleAddPoints, setAddPointsOption, addPointsOption
}) => {

  const addPointsOptions = [1000, 5000, 7500];

  const popover = (
    <Popover id="popover-basic" className='balance-card'>
      <Popover.Header className='header'>
          Add Balance
      </Popover.Header>
      <Popover.Body className='body'>
        <div className='aerocard'>
          <div className='aerocard-background'>
          </div>
          <div className='name-and-icon'>
            <div>
              <span className='secondary-color semi-bold'>Aerocard</span>
            </div>
            <div>
              <img src={aeropayTwo} alt="aeropayTwo" />
            </div>
          </div>
          <div className='name-and-date'>
            <div>
              <span className='secondary-color'>{user.name}</span>
            </div>
            <div>
              <span className='secondary-color'>07/23</span>
            </div>
          </div>
        </div>
        <div className='amount-and-cta'>
          <div className='amounts'>
            <Button variant={addPointsOption !== 0 ? 'selectors' : 'selectors-active'} onClick={(e: any) => setAddPointsOption(0)}>
              <span className={addPointsOption !== 0 ? 'selectors-text semi-bold' : 'selectors-text-active semi-bold'}>
                {addPointsOptions[0]}
              </span>
            </Button>
            <Button variant={addPointsOption !== 1 ? 'selectors' : 'selectors-active'} onClick={(e: any) => setAddPointsOption(1)}>
              <span className={addPointsOption !== 1 ? 'selectors-text semi-bold' : 'selectors-text-active semi-bold'}>
                {addPointsOptions[1]}
              </span>
            </Button>
            <Button variant={addPointsOption !== 2 ? 'selectors' : 'selectors-active'} onClick={(e: any) => setAddPointsOption(2)}>
              <span className={addPointsOption !== 2 ? 'selectors-text semi-bold' : 'selectors-text-active semi-bold'}>
                {addPointsOptions[2]}
              </span>
            </Button>
          </div>
          <Button variant='cta' onClick={(e: any) => handleAddPoints()}>
            <div className='frame153'>
              <div>
                <img src={aeropayThree} alt="aeropayThree" />
              </div>
              <div className='add-points'>
                Add Points
              </div>
            </div>
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className='nav-bar'>
        <div className='aerolab-logo'>
          <img src={aerolabLogo} alt="" />
        </div>
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
          <Button variant="aero-coins">
            <div>
              <img className='aeropay-logo' src={aeropayOne} alt='aeropay-logo'></img>
            </div>
            <span className='coin-amount'>
              {user.points}
            </span>
            <div className='icons' style={{"transform": "rotate(180deg)"}}>
              <img src={chevronActiveIcon} alt="chevron-active"/>
            </div>
          </Button>
        </OverlayTrigger>
      </div>
    </>
  );
};

export default NavBar;
