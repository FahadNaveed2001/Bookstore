import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './mps.scss';
import axios from 'axios';
import { AutocompleteService } from 'react-google-autocomplete';

function Mps() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const variants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=API KEY HERE=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new window.google.maps.LatLng(latitude, longitude);

          const mapOptions = {
            center: userLocation,
            zoom: 14,
          };

          const mapInstance = new window.google.maps.Map(document.getElementById('map'), mapOptions);
          setMap(mapInstance);

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results, status) => {
            if (status === 'OK' && results[0]) {
              setLocation(results[0].formatted_address);
            }
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          initializeDefaultMap();
        }
      );
    } else {
      initializeDefaultMap();
    }
  };

  const initializeDefaultMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 8,
    };
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    setMap(mapInstance);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);
  
    // Check if the Google Maps API is available
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocomplete = new window.google.maps.places.AutocompleteService();
      autocomplete.getPlacePredictions({ input: inputValue }, (predictions, status) => {
        if (status === 'OK') {
          setSuggestions(predictions.slice(0, 3));
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    } else {
      console.error('Google Maps API not loaded yet. Please wait.');
      // You might want to handle this case differently, e.g., show a loading indicator
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.description);

    const placesService = new window.google.maps.places.PlacesService(map);

    if (suggestion.place_id) {
      placesService.getDetails({ placeId: suggestion.place_id }, (place, status) => {
        if (status === 'OK') {
          map.setCenter(place.geometry.location);
          map.setZoom(14);
          setSuggestions([]);
          setShowSuggestions(false);
        } else {
          console.error('Error fetching place details:', status);
        }
      });
    }
  };

  const handleClickOutside = (event) => {
    if (suggestions.length > 0 && !event.target.closest('.suggestions')) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [suggestions]);

 
const handleSubmit = async (event) => {
  event.preventDefault();


  const userToken = 'secretkey';

  if (location !== null && userToken) {
    try {
      await axios.post('http://localhost:3001/updateLocation', {
        location,
        token: userToken, 
      });

      alert('Location successfully added');
    } catch (error) {
      console.log('Unable to add location:', error);
      alert('Unable to add location');
    }
  }
};
  

  return (
    <motion.div className="mps" variants={variants} initial="initial" animate="animate">
      <motion.h1 className="mpstext" variants={variants} initial="initial" animate="animate">
        Locate Yourself
      </motion.h1>
      <form onSubmit={handleSubmit}>
        <input
          id="locationInput"
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={handleInputChange}
        />
        <button type="submit">Submit Location</button>
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
        <ul className={`suggestions ${showSuggestions ? 'show' : ''}`}>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      </form>
    </motion.div>
  );
}

export default Mps;
