import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbars from "../Navbar";
import axios from "axios";
import Footer from "../Footer/Footer";
import ArticleTerkait from "./ArticleTerkait";
import { BASE_URL } from "../../utils/network";
import Komentar from "../komentar/komentar";
import './Article.css'

function DetailArticle() {
  const [titleArtikel, setTitleArtikel] = useState("");
  const [descArtikel, setDescArtikel] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImages] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const getArtikelbyId = async () => {
    const response = await axios.get(`http://${BASE_URL}/artikel/${id}`);
    console.log(response);
    setTitleArtikel(response.data.titleArtikel);
    setDescArtikel(response.data.descArtikel);
    setAuthor(response.data.author);
    setDate(response.data.date);
    setCategory(response.data.category);
    setImages(response.data.image);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getArtikelbyId();
    } catch (error) {
      console.error('Error fetching article by ID:', error.message);
      setIsLoading(false);
    }
  });

  return (
    <>
      <Navbars />
      <div id="articlesContent" className="container top p-5">
        <>
          <div className="col-md-12 mb-3">
            <p className="hashTag m-0 p-0">
              <span id="cathegory">
              </span>
              <Link
                style={{ textDecoration: "none" }}
              >
              </Link>
            </p>
            <h1 className="titleArticle" id="titleArticle">
              {titleArtikel}{" "}
            </h1>
            <p className="text-dark">
              By{" "}
              <span id="author" className="fw-bold">
                {" "}
                {author}
              </span>
              <i className="ms-1 me-1">
                <FaClock />
              </i>
              <span
                id="date"
                className="fw-bold"
                style={{ color: "#6f7376" }}
              >
                {date}
              </span>
            </p>
          </div>
          <div className="col-md-12 p-0 me-4 text-center">
            <img
              className="articlesImage img-fluid"
              src={image}
              alt=""
              id="images"
            />
          </div>
          <div className="container d-flex justify-content-center paragraf col-md-12 ps-0 pe-0 pt-5 ">
            <p className="text-dark width">
              {descArtikel}
            </p>
          </div>
        </>
      </div>
      <ArticleTerkait />
      <Komentar />
      <Footer />
    </>
  );
}

export default DetailArticle;
