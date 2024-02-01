import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components'

const AnyReactComponent = ({ image }) => (
  <MapMarker>
    <GatsbyImage className="custom-map-marker" image={image} alt="Marker" />
  </MapMarker>
);

class StudioMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.730267,
      lng: -73.956865
    },
    zoom: 15,
    zoomControl: true,
    disableDoubleClickZoom: true,
    mapTypeControl: true,
    scaleControl: true,
    scrollwheel: true,
    panControl: true,
    streetViewControl: true,
    draggable : true,
    overviewMapControl: true,
    overviewMapControlOptions: {
        opened: false,
    },
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ],
  };

  createMapOptions = (maps) => {
    return {
      zoomControl: this.props.zoomControl,
      disableDoubleClickZoom: this.props.disableDoubleClickZoom,
      mapTypeControl: this.props.mapTypeControl,
      scaleControl: this.props.scaleControl,
      scrollwheel: this.props.scrollwheel,
      panControl: this.props.panControl,
      streetViewControl: this.props.streetViewControl,
      draggable: this.props.draggable,
      overviewMapControl: this.props.overviewMapControl,
      overviewMapControlOptions: this.props.overviewMapControlOptions,
      styles: this.props.styles, // your styles are applied here
    };
  };

  render() {
    return (
      <MapContainer>
        <div style={{ height: '365px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDatEM3tCs7JMX8f9g2a4GolKtWG95kHas' }}
          defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            options={this.createMapOptions}
        >
          <AnyReactComponent
              lat={40.729987}
              lng={-73.958938}
              image={this.props.markerImage}
            />
        </GoogleMapReact>
        
        </div>
        <p>37 Greenpoint Avenue<br/>
          Brooklyn, NY 11222<br/>
          Office: 929.295.0385<br/>
          <a href="mailto:info@studiosc.net">info@studiosc.net</a></p>
      </MapContainer>
    );
  }
}

const MapMarker = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  .gatsby-image-wrapper,
  .custom-map-marker,
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
  }
`

const MapContainer = styled.div`
  max-width: 1220px;
  padding: 0 50px;
  margin: 0 auto;
  margin-bottom: 50px;
`

export default StudioMap;

