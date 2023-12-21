import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";
import AksiVector from "../../../assets/AksiVector.jpg";
import axios from "axios";

function AksiAdmin() {
  const [listAksi, setListAksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [totalAksi, setTotalAksi] = useState(0);

  const navigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchTotalArticle = async () => {
      try {
        const response = await axios.get('http://localhost:4002/petisi'); 
        setTotalAksi(response.data.length);
        console.log(response);
      } catch (error) {
        console.error('Error fetching total articles:', error);
      }
    };

    fetchTotalArticle();
  }, []);

  const getPetisi = async () => {
    try {
      const response = await axios.get("http://localhost:4002/petisi");
      setListAksi(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetisi();
  }, []);

  const deletePetisi = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/petisi/${id}`);
      getPetisi();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <h2>Aksi</h2>
        <div className="row gx-4 gy-2 justify-content-start">
          <div className="col-6 w-auto">
            <div className="card card-total mb-3" style={{ maxWidth: "30em" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={AksiVector}
                    className="img-fluid rounded-start"
                    alt="Artikel "
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-title text-center m-0 text-dark fs-5">
                      Aksi
                    </p>
                    <hr className="my-2 p-0" />
                    <Link
                      to="/admin/article"
                      className="total card-text text-dark m-0 fs-3"
                      style={{ textDecoration: "none" }}
                    >
                      {totalAksi}
                    </Link>
                    <p className="totalHomepageAdmin card-text text-dark m-0">
                      Total Aksi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-md-12 d-flex justify-content-end ">
            <button
              className="btn bg-primary text-white text-sm px-5 py-2 d-flex gap-2 justify-content-end align-items-center"
              onClick={() => navigate('/admin/petisi/AddPetisiAdmin')}
            >
              <FaPlus /> Tambah Aksi
            </button>
          </div>
        </div>

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
                    <th scope="col-md-2" className="imagesAdmin">
                      Image
                    </th>
                    <th scope="col-2">Title</th>
                    <th scope="col-2">Number Of Support</th>
                    <th scope="col-2">Target</th>
                    <th scope="col-4" className="text-center">
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
                    listAksi.map((item) => (
                      <tr key={item.id}>
                        <td className="me-5" style={{ cursor: "pointer" }}>
                          <img
                            src={item.image}
                            alt="name"
                            className="img-artikel w-100"
                          />
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/admin/aksi/${item.id}`);
                          }}
                        >
                          {item.title}
                        </td>
                        <td>{item.numberofSupport}</td>
                        <td>{item.target}</td>
                        <td>
                          <div className="row">
                            <div className="col-4 px-1">
                              <Link
                                to={`/admin/petisi/UpdatePetisiAdmin/${item.id}`}
                                className="btn p-0 text-success w-100 "
                              >
                                <FaPen />
                              </Link>
                            </div>
                            <div className="col-4 px-1">
                              <Link
                                onClick={() => deletePetisi(item.id)}
                                className="btn p-0 text-danger w-100 "
                              >
                                <FaTrashAlt />
                              </Link>
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

export default AksiAdmin;
