import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async ()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles)
    setPage(page+1)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsPanda`
    updateNews() ;
  }, [])
  
  
  // handleNextClick = async () => {
  //   console.log("Next")
  //   this.setState({ page: page + 1 });
  //   this.updateNews();
  // }
  // handlePreviousClick = async () => {
  //   console.log("Previous")
  //   this.setState({ page: page - 1 });
  //   this.updateNews();
  // }
  const fetchData = async ()=>{
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles)) 
  }
    return (
      <>
        <h1 className='text-center' style={{ margin: '35px 0px',marginTop:'90px' }}>NewsPanda - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={articles?articles.length:0} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
      <div className='container my-3'>
          <div className="row">
          {articles.map((element,index) => {
          return <div className="col-md-4" key={index}>
          <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
          })}</div>
      </div>
        </InfiniteScroll>
</>
)}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News

/* <div className="container d-flex justify-content-between">
  <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
  <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
  </div>  */
