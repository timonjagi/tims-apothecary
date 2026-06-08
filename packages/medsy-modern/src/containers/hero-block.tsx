import React, { useContext, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import Carousel from 'components/carousel/carousel';
import CouponImg from 'assets/image/coupon-card.png';
import OrderImg from 'assets/image/custom-order.png';
import DeliveryImg from 'assets/image/fast-delivery.png';
import FemaleCareImg from 'assets/image/female-care.png';
import { StickyContext } from 'contexts/sticky/sticky.provider';

const data = [
  {
    id: 1,
    image: DeliveryImg.src,
    link: '#',
    title: 'Fast delivery',
  },
  {
    id: 2,
    image: CouponImg.src,
    link: '#',
    title: 'Coupon savings',
  },
  {
    id: 3,
    image: OrderImg.src,
    link: '#',
    title: 'Custom order',
  },
  {
    id: 4,
    image: FemaleCareImg.src,
    link: '#',
    title: 'Female care',
  },
];

export default function HeroBlock() {
  const { dispatch } = useContext(StickyContext);

  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);

  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };

  return (
    <div className="w-full relative my-35px">
      <Carousel data={data} itemClass="px-5px" />
      <Waypoint
        onEnter={removeSticky}
        onLeave={setSticky}
        onPositionChange={onWaypointPositionChange}
      />
    </div>
  );
}
