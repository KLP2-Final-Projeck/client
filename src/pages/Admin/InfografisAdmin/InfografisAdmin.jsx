import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import "./InfografisAdmin.css";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const InfografisAdmin = () => {
  const [infografis, setInfografis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getInfografis = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/infografis`);
      setInfografis(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfografis();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://${BASE_URL}/infografis/${id}`);
      getInfografis();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <h2>Infografis</h2>
        <div className="row gx-4 gy-2 justify-content-start">
          <div className="col-6 w-auto">{/* (unchanged) */}</div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <Link
              to="/admin/infografis/add-infografis"
              className="btn bg-primary text-white text-sm px-5 py-2"
            >
              <FaPlus /> Tambah Infografis
            </Link>
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
                    <th scope="col-md-6" className="imgInfografisAdmin">
                      Gambar
                    </th>
                    <th scope="col-md-3" className="text-center">
                      Judul Artikel
                    </th>
                    <th scope="col-md-3" className="text-center">
                      Url
                    </th>
                    <th scope="col-md-3" className="text-center">
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
                    infografis.map((item) => (
                      <tr key={item.id}>
                        <td className="">
                          <img
                            src={item.gambar}
                            alt="name"
                            className="img-artikel w-100"
                            style={{ height: "20em" }}
                          />
                        </td>
                        <td className="text-center">{item.judul}</td>
                        <td className="text-center">{item.url}</td>
                        <td>
                          <div className="row d-flex justify-content-center">
                            <div className="col-2 w-25">
                              <Link
                                to={`/admin/infografis/update-infografis/${item.id}`}
                                className="btn p-0 text-success w-100"
                                onClick=""
                              >
                                <FaPen />
                              </Link>
                            </div>
                            <div className="col-2 w-25">
                              <button
                                onClick={() => deleteUser(item.id)}
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

export default InfografisAdmin;
