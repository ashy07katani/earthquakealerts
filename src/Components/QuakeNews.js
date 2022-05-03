import React, { Component } from 'react'
import QuakeNewsItem from './QuakeNewsItem'

export default class QuakeNews extends Component {
    NewsUrl = `https://newsapi.org/v2/everything?q=earthquake&apiKey=1ad5e429f86b40f798d7a22dc0c56f76`
    constructor()
    {
        super()
        this.state = {data:[],loading:true}
    }
    //myArr = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    async componentDidMount()
    {
       this.setState({loading:true})
       let data =  await fetch(this.NewsUrl)
       let parseData = await data.json()
       this.setState({data:parseData.articles,loading:false})
    }
  render() {
    return (
       
          !this.state.loading && <div  style={{overflowY:"scroll",height:"inherit",overflowX:"hidden"}}>
            <div className="row">
            {
            this.state.data.map(element =>{
                return (<div className="col-md-4" >
                <QuakeNewsItem title={element.title}
                    description={element.description}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    key={element.url} 
                    ></QuakeNewsItem>
                </div>) 
            })
            }
            </div>
        </div>
        
    )
  }
}
