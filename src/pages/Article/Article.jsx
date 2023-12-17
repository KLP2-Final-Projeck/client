import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Navbars from "../Navbar";
import Search from "../Search/Search";
function Article() {
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Ganti URL dengan endpoint atau fungsi untuk mengambil data artikel
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
    setFilterData(article.slice(0, 3));
  }, [article]);

  useEffect(() => {
    setFilterData(article.slice(0, limit));
    if (article.length > 0 && limit >= article.length) {
      setShowButton(false);
    }
  }, [limit, article]);

  return (
    <>
      <Navbars />
      <div className="container mt-4">
        <div className="artikel" id="artikel" style={{ marginTop: "110px" }}>
          <Search />
          <h3 className="text-start mb-3">Artikel</h3>
          <div style={{ border: "0.5px solid #bfbfbf" }}></div>
          <div className="row pt-2" id="articlesContent">
            {isLoading ? (
              <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
                <span className="mx-2 h1">loading</span>
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              filterData.map((item) => (
                <div
                  key={item.id}
                  className="col-md-6 col-lg-4 mb-3 pt-4 pb-4"
                  onClick={() => {
                    navigate(`/article/${item.id}`);
                  }}
                >
                  <div className="card card-artikel h-100">
                    <img
                      src={item.url}
                      className="card-img-top"
                      alt="artikel"
                    />
                    <div className="card-body">
                      <Link
                        to={`/article/${item.id}`}
                        className="wrapperLinkTitleArticles"
                      >
                        <h5 className="card-title title-article">
                          {item.titleArticle}
                        </h5>
                      </Link>
                      <p
                        className="card-text desc-article"
                        style={{ color: "#595959", textAlign: "justify" }}
                      >
                        {item.descArticle}
                      </p>
                      <p className="fw-bold" style={{ color: "#6F7376" }}>
                        <span className="author"> {item.author} </span>{" "}
                        <span id="dot2"></span>
                        <span className="date"> {item.date} </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {!isLoading && (
          <div className="d-flex justify-content-center pb-3">
            {showButton && (
              <button
                className="btn"
                id="artikel-lainnya"
                onClick={() => setLimit(limit + 3)}
              >
                Artikel Lainnya
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Article;
