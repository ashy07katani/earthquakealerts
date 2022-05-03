import React, { Component } from 'react'
import warning from "./alertTunenhk.mp3"
export default class Alert extends Component {

    constructor()
    {
        super()
        this.state = {
            playing : false
        }
    }
    audio = new Audio(warning)
    componentDidMount()
    {
        //this.audio.muted = true
        this.audio.play()
    }
    //component
    // componentWillMount()
    // {
    //     console.log("alert playing!!!",this.props.msg)
        
    //     audio.play()
    // }
        // audio.muted=true
    //     audio.play()
    //     
    //     audio.muted=false
    //     audio.play()
    // }
  render() {
      
      {  this.audio.play()  }
    return (
        this.props.msg&&<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"></svg>
        <div>
          {this.props.msg}
        </div>
      </div>
    )
  }
}
