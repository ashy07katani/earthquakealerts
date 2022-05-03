import React, { Component } from 'react'
import FlashCard from './FlashCard'

export default class FlashQuake extends Component {
  render() {
    return (
      <div style={{height:"inherit",display:"flex",backgroundColor:"#8a7db8"}}>
          <marquee behavior="" direction="right">
              {/* 
           */}
          <div style={{height:"inherit",display:"flex"}}>{
                  this.props.data.map(city=>{
                      return <FlashCard key={city.id} data={city.properties}></FlashCard>
                  })
              }
              </div>
          </marquee>
      </div>
    )
  }
}
