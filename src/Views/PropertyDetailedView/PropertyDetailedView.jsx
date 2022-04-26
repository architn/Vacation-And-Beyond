import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookingCard from '../../components/Cards/Booking/BookingCard'
import Navbar from '../../components/Navbar/Navbar'
import MapView from '../Maps/Map'
import {useParams} from 'react-router-dom'
import '../PropertyDetailedView/PropertyDetailedView.css'
import Images from '../../data/images'

function createPropertyDetailedView(property){
  const shuffled = Images.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 5);

  return (
    <div>
      <h4>{property.title}</h4>
    <span>
      <img src='https://www.citypng.com/public/uploads/preview/hd-star-silhouette-pink-icon-transparent-background-11637144467w2sss8mpmm.png' alt='fav' className='fav'/>
      <span id='rating'>{5.0}</span>
      <span id='streetaddress'>{property.Street}, {property.City} - {property.Zip}, {property.Country}</span>
    </span>
    <br/><br/>
    <div className='row'>
      <div className='col-6'>
         <img src={selected[0]} alt='image1' className='bigImage' />
      </div>
      <div className='col-3'>
         <div className='col-6'>
              <img className='image2' src={selected[1]} alt='image2' />
         </div>
         <div className='col-6'>
           <br/>
            <img className='image2' src={selected[2]} alt='image3' />
         </div>
      </div>
      <div className='col-3'>
      <div className='col-6'>
          <img className='image2' src={selected[3]} alt='image3' />
         </div>
         <div className='col-6'>
         <br/>
            <img className='image2' src={selected[4]} alt='image3' />
           
         </div>
         </div>
    </div>
    <br/><br/>
    <div className='row'>
      <div className='col-8'>
        <h4>{property.subtitle}</h4>
        <span>{property.Guests} Guests &bull; {property.Beds} bedrooms &bull; {property.Beds} beds &bull; {property.Bathrooms} baths</span>
        <br/><hr/>
        <p>{property.Description}
        </p>
        <hr/>
        <h4>What this place offers</h4>
        <br/>
        <ul>
        <div className='row'>
            <div className='col-6'>
              <li>{property.features.isWifi ? <h5>
                <img alt='wifi' className='facilitiesImage' src="https://media.istockphoto.com/vectors/wifi-internet-icon-vector-wi-fi-wlan-access-wireless-wifi-hotspot-vector-id1138089587?k=20&m=1138089587&s=612x612&w=0&h=W3EZav0scWgnhfU3-3xN-2c6RY3KrTvYQobn2j7BRsU=" />
                    Wifi</h5>: null}</li> <br/>
              <li>{property.features.ac ? <h5>
                <img className='facilitiesImage' alt='AC' src='http://cdn.onlinewebfonts.com/svg/img_216815.png' />
                Air Conditioning</h5>: null}</li> <br/>
              <li>{property.features.bar ? <h5>
                <img className='facilitiesImage' alt='Bar' src='https://image.shutterstock.com/image-vector/bar-lettering-illustration-label-badge-260nw-1034296870.jpg' />
                Bar</h5>: null}</li> <br/>
              <li>{property.features.microwave ? <h5>
                <img className='facilitiesImage' alt='Microwave' src='https://thumbs.dreamstime.com/b/microwave-oven-sign-icon-roast-chicken-kitchen-electric-stove-symbol-vector-illustration-isolated-white-background-microwave-163151044.jpg' />
                Microwave</h5>: null}</li>
            </div>
            <div className='col-6'>
            <li>{property.features.fridge ? <h5>
                <img className='facilitiesImage' alt='Fridge' src='https://thumbs.dreamstime.com/b/fridge-vector-icon-freezer-illustration-symbol-refrigerator-symbol-logo-web-sites-mobile-fridge-vector-icon-freezer-160724574.jpg' />
                Refrigerator</h5>: null}</li><br/>
              <li>{property.features.fireplace ? <h5>
                <img className='facilitiesImage' alt='fireplace' src='https://cdn2.vectorstock.com/i/1000x1000/44/66/fireplace-icon-silhouette-design-vector-16854466.jpg' />
                Fireplace</h5>: null}</li> <br/>
              <li>{property.features.toaster ? <h5> 
                <img className='facilitiesImage' alt='Toaster' src='https://cdn2.vectorstock.com/i/1000x1000/86/11/a-gray-toaster-icon-vector-13418611.jpg' />
                Toaster</h5>: null}</li> <br/>
              <li>{property.features.tv ? <h5>
                <img className='facilitiesImage' alt='TV' src='http://simpleicon.com/wp-content/uploads/tv.png' />
                TV
              </h5>: null}</li>
            </div>
        </div>
        </ul>
      </div>
      <div className='col-4'>
        <BookingCard id={property._id}
        price={property.Price} 
        rating={3.2} 
        reviews={22}
        />
      </div>
    </div>
    <hr/>
    <h4>Where you'll be staying</h4>
    
    <div id='mapView'>
      <MapView lat={property.lat} lng={property.lng}/>
    </div>
    <hr/>
    <h3>Hosted by Evolve</h3>

    </div>
  )
}


function PropertyDetailedView() {
  const {propertyid} = useParams();
  const [detailedProperty, setProperty] = useState([]);
  
  useEffect( () => {
    axios
        .get(`http://localhost:3002/property/${propertyid}` ,
          { 
            withCredentials: true,
          }
      )
      .then((response) => {
        if (response.status === 200) {
          setProperty(response.data)
        }
      })
      .catch((err) => {
        console.log(err);
        //setError(err.response.data.msg);
      });
  }, [propertyid, detailedProperty._id]);
  return (
    <div className='container'>     
      <Navbar />

      {detailedProperty.length === 0 ? <div>No such property found!</div>: detailedProperty.map(createPropertyDetailedView)}
        </div>
  )
}

export default PropertyDetailedView