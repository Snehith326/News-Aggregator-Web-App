import React, { Component } from 'react'

export default class Newsitem extends Component {
   
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source}=this.props
        return (
            <div className='my-5'>
            
            <div>
                <div className="card shadow">
                    {imageUrl && (
                      <img src={imageUrl} className="card-img-top" alt="..." />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{title}...<span className="position-absolute top-0 start-0 badge rounded-pill bg-danger" style={{margin: '0.5em'}}>
    {source && source.name ? source.name : 'Unknown Source'}
    <span className="visually-hidden"></span></span></h5>
                        <p className="card-text">{description}</p>
                        <p className="class-text">
                          <small className='text-muted'>
                            By {!author ? "unknown" : author} on {date ? new Date(date).toString() : ""}
                          </small>
                        </p>
                    </div>
                </div>
            </div>

            {/* Rope and swinging button below the card */}
            <div className="disclose-swing-center">
                <div className="disclose-rope"></div>
                <a
                  href={newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary disclose-btn"
                >
                  disclose
                </a>
            </div>

            </div>
        )
    }
}

