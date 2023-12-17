import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPen, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import ArticleVector from "../../../assets/ArticleVector.jpg";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { deleteArticleAdmin, getArticle, getAPI } from "../../../utils/api"; // Ubah import sesuai struktur proyek Anda

function ArtikelAdmin() {
  const navigate = useNavigate();

  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalArticle, setTotalArticle] = useState(0);

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticleAdmin(id);
      // Setelah berhasil menghapus, refresh data artikel
      fetchArticleData();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const fetchArticleData = async () => {
    try {
      const articles = await getArticle();
      setArticle(articles);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

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

      if (localStorage.getItem("role") === "admin") {
        fetchArticleData();
      }
    };

    checkUserRole();
  }, [navigate]);

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <h2>Article</h2>
        {/* ... (bagian yang lain) */}
        <div
          className="card mt-4 my-5"
          style={{
            boxShadow: "0px 8px 24px rgba(112, 144, 176, 0.25)",
            borderRadius: 9,
          }}
        >
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="imagesAdmin">
                      Image
                    </th>
                    <th scope="col">Title Article</th>
                    <th scope="col">Cathegory</th>
                    <th scope="col">Author</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td>
                        <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
                          <span className="mx-2 h1">loading</span>
                          <Spinner animation="border" variant="dark" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    article.map((item) => (
                      <tr key={item.id}>
                        <th
                          scope="row"
                          className="me-5"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={item.url}
                            alt="name"
                            className="img-artikel w-100"
                          />
                        </th>
                        <td style={{ cursor: "pointer" }}>
                          {item.titleArticle}
                        </td>
                        <td>{item.category}</td>
                        <td>{item.author}</td>
                        <td>{item.date}</td>
                        <td>
                          <div className="row justify-content-center gy-4">
                            <div className="col-4 px-1">
                              <button className="btn p-0 text-success w-100 ">
                                <FaPen />
                              </button>
                            </div>
                            <div className="col-4 px-1">
                              <button
                                onClick={() => handleDeleteArticle(item.id)}
                                className="btn p-0 text-danger w-100"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtikelAdmin;
