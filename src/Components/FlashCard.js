import React, { Component } from 'react'

export default class FlashCard extends Component {


    cardStyle =  {backgroundColor:"#8a7db8",color:"white", height:"60px"}
     render() {
    return (
      <div className='container text-center' style={this.cardStyle}> 
          <div style={{fontSize:"12px"}}>
          <strong>{this.props.data.title}</strong>
          <p>{Math.floor((new Date().getTime() - this.props.data.time)/(60*60*1000))} Hrs ago</p>
          </div>
      </div>
    )
  }
}
