import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";
import { getArticleDetail } from "../../../utils/server"; // Sesuaikan dengan struktur proyek Anda

function DetailArtikelAdmin() {
  const { key } = useParams();
  const navigate = useNavigate();

  const [detailArticle, setDetailArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = () => {
      if (localStorage.getItem("role") == null) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan !",
          text: "Anda Harus Login Terlebih Dahulu",
          confirm: {
            text: "OK",
            value: true,
          },
        }).then((value) => {
          if (value) {
            navigate("/login");
          }
        });
      } else if (localStorage.getItem("role") === "user") {
        Swal.fire({
          icon: "error",
          title: "Anda Bukan Admin !",
          text: "User Tidak Bisa Akses Ke Halaman Admin!",
          confirm: {
            text: "OK",
            value: true,
          },
        }).then((value) => {
          if (value) {
            navigate("/");
          }
        });
      }
    };

    const fetchArticleDetail = async () => {
      try {
        const result = await getArticleDetail(key);
        setDetailArticle(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article detail:", error);
      }
    };

    checkUserRole();
    fetchArticleDetail();
  }, [key, navigate]);

  return (
    <>
      <NavbarAdmin />
      <div>
        <div className="container pt-4">
          <h2>Detail Article</h2>
          <div className="row mb-4">
            <div className="col-md-12 d-flex justify-content-end">
              <button
                className="btn bg-success text-white text-sm me-4 px-5 py-2"
                onClick={() => {
                  // Tambahkan logika untuk update
                }}
              >
                Update
              </button>
              <button
                className="btn bg-danger text-white text-sm me-5 px-5 py-2"
                onClick={() => {
                  // Tambahkan logika untuk delete
                }}
              >
                Delete
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center d-flex justify-content-center align-items-center my-5 py-5">
              <span className="mx-2 h1">loading</span>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            <>
              {Object.keys(detailArticle).length !== 0 && (
                <>
                  <div className="row mb-4">
                    <div className="col-md-6 col-lg-6 p-3">
                      <img
                        className="imgArticleAdmin"
                        src={detailArticle.url}
                        alt="Article"
                      />
                    </div>

                    <div className="col-md-6 col-lg-6 pt-5">
                      <h3 className="titleArticle pt-4" id="titleArticle">
                        {detailArticle.titleArticle}
                      </h3>
                      <h5 id="cathegory" className="cathegory pt-3">
                        {detailArticle.category}
                      </h5>
                      {detailArticle.hashtag.map((hashtag) => (
                        <span
                          id="hashTag"
                          key={hashtag}
                          className="hashTagArticle text-decoration-none me-2 pt-4"
                        >
                          #{hashtag}
                        </span>
                      ))}
                      <p className="text-dark pt-3">
                        By{" "}
                        <span id="author" className="fw-bold">
                          {" "}
                          {detailArticle.author}
                        </span>
                      </p>
                      <p className="text-dark">
                        <i className="me-2">
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
                    </div>

                    <div className="descriptions pt-4 mb-3">
                      <h3 className="text-primary-dark">Descriptions</h3>
                      <div className="paragraf col-md-12 ps-0 pe-0 pt-4 ps-3">
                        {[...Array(10)].map((_, index) => (
                          <p
                            key={`paragraf${index + 1}`}
                            id={`paragraf${index + 1}`}
                            className="text-dark"
                          >
                            {detailArticle[`desc${index + 1}`]}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailArtikelAdmin;
