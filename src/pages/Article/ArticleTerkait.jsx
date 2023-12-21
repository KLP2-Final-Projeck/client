import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbars from "../Navbar";

function ArticleTerkait() {
  const { tag } = useParams();
  const [article, setArticle] = useState([]);
  const [articleTerkait, setArticleTerkait] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("URL_ARTICLE_API");
        const data = await response.json();
        setArticle(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, []);

  useEffect(() => {
    setArticleTerkait(article.filter((item) => item.hashtag.includes(tag)));
  }, [article, tag]);

  return (
    <>
      {" "}
      <Navbars />
      <div className="container mt-4">
        <div className="artikel" id="artikel"></div>
        <h3 className="text-start mb-3">Artikel Terkait &quot; {tag} &quot;</h3>
        <div style={{ border: "0.5px solid #bfbfbf" }}></div>
        {isLoading ? (
          <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
            <span className="mx-2 h1">loading</span>
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          articleTerkait.map((item) => (
            <div className="articlesContent" key={item.id}>
              <div className="row ms-1 me-1 mt-5 mb-5">
                <div className="col-md-4 p-0 me-4">
                  <img id="articlesImage" src={item.url} alt="Images " />
                </div>
                <div
                  id="detailPreviewArticles"
                  className="col-md-7 ps-0 pe-0 mt-2"
                >
                  <p className="hashTag mb-1  p-0">
                    <span id="category">{item.category}</span>{" "}
                    <span id="dot"></span>
                    {item.hashtag.map((hashTag) => (
                      <Link
                        key={hashTag}
                        to={`/article/terkait/${hashTag}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          id="hashTag"
                          key={hashTag}
                          className="hashTagArticle text-decoration-none me-2"
                        >
                          #{hashTag}
                        </span>
                      </Link>
                    ))}
                  </p>
                  <div onClick={() => navigate(`/article/${item.id}`)}>
                    <a
                      className="wrapperLinkTitleArticles"
                      onClick={() => navigate(`/article/${item.id}`)}
                    >
                      <h3 className="titleArticles">{item.titleArticle}</h3>
                    </a>
                    <p className="descArticles text-dark">{item.descArticle}</p>
                    <p className="AuthorAndDate ">
                      <span id="authorArticle"> {item.author}</span>
                      <span id="dot2"></span>{" "}
                      <span id="dateArticle">{item.date}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ArticleTerkait;
