import React, { Component } from "react";
import QuakeMap from "./Components/QuakeMap";
import QuakeList from "./Components/QuakeList";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import danger from './Components/danger.png'
import mild from './Components/mild.png'
import normal from './Components/normal.png'
import extreme from './Components/extreme.png'
import { Icon } from "leaflet";
import Alert from "./Components/Alert";
import Navbar from "./Components/Navbar";
import QuakeNews from "./Components/QuakeNews";
import FlashQuake from "./Components/FlashQuake";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  constructor() {
    super();
    // createRef create ref, ref will be give us the access to the node directly.
    this.myRef = React.createRef()
    this.state = {
      earthquakes: [],
      loading:true,
      mapProps:{
        center:[0, 0],
        zoom:2.45,
        time : Date.now()
      },
      alert : null,
      from : 1
    }
  }

  mapstyle = {
    width: "99.9%",
    height: "100%",
    position: "absolute",
    left : "1px"
  };

  
  //this function will add the marker for a particular city.
  renderMarker = (city) => 
   { 
     let length = city.properties.mag > 6
     ? 40
     : city.properties.mag > 5
     ? 30
     : city.properties.mag > 4
     ? 25
     : 20
     let breadth = length
     let icon = new Icon({iconUrl:city.properties.mag > 6
    ? extreme
    : city.properties.mag > 5
    ? danger
    : city.properties.mag > 4
    ? mild
    : normal,
    iconSize:[length,breadth]
   })
    return (
      <Marker
        key={city.id}
        position={[city.geometry.coordinates[1], city.geometry.coordinates[0]]}
        icon={icon}
      >
        <Popup>
          {city.properties.title}. <br />{" "}
          {new Date(city.properties.time).toGMTString()}<br/>
          <strong>{city.distance.toFixed(2)} Kms away from you.</strong><br/>
          {city.properties.tsunami
            ? "TSUNAMI WARNING ISSUED!!"
            : "No Tsunami Warning issues"}
        </Popup>
      </Marker>
    );
  };


  count=0
  prevFrom = 1
  TODAY = new Date()
  FROMDAY = new Date(this.TODAY.getTime() - 24*60*60*1000)
  URL =`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.FROMDAY.toISOString().slice(0,19)}&endtime=${this.TODAY.toISOString().slice(0,19)}`;

  //this function will take you to the earthquake area
  takeMeToQuake = (quakeProp)=>
  {
    this.setState({
      mapProps : {...quakeProp}
    })
    //this.myRef.current.flyTo method gives you the freedom to add the animation 
    console.log("FLYY ME TO THE MOON",this.myRef.current.flyTo([...this.state.mapProps.center],this.state.mapProps.zoom),{duration:2})
  }

  onChangeDate = (day)=>
  {
    //console.log("inside on changeDate")
      // this.fetchData(day)
      this.setState({
        from : day
      })
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    // var R = 6371; // Radius of the earth in km
    // var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    // var dLon = this.deg2rad(lon2-lon1); 
    // var a = 
    //   Math.sin(dLat/2) * Math.sin(dLat/2) +
    //   Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    //   Math.sin(dLon/2) * Math.sin(dLon/2)
    //   ; 
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    // var d = R * c; // Distance in km
    // return d;
    
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
   
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2);
               
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
        
        // calculate the result
        return(c * r);
        
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  fetchData = async(from) =>
  {
    let TODAY = new Date()
    let FROMDAY = new Date(this.TODAY.getTime() - 24*60*60*1000*from)
    console.log("this from is: ",this.state.from)
    TODAY=TODAY.toISOString().slice(0,19)
    FROMDAY=FROMDAY.toISOString().slice(0,19)
    console.log("today: ",TODAY,"FROM: ",FROMDAY)
    let URL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${FROMDAY}&endtime=${TODAY}`;
    //console.log("inside fetch: ",URL===this.URL)
    //console.log("get data",this.URL)
    let data = await fetch(URL);
    let parsedData = await data.json();
    let distanceDone = true
    //console.log("here is the parsedData",parsedData)
    navigator.geolocation.getCurrentPosition((position)=>{

      //console.log(position.coords.latitude,position.coords.longitude)
    //generate alert for closest city for its recent earthquake.
    let closestDist = Number.MAX_SAFE_INTEGER
    let closestCity = null
      parsedData.features.map((city)=>{
        //console.log("no hello",city)
        city["distance"] = this.getDistanceFromLatLonInKm(city.geometry.coordinates[1],city.geometry.coordinates[0],position.coords.latitude,position.coords.longitude)
        
        //city["distance"] < 500 && ((new Date().getTime() - city.properties.time)/(60000)) > 60 && !this.state.alert ? this.setState({alert:`EarthQuake Warning!!! : ${city.properties.title}`}) : console.log("no alert")
        if(closestDist > city["distance"])
        {
          closestDist = city["distance"]
          closestCity  =  city.properties
        }
      })
      //console.log("closestCity: ",closestCity)
      //console.log("time elapsed: ",(new Date().getTime() - closestCity.time)/(3600000))
      if((!this.state.alert && (new Date().getTime() - closestCity.time)/(60000)) < 5 ) 
      {this.setState({alert:`EarthQuake Warning!!! : ${closestCity.title}`})}
      //console.log(parsedData.features[0].distance)
      distanceDone = false
      this.setState({
        earthquakes: parsedData.features,
        loading:false,
        mapProps:{
          center:[0, 0],
          zoom:2.45,
          time : Date.now()
        }
      });
      
    })
    {setTimeout(()=>{
      if(this.state.alert)
      {//console.log("taking notification down!!");
      this.setState({alert:null})}}
      ,5000) }
  }
  async componentDidMount() {
    this.setState({
      loading:true
    })
    
    //console.log("component did mount called")

    await this.fetchData(this.state.from)
    // let data = await fetch(this.URL);
    // let parsedData = await data.json();
    // let distanceDone = true
    // console.log("here is the parsedData",parsedData)
    // navigator.geolocation.getCurrentPosition((position)=>{

    //   console.log(position.coords.latitude,position.coords.longitude)
    //   parsedData.features.map((city)=>{
    //     city["distance"] = this.getDistanceFromLatLonInKm(city.geometry.coordinates[1],city.geometry.coordinates[0],position.coords.latitude,position.coords.longitude)
    //   })
    //   console.log(parsedData.features[0].distance)
    //   distanceDone = false
    //   this.setState({
    //     earthquakes: parsedData.features,
    //     loading:distanceDone
    //   });
    // })
    // if(this.state.alert)
    // {
    //   setTimeout(()=>{console.log("taking notification down!!");this.setState({alert:null})},1000)
    // }
    
    setInterval(() => {
      this.fetchData(this.state.from)
      //console.log("counter :",++this.count)
    }, 300000);
    
  }

   componentDidUpdate =async ()=>{
      if(this.prevFrom !== this.state.from)
      {
        //console.log("prev state: ",this.prevFrom,"current state",this.state.from)
        await this.fetchData(this.state.from)
        this.prevFrom = this.state.from
      }
  }

  render() {
     //console.log("RENDER METHOD IS CALLED!!!")
    return (
      <Router>
      
      {!this.state.loading  &&
      <div style={{overflowX:"hidden"}}>
      <Navbar fromChange={this.onChangeDate}></Navbar>
      <div style={{height:"60px",overflowY:"hidden"}}>
      {this.state.alert&&<Alert msg={this.state.alert} style={{zIndex:"1"}}></Alert>}
      <FlashQuake data={this.state.earthquakes}></FlashQuake>
      </div>
      
      <div style={{display:"flex",width:"100vw",height:"81.5vh"}}>
        
        <QuakeList data={this.state.earthquakes} onClickQuake={this.takeMeToQuake} ></QuakeList>
        {/* <QuakeMap data={this.state.earthquakes} mapProp = {this.state.mapProps} ></QuakeMap> */}

        {/*map container */}
        <div className="container" style={{position:"relative",height:"100%", paddingLeft:"1px",paddingRight:"0"}}>
        {/* {console.log(this.state.mapProps.center,this.state.mapProps.zoom)} */}
        <Routes>
        <Route exact path="/" element={
        !this.state.loading&&<MapContainer
        ref={this.myRef}
        center={[...this.state.mapProps.center]}
        zoom={this.state.mapProps.zoom}
        scrollWheelZoom={false}
        style={this.mapstyle}
        key={new Date().getTime()}
      >
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />

        {this.state.earthquakes.map(this.renderMarker)}
      </MapContainer> }/>
      <Route exact path="/news" element={<QuakeNews></QuakeNews>} key={new Date().getTime()-1}/>
      </Routes>
      
      </div>
      </div>
      </div>
  }

    </Router>
    );
  }
}
