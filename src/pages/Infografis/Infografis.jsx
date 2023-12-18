import { useEffect, useState } from "react";
import "./Infografis.css";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Infografis() {
  const navigate = useNavigate();
  const [infografis, setInfografis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [showButton, setShowButton] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    // Fetch data or any asynchronous operation here
    const fetchData = async () => {
      try {
        const response = await fetch("/api/infografis");
        const data = await response.json();
        setInfografis(data);
      } catch (error) {
        console.error("Error fetching infografis data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(infografis.slice(0, 3));
  }, [infografis]);

  useEffect(() => {
    setFilterData(infografis.slice(0, limit));
    if (infografis.length > 0 && limit >= infografis.length) {
      setShowButton(false);
    }
  }, [limit]);

  const handleClickInfografis = (imgURL) => {
    Swal.fire({
      imageUrl: imgURL,
      imageWidth: "100%",
      imageHeight: "auto",
      imageAlt: "Your Image",
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      customClass: {
        image: "my-custom-image-class",
        closeButton: "my-custom-close-button-class",
        popup: "my-custom-popup-class",
      },
    });
  };

  return (
    <>
      <div className="container pt-5">
        <div className="infografis" id="infografis">
          <h3 className="text-start mb-3">Infografis</h3>
          <div style={{ border: "0.5px solid #bfbfbf" }}></div>
          <div className="row pt-4" id="infografisContent">
            {isLoading ? (
              <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
                <span className="mx-2 h1">loading</span>
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              filterData.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4 mb-3 pb-4">
                  <div className="card card-infografis h-100">
                    <img
                      src={item.url}
                      style={{ cursor: "pointer" }}
                      className="card-img-top img-infografis h-100"
                      data-bs-toggle="modal"
                      data-bs-target={`#${item.id}Backdrop`}
                      alt="infografis"
                      onClick={() => handleClickInfografis(item.url)}
                    />
                    <div className="card-body">
                      <h1
                        className="card-title fs-6 title-infografis"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => navigate(`/infografis/${item.id}`)}
                      >
                        {item.judul}
                      </h1>

                      <div
                        className="modal fade"
                        id={`${item.id}Backdrop`}
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                              >
                                {item.judul}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <img
                                src={item.url}
                                className="card-img-top"
                                alt="infografis"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
                className="btn"
                id="infografis-lainnya"
                onClick={() => setLimit(limit + 3)}
              >
                Infografis Lainnya
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Infografis;
