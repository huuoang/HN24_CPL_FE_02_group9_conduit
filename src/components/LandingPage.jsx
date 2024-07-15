import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../LandingPage.css'

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
      const ARTICLEs_API = "https://api.realworld.io/api/articles";
      const TAGs_API = "https://api.realworld.io/api/tags";
      
      axios.get(ARTICLEs_API)
          .then((res) => { setArticles(res.data.articles) })
          .catch((err) => { console.log(err) });

      axios.get(TAGs_API)
          .then((res) => { setTags(res.data.tags) })
          .catch((err) => { console.log(err) });
  }, []);


    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">Global Feed</a>
                                </li>
                            </ul>
                        </div>

                        {articles.map((article, index) => (
                            <div key={index} className="article-preview">
                                <div className="article-meta">
                                    <div className="meta-left">
                                        <a href={`/profile/${article.author.username}`}><img src={article.author.image} alt={article.author.username} /></a>
                                        <div className="info">
                                            <a href={`/profile/${article.author.username}`} className="author">{article.author.username}</a>
                                            <span className="date">{new Date(article.createdAt).toDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="meta-right">
                                        <button className="btn btn-outline-primary btn-sm">
                                            <i className="ion-heart"></i> {article.favoritesCount}
                                        </button>
                                    </div>
                                </div>
                                <a href={`/article/${article.slug}`} className="preview-link">
                                    <h1>{article.title}</h1>
                                    <p>{article.description}</p>
                                    <span>Read more...</span>
                                    <ul className="tag-list">
                                        {article.tagList.map((tag, i) => (
                                            <li key={i} className="tag-default tag-pill tag-outline">{tag}</li>
                                        ))}
                                    </ul>
                                </a>
                            </div>
                        ))}

                        <ul className="pagination">
                            <li className="page-item active">
                                <a className="page-link" href="">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="">2</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {tags.map((tag, index) => (
                                    <a href={`/?tag=${tag}`} className="tag-pill tag-default" key={index}>{tag}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Articles;
