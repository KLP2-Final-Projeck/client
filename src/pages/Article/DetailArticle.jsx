import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
// import Komentar from "../Komentar/Komentar";
import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbars from "../Navbar";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function DetailArticle() {
  const { key } = useParams();
  const [detailArticle, setDetailArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        // Ganti URL dengan endpoint atau fungsi untuk mengambil data detail artikel
        const response = await fetch(`URL_ARTICLE_API/${key}`);
        const data = await response.json();
        setDetailArticle(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article detail:", error);
        setIsLoading(false);
      }
    };

    fetchArticleDetail();
  }, [key]);

  const shareUrl = `https://final-environthink.netlify.app/artikel/${key}`;

  return (
    <>
      <Navbars />
      <div id="articlesContent" className="container pt-4">
        {isLoading ? (
          <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
            <span className="mx-2 h1">loading</span>
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <>
            {Object.keys(detailArticle).length !== 0 && (
              <>
                <div className="col-md-12 mb-3">
                  <p className="hashTag m-0 p-0">
                    <span id="cathegory">{detailArticle.category}</span>{" "}
                    <span id="dot"></span>
                    {detailArticle.hashtag.map((hashtag) => (
                      <Link
                        key={hashtag}
                        to={`/article/terkait/${hashtag}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          id="hashTag"
                          className="hashTagArticle text-decoration-none me-2"
                        >
                          #{hashtag}
                        </span>
                      </Link>
                    ))}
                  </p>
                  <h1 className="titleArticle" id="titleArticle">
                    {detailArticle.titleArticle}{" "}
                  </h1>
                  <p className="text-dark">
                    By{" "}
                    <span id="author" className="fw-bold">
                      {" "}
                      {detailArticle.author}
                    </span>
                    <i className="ms-1 me-1">
                      <FaClock />
                    </i>
                    <span
                      id="date"
                      className="fw-bold"
                      style={{ color: "#6f7376" }}
                    >
                      {detailArticle.date}
                    </span>
                  </p>
                  <div className="d-flex gap-2">
                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={32} />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={32} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl}>
                      <WhatsappIcon size={32} />
                    </WhatsappShareButton>
                  </div>
                </div>
                <div className="col-md-12 p-0 me-4 text-center">
                  <img
                    className="articlesImage img-fluid"
                    src={detailArticle.url}
                    alt=""
                    id="images"
                  />
                </div>
                <div className="paragraf col-md-12 ps-0 pe-0 pt-5 ps-3">
                  {[...Array(10)].map((_, index) => (
                    <p key={`paragraf${index + 1}`} className="text-dark">
                      {detailArticle[`desc${index + 1}`]}
                    </p>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {/* <Komentar /> */}
      </div>
    </>
  );
}

export default DetailArticle;
