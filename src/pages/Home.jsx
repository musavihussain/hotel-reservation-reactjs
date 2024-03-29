import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

const Home = () => {
    return (
        <>
        <Hero>
            <Banner title="Hotel Reservation 5 Stars" subtitle="Room starting at $55">
            <Link to="/rooms" className="btn-primary">Our Rooms</Link>
            </Banner>
        </Hero>
        <Services/>
        <FeaturedRooms/>
                 
        </>
    )   
}

export default Home
