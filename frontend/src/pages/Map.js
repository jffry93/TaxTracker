import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  Circle,
  InfoWindow,
  Autocomplete,
} from '@react-google-maps/api';

//LIBRARIES
const library = ['places'];
//MAP COMPONENT STYLE
const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 60px)',
};
// MARKER COMPONENT STYLE
const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};
//MARKERS LOCATIONS
const locations = [
  {
    lat: 43.6632,
    lng: -79.3832,
  },
  {
    lat: 43.6632,
    lng: -79.3432,
  },
  {
    lat: 43.6552,
    lng: -79.3832,
  },
];
//CIRCLE COMPONENT STYLE
const CircleStyles = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 8000,
  zIndex: 1,
};
//USER LOCATION
const onLoad = (info) => {
  console.log('onLoad infoBox: ', info);
};

// const onUnmount = (circle) => {
//   console.log('Circle onUnmount circle: ', circle);
// };

const Map = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState('');
  //USER LOCATION
  const [center, setCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });
  //AUTOCOMPLETE COMPONENT
  const [search, setSearch] = useState('');
  const [array, setArray] = useState('');
  const onSBLoad = (ref) => {
    console.log('hello');
    setArray(ref);
    console.log(search);
  };

  return (
    <>
      <LoadScript
        libraries={library}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          clickableIcons={true}
        >
          <Autocomplete
            onLoad={onSBLoad}
            onPlaceChanged={() => {
              setCenter({
                lat: array.getPlace().geometry.location.lat(),
                lng: array.getPlace().geometry.location.lng(),
              });
              // console.log(array.getPlace().geometry.location.lat());
              // console.log(array.getPlace().geometry.location.lng());
            }}
          >
            <input
              type='text'
              placeholder='Customized your placeholder'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </Autocomplete>
          <Circle
            // optional
            // onLoad={onLoad}
            // // optional
            // onUnmount={onUnmount}
            // required
            center={center}
            // required
            options={CircleStyles}
          />
          <MarkerClusterer options={options}>
            {(clusterer) =>
              locations.map((location, index) => (
                <div key={index}>
                  <Marker
                    key={index}
                    position={location}
                    clusterer={clusterer}
                    onClick={() => {
                      setState({ location, index });
                    }}
                  >
                    {state.index === index && (
                      <InfoWindow position={location} onLoad={onLoad}>
                        <StyledBox>
                          <h3>{location.lng}</h3>
                          <h3>{location.lat}</h3>
                          <button onClick={handleShow}>More Info</button>
                        </StyledBox>
                      </InfoWindow>
                    )}
                  </Marker>
                </div>
              ))
            }
          </MarkerClusterer>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
      <Button variant='primary'>Launch demo modal</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{state ? state.location.lng : ''}</Modal.Title>
          <Modal.Title>{state ? state.location.lat : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Map;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8px;
  background-color: grey;
  border: 2px solid black;
`;
