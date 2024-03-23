import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
// import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
        country:'in',
        category:'general'
    }

    static propTypes={
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor(props){
        super(props);
        console.log("constructor from news component.")
        this.state={

            articles:[],
            page:1,
            loading:false,
            totalResults:0
        }
        document.title=`DeezNews - ${this.props.category}`;
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        console.log("Previous")
        this.setState({
            page:this.state.page-1
        })
        this.updateNews();
    }

    handleNextClick = async ()=>{
        console.log("Next");
        // if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

        // }
        // else{
        this.setState({page:this.state.page+1})
        this.updateNews();
        // }
    }
    async updateNews(){
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=7054bd64396e4280880849c02bc2d01a&page=${this.state.page+1}&pageSize=20&category=${this.props.category}`;
        this.setState({
            loading:true
        })
        let data=await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>DeezNews - Top Headlines</h1>
        {this.state.loading && <div className='text-center'><Spinner/></div>}
        {!this.state.loading && <div className='row'>
                {this.state.articles.map((element)=>{
                    if(element.urlToImage){ 
                    return element.author && <div className='col-md-4' key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    }
                    
                })}
        </div>}
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" class="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News