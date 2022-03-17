import React from 'react';

interface IntroCardProps {
  type: string;
  title: string;
  text: string;
  icon: string;
  image: string;
}

const IntroCard: React.FC<IntroCardProps> = ({
  type,
  title,
  text,
  icon,
  image
}) => {

  return (
    <>
      <div className={'intro-card-' + type}>
        <div className='top-card'>
          <div className='card-illustration-bg'>
          </div>
          <div className='saly-31'>
            <img src={image} alt="" />
          </div>
        </div>
        <div className='bottom-card'>
          <div className='title-and-icon'>
            <div className='icon-wrapper'>
              <div className='icons'>
                <img src={icon} alt="" />
              </div>
            </div>
            <div className='title'>
              {title}
            </div>
          </div>
          <div className='card-paragraph'>
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroCard;
