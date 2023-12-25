import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbars from "../Navbar";
import axios from "axios";
import { BASE_URL } from "../../utils/network";

function ArticleTerkait() {
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const [saveState, setSaveState] = useState(3);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/artikel`);
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArtikel(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(artikel.slice(0, 3));
  }, [artikel]);

  useEffect(() => {
    setFilterData(artikel.slice(0, limit));
    if (artikel.length > 0 && limit >= artikel.length) {
      setShowButton(false);
    }
  }, [limit]);

  return (
    <>
      {" "}
      <Navbars />
      <div className="container">
        <div className="artikel" id="artikel" style={{ marginTop: "110px" }}>
          <h3 className="text-start mb-3">Artikel Terkait</h3>
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
                  <div className="text-start card card-artikel h-100">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt="artikel"
                    />
                    <div className="card-body">
                      <Link
                        to={`/article/${item.id}`}
                        className="wrapperLinkTitleArticles"
                      >
                        <h5 className="card-title title-article">
                          {item.titleArtikel}
                        </h5>
                      </Link>
                      <p
                        className="card-text desc-article"
                        style={{ color: "#595959", textAlign: "justify" }}
                      >
                        {item.descArtikel}
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
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                  <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                  <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
                  <li class="page-item"><a class="page-link text-dark" href="#">Next</a></li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ArticleTerkait;
