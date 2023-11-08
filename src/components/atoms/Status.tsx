import React from 'react';
import dotGreen from '~/assets/images/dotGreen.svg';
import dotOrange from '~/assets/images/dotOrange.svg';
import Svg from './Svg';
import { AllStatus } from '~/utils/constant';

interface Props {
  status: any;
}

const Status = (props: Props) => {
  const { status } = props;
  return (
    <div className='ml-3 flex items-center'>
      { status === AllStatus.ACTIVE ?
        <Svg src={dotGreen}/>
        :
        <Svg src={dotOrange}/>
      }
    </div>
  )
}

export default Status