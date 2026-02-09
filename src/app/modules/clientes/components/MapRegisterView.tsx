import React, { useMemo, useEffect, useState } from "react";

//import Hola from "../styles/hola";



import axios from "axios";
import Switch from '@mui/material/Switch';
//import useInterval from "use-interval";

import { Typography } from "@mui/material";
import { TileLayer, MapContainer, Polygon, Polyline, Rectangle, Marker, useMap } from 'react-leaflet'
//import Hola from '../styles/Hola'
//import styles from '../styles/Home.module.css'

import "leaflet/dist/leaflet.css";


import L from "leaflet";


const label = { inputProps: { 'aria-label': 'Switch demo' } };


/**Congifuracion de icono */
var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50],
  shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
  }
});

const customIcon = new LeafIcon({
  iconUrl: "/marker.png"
});


const MapRegisterView = (props:any) => {

  const {updatePosicionMap} = props;


  const [origin, setOrgin] = useState({
    lat: 0,
    lng: 0,

    //  lat : -17.392655 , lng : -66.275367
  })

  const [mesage, setMesage] = useState({})

  // ON/OFF
  const [checked, setChecked] = React.useState(false);

  // time controller  30 seg = 30*1000
  const [delay, setDelay] = useState(30000)

  const [count, setCount] = useState(1);

  const [checkstate, setCheckstate] = useState("OFF");

/*
  useInterval(
    () => {
      // Your custom logic here
      console.log("api activated")
      getLocation();
    //  apicallGeoLatLonNotAlert()
      setCount(count + 1)

    },


    // Delay in milliseconds or null to stop it
    checked ? delay : null,
  )
*/
  useEffect(() => {

    getLocation();
  }, [])


  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.latitude);
      updatePosicionMap(position.coords.longitude, position.coords.latitude)
      setOrgin({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        //lat: -17.392655, lng: -66.275367
      })
      

    },
      function (error) {
        console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    );
  }


 



  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  const handleChange = (event:any) => {
    const valuecheck = event.target.checked;
    setChecked(event.target.checked);

    if (valuecheck) {
      //console.log("es verdadero")
      setCheckstate("ON")
    } else {
      setCheckstate("OFF")
    }


  };
  {/*if (!userActive) {
    return (
      <Typography style={{ marginTop: '100px', textAlign: "center", color: 'black' }} variant="h6" noWrap>
        Invalid session
      </Typography>
    )
  }*/}

  function ChangeView({ center, zoom }:any) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (


    <>
      <div style={{ width: '100%'}}>
        <MapContainer center={origin} zoom={13}   style={{ height: '400px', width: '100%'}}>
          <ChangeView center={origin} zoom={13} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable position={origin}

            icon={customIcon} />
        </MapContainer>
      </div>
      {/* <GoogleMap zoom={10} center={origin} mapContainerStyle={containerStyle}>
       
        <MarkerF
          draggable

          position={origin}
          onDragEnd={(direction) => setOrgin({
            lat: direction.latLng.lat(),
            lng: direction.latLng.lng()
          })}
        />
      </GoogleMap>*/}
     {/* <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center'
      }}>
        <br />
     
        <div style={{
          backgroundColor: 'white'
        }}>{count} lat : {origin.lat} , lng : {origin.lng}</div>
     

      </div>*/}
    </>



  );
}

export default MapRegisterView

