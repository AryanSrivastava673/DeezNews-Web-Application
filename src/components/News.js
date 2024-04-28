import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

// import PropTypes from 'prop-types'

const News=(props)=>{

    const [articles,setArticles]=useState([])
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(true)
    const [totalResults,setTotalResult]=useState(0)

   useEffect(() => {
        updateNews();
   }, [])
   
    const handlePrevClick = async ()=>{
        console.log("Previous")
        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async ()=>{
        console.log("Next");
        setPage(page+1)
        updateNews();
    }
    const updateNews= async()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=20&category=${props.category}`;

        setLoading(true)
        let data=await fetch(url);
        let parsedData= await data.json();
        
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    return (
      <div className='container my-3'>
        <h1 className='text-center'>DeezNews - Top Headlines</h1>
        {loading && <div className='text-center'><Spinner/></div>}
        {!loading && <div className='row'>
                {articles.map((element)=>{
                    if(element.urlToImage){ 
                    return element.author && <div className='col-md-4' key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    }
                    
                })}
        </div>}
        <div className='container d-flex justify-content-between'>
            <button disabled={page<=1} type="button" className="btn btn-primary" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled={page+1>Math.ceil(totalResults/20)} type="button" class="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )

}
News.defaultProps={
    country:'in',
    category:'general'
}

News.propTypes={
    country: PropTypes.string,
    category: PropTypes.string
}

export default News