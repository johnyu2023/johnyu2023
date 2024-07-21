import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/navigation';
import Card from '../../components/card';
import Tabs from './tabs';
import Creation from './Creation';
import AdvancedBtns from './AdvancedBtns';
import SelfFunctions from './SelfFunctions';

type Props = {}

export default function Home({}: Props) {
  return (
    <div className='bg-gray-100'>
        <Navigation />
        <div className='mx-auto max-w-6xl flex my-2 px-20'>
          <Card className=" w-2/3">
            <Tabs />
          </Card>
          <div className='flex-1 w-1/3'>
            <Card className='w-full'>
              <Creation />
            </Card>
            <Card className='w-full'>
              <AdvancedBtns />
            </Card>
            <Card className='w-full'>
              <SelfFunctions />
            </Card>
          </div>
        </div>
    </div>
  );
}