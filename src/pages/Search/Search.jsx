import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4002/artikel/?query=${searchValue}`);
  //     const data = await response.json();

  //     setResult(data);
  //   } catch (error) {
  //     console.error("Error fetching search data:", error);
  //     setResult("error");
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4002/artikel/search?query=${searchValue}`);
      
  //     // Periksa apakah responsenya berhasil (status code 2xx)
  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     setResult(response.data);
  //   } catch (error) {
  //     console.error("Error fetching search data:", error);
  //     setResult("error");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4002/artikel", { query: searchValue });
      
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setResult(response.data);
        } else {
          setResult([]);
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setResult("error");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-10">
            <div className="input-group mb-3">
              <input
                id="inputSearchArticle"
                type="text"
                className="form-control focus-ring focus-ring-success border border-2"
                placeholder="Cari Artikel!"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && handleSubmit();
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-2 text-center text-md-start">
            <button
              id="btnCari"
              className="btnCari btn btn-success w-100"
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              Cari
            </button>
          </div>
        </div>
        <div
          className="row pt-4"
          style={{ marginBottom: "6em" }}
          id="articlesContent"
        >
          {typeof result === "string" ? (
            <div className="wrapperNotFound col-md-6 col-11 mx-auto mb-5 pt-3 pb-5 ps-4 pe-4">
              <p className="titleNotFoundArticle text-dark mb-2">
                Maaf, kami tidak dapat menemukan apa yang Anda cari.
              </p>
              <ul className="m-0">
                <li className="possibleNotFoundKeyword1 text-secondary">
                  Cek kesalahan dalam penulisan, dan coba pencarian lagi
                </li>
                <li className="possibleNotFoundKeyword2 text-secondary">
                  Coba lakukan pencarian lain
                </li>
              </ul>
            </div>
          ) : (
            result?.map((item) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 pt-4"
                key={item.id}
              >
                <div
                  className="card card-artikel h-100"
                  onClick={() => navigate(`/article/${item.id}`)}
                >
                  <img src={item.image} className="card-img-top" alt="artikel" />
                  <div className="card-body">
                    <a className="wrapperLinkTitleArticles" href="/">
                      <h5 className="card-title text-break">
                        {item.titleArtikel}
                      </h5>
                    </a>
                    <p
                      className="card-text"
                      style={{ color: "#595959", textAlign: "justify" }}
                    >
                      {item.descArtikel}
                    </p>
                    <p className="fw-bold">
                      <span className="author text-secondary">
                        {item.author}
                      </span>
                      <span id="dot2"></span>
                      <span className="date text-secondary">{item.date}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
