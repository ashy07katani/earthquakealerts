import React, { Component } from 'react'
import defaultImg from "./news-default.jpeg";
export default class QuakeNewsItem extends Component {
    render() {
        let { title, description, imgurl, newsurl, author, date, source } =
          this.props;
        return (
          <div className="card">
            <div style={{display:"flex",justifyContent:"flex-end",position:"relative"}}>
              <span
                className="badge rounded-pill bg-danger"
                style={{position:"absolute",right:"0"}}
              >
                {source}
              </span>
            </div>
            <img src={imgurl ? imgurl : defaultImg} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {title ? title.slice(0, 45) : ""}
                {title.length > 45 ? "..." : ""}
              </h5>
              <p className="card-text">
                {description ? description.slice(0, 88) : ""}...
              </p>
              <p className="card-text">
                <small className="text-muted">
                  By: {author ? author : "Unknown"}&nbsp;&nbsp;&nbsp;&nbsp;
                  {new Date(date).toGMTString()}
                </small>{" "}
              </p>
              <a
                href={newsurl}
                target="_blank"
                className="btn btn-sm btn-primary btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        );
      }
}
