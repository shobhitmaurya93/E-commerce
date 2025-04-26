import React from 'react'
import MainBanner from '../component/MainBanner'
import Categories from '../component/Categories';
import PopularProducts from '../component/PopularProducts';
import FBanner from '../component/FBanner'

const Home = () => {
  return (
    <div>
        <MainBanner/>
        <Categories/>
        <PopularProducts/>
        <FBanner/>
    </div>
  )
}

export default Home;