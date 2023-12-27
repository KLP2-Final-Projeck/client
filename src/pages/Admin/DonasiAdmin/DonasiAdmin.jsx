import "./DonasiAdmin.css";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import DonationVector from "../../../assets/DonationVector.jpg";
import { BASE_URL } from "../../../utils/network";

const DonasiAdmin = () => {
  const [donasi, setDonasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [TotalDonasi, setTotalDonasi] = useState(true);
  const navigate = useNavigate();

  const getDonasi = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/donasi`);
      console.log(response);
      setDonasi(response.data.msg);
      setTotalDonasi(response.data.msg.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonasi();
  }, []);

  const formatTime = (dateTime) => {
    const indonesianTime = dayjs(dateTime)
      .locale("id")
      .format("D MMMM YYYY, HH:mm:ss");
    return indonesianTime;
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://${BASE_URL}/donasi/${id}`);
      getDonasi();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <h2>Donasi</h2>
        <div className="row gx-4 gy-2 justify-content-start">
          <div className="col-6 w-auto">
            <div className="card card-total mb-3" style={{ maxWidth: "30em" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={DonationVector}
                    className="img-fluid rounded-start"
                    alt="Artikel "
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-title text-center m-0 text-dark fs-5">
                      Donasi
                    </p>
                    <hr className="my-2 p-0" />
                    <p className="total card-text text-dark m-0 fs-3">
                      {TotalDonasi}
                    </p>
                    <p className="totalHomepageAdmin card-text text-dark m-0">
                      Total Donasi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card my-5"
          style={{
            boxShadow: "0px 8px 24px rgba(112, 144, 176, 0.25)",
            borderRadius: 9,
          }}
        >
          <div className="card-body">
            <div className="table-responsive text-nowrap">
              <table className="table w-auto">
                <thead>
                  <tr>
                    <th scope="col" className="">
                      ID
                    </th>
                    <th scope="col" className=" ">
                      Nama
                    </th>
                    <th scope="col" className="">
                      Email
                    </th>
                    <th scope="col" className="">
                      Nomor Telepon
                    </th>
                    <th scope="col" className="col-4">
                      Nomor Rekening
                    </th>
                    <th scope="col" className="">
                      Donasi
                    </th>
                    <th scope="col" className="">
                      createdAt
                    </th>
                    <th scope="col" className="">
                      updatedAt
                    </th>
                    <th scope="col" className="">
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
                    donasi?.map((item) => (
                      <tr key={item.id}>
                        <th className="text-center" scope="row">
                          {item.id}
                        </th>
                        <td>{item.nama}</td>
                        <td>{item.email}</td>
                        <td>{item.nomorHp}</td>
                        <td>{item.nomorRekening}</td>
                        <td>{item.nominalValue}</td>
                        <td>{formatTime(item.createdAt)}</td>
                        <td>{formatTime(item.updatedAt)}</td>
                        <td>
                          <div className="row justify-content-center">
                            <div className="col-4 px-1">
                              <FaTrashAlt
                                className="text-danger w-100 "
                                onClick={() => deleteUser(item.id)}
                              />
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

export default DonasiAdmin;
