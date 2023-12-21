import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import InfoLogo from "../../assets/infoLogo.png";
import ShareLogo from "../../assets/shareLogo.png";
import PeopleLogo from "../../assets/peopleLogo.png";
import logoImage from "../../assets/logo.png";
import "./Home.css";
import Footer from "../Footer/Footer";

// import Search from "../Searchpage/Search";

const HomePage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [saveState, setSaveState] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowAnotherArticle = () => {
    const fetchData = async () => {
      try {
        const response = await fetch("actual-api-endpoint-url");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
    setSaveState((prevSaveState) => prevSaveState + 3);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div>
          <img src={logoImage} alt="logo" width="220" height="70" />
        </div>
        <div className="container-fluid pe-4">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className=" justify-content-end flex-grow-1 pe-3 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav d-flex justify-content-center fs-4"></ul>
          </div>
          <button
            type="button"
            className="btn btnHighlight1"
            style={{ marginRight: "8px" }}
            onClick={() => navigate("/Login")}
          >
            <strong>Login</strong>
          </button>
          <button
            type="button"
            className="btn btnHighlight1"
            onClick={() => navigate("/Register")}
          >
            <strong>Register</strong>
          </button>
        </div>
      </nav>
      {/* <Search /> */}
      <div className="container-fluid banner">
        <div className="container banner-content col-lg-9 text-start">
          <div>
            <h1
              className="titleHighlight1 text-black"
              style={{ marginTop: "110px" }}
            >
              We Love Helping You to Safe <br />
              The Earth
            </h1>
            <p className="mt-3 mb-4 fw-bold fs-5 text-black">
              Setiap tetesan air yang kau berikan pada tanaman hias adalah{" "}
              <br />
              investasi untuk keindahan hidupmu sendiri. <br />
              Mari bersama-sama pelajari isunya.
            </p>
            <a
              className="btn btnHighlight1 mb-5"
              onClick={() => navigate("/Login")}
            >
              Ikuti Komunitas
            </a>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column justify-content-center align-items-center text-center">
        <h3 className="titleNewArticle mt-5 text-center">Artikel Terbaru</h3>
        <hr className="lineArticle text-center opacity-100" />
      </div>

      <div className="container">
        {articles.length == 0 ? (
          <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
            <span className="mx-2 h1">loading</span>
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          articles.map((item) => (
            <div
              className="articlesContent"
              key={item.id}
              onClick={() => navigate(`/article/${item.id}`)}
            >
              <div className="row ms-1 me-1 mt-5 mb-5">
                <div className="col-md-4 p-0 me-4">
                  <img id="articlesImage" src={item.url} alt="Images " />
                </div>
                <div
                  id="detailPreviewArticles"
                  className="col-md-7 ps-0 pe-0 mt-2"
                >
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
          ))
        )}
        <div className="d-flex justify-content-start ms-1">
          <button
            className="btn"
            id="artikel-lainnya"
            onClick={() => {
              navigate(`/Login`);
            }}
            style={
              saveState == 9
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            {" "}
            Artikel Lainnya
          </button>
        </div>
      </div>

      <div className="Highlight2 text-center mt-5">
        <h1 className="titleHighlight2 text-white pt-5 ">
          Menjadi Pencinta Tanaman Hias
        </h1>
        <p className="text-white pb-5 fs-5 px-5">
          Jangan biarkan cintamu pada tanaman hias tersembunyi, jadilah bagian
          dari komunitas pencinta tanaman hias dan bagikan kecintaanmu pada
          dunia tanaman.
        </p>
        <div className="container">
          <div className="row justify-content-center gap-3 gap-md-5 pb-5 ms-3 me-3">
            <div className="col-12 col-md-3">
              <a href="#" type="button">
                <img
                  className="imgBtnHighlight2"
                  src={InfoLogo}
                  alt="Pelajari!"
                />
              </a>
              <h2 className="titleBtnHighlight2 text-white">Pelajari</h2>
              <p className="subTitleBtnHighlight2">
                Pengetahuan adalah kunci untuk merawat tanaman hias dengan lebih
                tepat dan efektif. Mari bersama-sama pelajari lebih lanjut
                tentang tanaman hias.
              </p>
            </div>
            <div className="col-12 col-md-3">
              <a href="#" type="button">
                <img
                  className="imgBtnHighlight2"
                  src={ShareLogo}
                  alt="Share!"
                />
              </a>
              <h2 className="titleBtnHighlight2 text-white">Bagikan</h2>
              <p className="subTitleBtnHighlight2">
                Bagikan Koleksi Tanaman Hiasmu Bagikan keindahan koleksi tanaman
                hiasmu dan inspirasi merawat tanaman. Mari bersama-sama
                memperluas cinta pada tanaman hias.
              </p>
            </div>
            <div className="col-12 col-md-3">
              <a href="#" type="button">
                <img
                  className="imgBtnHighlight2"
                  src={PeopleLogo}
                  alt="Aktivis"
                />
              </a>
              <h2 className="titleBtnHighlight2 text-white">Lakukan</h2>
              <p className="subTitleBtnHighlight2">
                Mari bersama-sama lakukan perawatan dan kegiatan komunitas untuk
                mendukung pertumbuhan tanaman hias.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
