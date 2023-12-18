import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import "./Petisi.css";
import Navbars from "../Navbar";
import { Spinner } from "react-bootstrap";

function PetisiTerkait() {
  const { hashtag } = useParams();
  const [listAksi, setListAksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aksiTerkait, setAkasiTerkait] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Menggantikan dispatch(getDataAksi());
    // Menggunakan fetch atau axios untuk mendapatkan data dari API
    // Misalnya, fetch("URL_API").then((response) => response.json()).then((data) => setListAksi(data));
    // setIsLoading(false) setelah mendapatkan data

    // Contoh menggunakan async/await dan fetch:
    const fetchData = async () => {
      try {
        const response = await fetch("URL_API");
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
    setAkasiTerkait(listAksi.filter((item) => item.hashtag.includes(hashtag)));
  }, [listAksi, hashtag]);

  return (
    <>
      <Navbars />
      <div className="container mt-4">
        <div className="aksi">
          <h3 className="text-start ">Aksi terkait &quot;{hashtag}&quot; </h3>

          <div style={{ border: "0.5px solid #bfbfbf" }}></div>

          <div className="row pt-2">
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
              aksiTerkait.map((item) => (
                <div key={item.id} className="aksiContent">
                  <div className="row ms-1 me-1 mt-5 mb-5">
                    <div className="col-md-4 p-0 me-4">
                      <img id="aksiImage" src={item.url} alt="Images " />
                    </div>
                    <div className="col-md-7 ps-0 pe-0 mt-2">
                      <p className="hashTag  m-0 p-0">
                        <Link to={`/aksi/`} style={{ textDecoration: "none" }}>
                          <span id="cathegory">Petisi</span>{" "}
                          <span id="dot"> </span>
                        </Link>
                        {item != 0 &&
                          item.hashtag.map((tag) => (
                            <Link
                              to={`/aksi/terkait/${tag}`}
                              style={{ textDecoration: "none" }}
                            >
                              <span id="hashTag" className="p-2 hashTag ">
                                # {tag}
                              </span>
                            </Link>
                          ))}
                      </p>
                      <div
                        className="wrapperLinkTitleAksi"
                        onClick={() => navigate(`/aksi/${item.id}`)}
                      >
                        <h3 className="titleAksi">{item.title}</h3>
                      </div>
                      <p className="descAksi text-dark wrapText">{item.desc}</p>
                      <p className="card-text  kontributorAksi sub-title d-flex align-items-center gap-2">
                        <FaUsers />
                        {item.numberofsupport == 0 ? (
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
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PetisiTerkait;
