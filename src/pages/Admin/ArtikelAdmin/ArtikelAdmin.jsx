import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPen, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import ArticleVector from "../../../assets/ArticleVector.jpg";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const ArtikelAdmin = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalArticle, setTotalArticle] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalArticle = async () => {
      try {
        const response = await axios.get(`http://${BASE_URL}/artikel`);
        setTotalArticle(response.data.length);
        console.log(response);
      } catch (error) {
        console.error("Error fetching total articles:", error);
      }
    };

    fetchTotalArticle();
  }, []);

  const getArtikel = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/artikel`);
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtikel();
  }, []);

  const deleteArtikel = async (id) => {
    try {
      await axios.delete(`http://${BASE_URL}/artikel/${id}`);
      getArtikel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <h2>Article</h2>
        <div className="row gx-4 gy-2 justify-content-start">
          <div className="col-6 w-auto">
            <div className="card card-total mb-3" style={{ maxWidth: "30em" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={ArticleVector}
                    className="img-fluid rounded-start"
                    alt="Artikel "
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-title text-center m-0 text-dark fs-5">
                      Artikel
                    </p>
                    <hr className="my-2 p-0" />
                    <Link
                      to="/admin/article"
                      className="total card-text text-dark m-0 fs-3"
                      style={{ textDecoration: "none" }}
                    >
                      {totalArticle}
                    </Link>
                    <p className="totalHomepageAdmin card-text text-dark m-0">
                      Total Artikel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Artikel */}
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <Link
              to="/admin/artikel/AddArtikelAdmin"
              className="btn bg-primary text-white text-sm px-5 py-2"
            >
              {" "}
              <FaPlus /> Tambah Artikel
            </Link>
          </div>
        </div>
        {/* Add Artikel */}

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
                  {loading ? (
                    <tr>
                      <td>
                        <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
                          <span className="mx-2 h1">loading</span>
                          <Spinner animation="border" variant="dark" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    artikel.map((item) => (
                      <tr key={item.id}>
                        <th
                          scope="row"
                          className="me-5"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={item.image}
                            alt="name"
                            className="img-artikel w-100"
                          />
                        </th>
                        <td style={{ cursor: "pointer" }}>
                          {item.titleArtikel}
                        </td>
                        <td>{item.category}</td>
                        <td>{item.author}</td>
                        <td>{item.date}</td>
                        <td>
                          <div className="row justify-content-center gy-4">
                            <div className="col-4 px-1">
                              <Link
                                to={`/admin/artikel/UpdateArtikelAdmin/${item.id}`}
                                className="btn p-0 text-success w-100 "
                              >
                                <FaPen />
                              </Link>
                            </div>
                            <div className="col-4 px-1">
                              <button
                                onClick={() => deleteArtikel(item.id)}
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
};

export default ArtikelAdmin;
