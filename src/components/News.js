import React, { Component } from 'react'
import Newsitem from './Newsitem'
import sampleData from '../sampleoutput.json';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    constructor()
    {
        super();
        this.state={
            articles: [],
            loading: false,
            page:1
        }
    }
    static defaultProps={
        country:'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    async updateNews(page) {
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f67b940c0351498f875f13c1d2f43e4f&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsed = await data.json();
        this.setState({
            page: page,
            articles: Array.isArray(parsed.articles) ? parsed.articles : [],
            totalResults: parsed.totalResults || 0,
            loading: false
        });
    }
    async componentDidMount() {
        this.updateNews(1);
    }
    handlePrevClick = async () => {
        this.updateNews(this.state.page - 1);
    }
    handleNextClick = async () => {
        if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))
        {   

        }
        else
        {
            this.updateNews(this.state.page + 1);
        }
    }
    
  render() {
    return (
        <div className='container my-3'>
         <h1 className="text-center">Crunchy News of {this.props.category} </h1>
         {this.state.loading && <Spinner/>}
            <div className='row'>
             {!this.state.loading && (this.state.articles || []).map((element)=>
            {
                return <div className='col-md-4'  key={element.url}>
                
                    <Newsitem
                        
                      title={element.title ? element.title.slice(0,30) : ""}
                      description={element.description ? element.description.slice(0,88) : ""}
                      {...(element.urlToImage ? { imageUrl: element.urlToImage } : {})}
                      newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}
                    ></Newsitem>
               
                </div>
            })}
                
            </div>
            <div className="d-flex justify-content-between my-4">
              <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-primary"> &larr; Previous</button>
              <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr; </button>
            </div>
            {this.state.error && (
                <div className="alert alert-danger text-center">{this.state.error}</div>
            )}
        </div>
    )
  }
}

