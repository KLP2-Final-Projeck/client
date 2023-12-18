import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Petisi.css";
import { FaUsers } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Navbars from "../Navbar";

function Petisi() {
  const [listAksi, setListAksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // Assuming fetchData returns an array of items
      try {
        // Simulating an API call
        const response = await fetch("your_api_endpoint");
        const data = await response.json();
        setListAksi(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(listAksi.slice(0, limit));
    if (listAksi.length > 0 && limit >= listAksi.length) {
      setShowButton(false);
    }
  }, [listAksi, limit]);

  return (
    <>
      <Navbars />
      <div className="container mt-4">
        <div className="artikel" id="artikel" style={{ marginTop: "110px" }}>
          <h3 className="text-start ">Tanpa Aksi, Tidak Ada Perubahan </h3>
          <p className="sub-title">
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
                      src={item.url}
                      className="card-img-top h-100 sm-h-100"
                      alt=" "
                    />
                    <div className="card-body">
                      <h6 className="card-title title title-aksi">
                        {item.title}
                      </h6>
                      <p className="card-text sub-title d-flex align-items-center gap-2">
                        <FaUsers />
                        {item.numberofsupport === 0 ? (
                          <span className="fw-medium fs-6">
                            Belum ada dukungan
                          </span>
                        ) : item.numberofsupport < item.target ? (
                          <span className="fw-medium fs-6">
                            {item.numberofsupport} orang mendukung
                          </span>
                        ) : (
                          <span className="fw-medium fs-6">
                            Petisi Mencapai Kemenangan
                          </span>
                        )}
                      </p>
                      <Link className="link-aksi" to={`/aksi/${item.id}`}>
                        {item.numberofsupport < item.target ? (
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
    </>
  );
}

export default Petisi;
