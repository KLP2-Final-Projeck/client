import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Petisi.css";
import { FaUsers } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Navbars from "../Navbar";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../../utils/network";
import axios from "axios";

function Petisi() {
  const [listAksi, setListAksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [filterData, setFilterData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/petisi`);
      setListAksi(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(listAksi.slice(0, 3));
  }, [listAksi]);

  useEffect(() => {
    setFilterData(listAksi.slice(0, limit));
    if (listAksi.length > 0 && limit >= listAksi.length) {
      setShowButton(false);
    }
  }, [limit]);

  return (
    <>
      <Navbars />
      <div className="container mt-4 mb-2">
        <div className="artikel" id="artikel" style={{ marginTop: "110px" }}>
          <h3 className="text-start ">Tanpa Aksi, Tidak Ada Perubahan </h3>
          <p className="sub-title text-start">
            Bergabunglah dengan kami dan tandatangani petisi untuk mendukung
            perubahan positif.
          </p>
          <div style={{ border: "0.5px solid #bfbfbf" }}></div>

          <div className="row pt-2" id="articlesContent">
            {isLoading ? (
              <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
                <Spinner
                  className="mx-4"
                  animation="grow"
                  size="sm"
                  variant="success"
                />
                <Spinner
                  className="mx-4"
                  animation="grow"
                  size="sm"
                  variant="success"
                />
                <Spinner
                  className="mx-4"
                  animation="grow"
                  size="sm"
                  variant="success"
                />
                <Spinner
                  className="mx-4"
                  animation="grow"
                  size="sm"
                  variant="success"
                />
                <Spinner
                  className="mx-4"
                  animation="grow"
                  size="sm"
                  variant="success"
                />
              </div>
            ) : (
              filterData.map((item) => (
                <div className="col-md-4 col-sm-6  pt-4 pb-4" key={item.id}>
                  <div className="card card-aksi h-100">
                    <img
                      src={item.image}
                      className="card-img-top h-100 sm-h-100"
                      alt=" "
                    />
                    <div className="card-body">
                      <h6 className="card-title title title-aksi">
                        {item.title}
                      </h6>
                      <p className="card-text sub-title d-flex align-items-center gap-2">
                        <FaUsers />
                        {item.numberofSupport === 0 ? (
                          <span className="fw-medium fs-6">
                            Belum ada dukungan
                          </span>
                        ) : item.numberofSupport < item.target ? (
                          <span className="fw-medium fs-6">
                            {item.numberofSupport} orang mendukung
                          </span>
                        ) : (
                          <span className="fw-medium fs-6">
                            Petisi Mencapai Kemenangan
                          </span>
                        )}
                      </p>
                      <Link className="link-aksi" to={`/petisi/detailpetisi/${item.id}`}>
                        {item.numberofSupport < item.target ? (
                          <h5 className="btn btn-main d-block">
                            Pelajari Selengkapnya
                          </h5>
                        ) : (
                          <h5 className="btn btn-secondary d-block">
                            Pelajari Selengkapnya
                          </h5>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {!isLoading && (
          <div className="d-flex justify-content-center pb-3">
            {showButton && (
              <button
                className="btn btn-lainnya "
                onClick={() => setLimit(limit + 3)}
              >
                Aksi Lainnya
              </button>
            )}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Petisi;
