import { Link, useNavigate, useParams } from "react-router-dom";
import "./Petisi.css";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Image from "../../assets/InfografisVector.jpg";
import FormPetisi from "./FormPetisi";
import { FaUsers } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Navbars from "../Navbar";

function DetailPetisi() {
  const { key } = useParams();
  const [aksiLainnya, setAkasiLainnya] = useState([]);
  const navigate = useNavigate();
  const [showForm] = useState(true);
  const [detailAksi, setDetailAksi] = useState({});
  const [listAksi, setListAksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setKontributor] = useState([]);

  let renderHeaderPetisi = () => {
    if (detailAksi.numberofsupport === 0) {
      return (
        <h5 className="fw-bold" id="heading-form">
          Belum ada dukungan
        </h5>
      );
    } else if (detailAksi.numberofsupport < detailAksi.target) {
      return (
        <h5 className="fw-bold" id="heading-form">
          {detailAksi.numberofsupport} orang yang sudah mendukung
        </h5>
      );
    } else {
      return (
        <h5 className="fw-bold" id="heading-form">
          Petisi Mencapai Kemenangan
        </h5>
      );
    }
  };

  let renderTextPetisi = () => {
    if (detailAksi.numberofsupport < detailAksi.target) {
      if (showForm) {
        return (
          <p className="fw-semibold paragraf" id="paragarfPetisi">
            {detailAksi.teks}
          </p>
        );
      } else {
        return (
          <div>
            <h3 className="heading-form">
              {" "}
              Terima Kasih Sudah Berkontribusi 🎉
            </h3>
            <p className="fw-semibold paragraf" id="paragarfPetisi">
              jadilah Aktivis Digital Dengan membagikan petisi ini
            </p>
          </div>
        );
      }
    } else {
      return (
        <p className="fw-semibold paragraf " id="paragarfPetisi">
          mari kita lanjutkan perjuangan kita dengan bergabung dalam aksi-aksi
          lain yang sejenis untuk terus memperjuangkan hak-hak kita dan membawa
          perubahan positif bagi masyarakat. Bersama-sama kita bisa mewujudkan
          perubahan yang kita inginkan!
        </p>
      );
    }
  };

  const renderBar = () => {
    let Persentase =
      (detailAksi.numberofsupport / detailAksi.target) * 100 + "%";
    return { width: Persentase };
  };

  useEffect(() => {
    // Gantikan dispatch(getDetail(key));
    // Gantikan dispatch(getDataAksi());
    // Menggunakan fetch atau axios untuk mendapatkan data dari API
    // Misalnya, fetch("URL_API").then((response) => response.json()).then((data) => setDetailAksi(data));
    // setIsLoading(false) setelah mendapatkan data

    // Contoh menggunakan async/await dan fetch:
    const fetchData = async () => {
      try {
        const response = await fetch(`URL_API/${key}`);
        const data = await response.json();
        setDetailAksi(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key]);

  useEffect(() => {
    // Gantikan dispatch(getDataAksi());
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
    setAkasiLainnya(listAksi.filter((item) => item.id !== key));
  }, [listAksi, key]);

  useEffect(() => {
    const fetchKontributor = async () => {
      try {
        const response = await fetch(`URL_API/kontributor/${key}`);
        const data = await response.json();
        setKontributor(data);
      } catch (error) {
        console.error("Error fetching kontributor data:", error);
      }
    };

    fetchKontributor();
  }, [key]);

  const shareUrl = ``;

  return (
    <>
      <Navbars />
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
        <div className="container pt-5 detail-aksi">
          <div className="row gx-5">
            <div className="col-md-8">
              <div id="aksi">
                <p className="hashTag  m-0 p-0">
                  <Link to={`/aksi/`} style={{ textDecoration: "none" }}>
                    <span id="cathegory">Petisi</span> <span id="dot"> </span>
                  </Link>
                  {typeof detailAksi.hashtag != "undefined" &&
                    detailAksi.hashtag.map((item) => (
                      <Link
                        key="1"
                        to={`/aksi/terkait/${item}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span id="hashTag" className="p-2 hashTag ">
                          # {item}
                        </span>
                      </Link>
                    ))}
                </p>
                <div></div>
                <h3 id="title">{detailAksi.title}</h3>
                {/* <img
                  className="img-fluid pt-3"
                  width="100%"
                  src={detailAksi.url}
                  alt="image content"
                  id="image"
                /> */}
                <img
                  className="img-fluid pt-3"
                  width="50%"
                  src={Image}
                  alt=""
                />
                <div className="paragraf pt-4">
                  <p className="mb-4 paragraf">{detailAksi.desc}</p>
                  <p className="mb-4 paragraf">{detailAksi.desc1}</p>
                  <p id="paragraf-konklusi" className="fw-bold paragraf">
                    {detailAksi.desc2}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 pt-5">
              <div id="aksi">
                {renderHeaderPetisi()}
                {detailAksi.numberofsupport < detailAksi.target ? (
                  <div>
                    <div
                      className="progress"
                      id="bar"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={10}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="progress-bar bg-success"
                        id="bar-petisi"
                        style={renderBar()}
                      />
                    </div>
                    <figcaption
                      className="figure-caption text-end"
                      id="figcaption"
                    >
                      <span id="caption-bar" />
                      {detailAksi.numberofsupport}/{detailAksi.target}
                      <span id="target" /> dukungan
                    </figcaption>
                  </div>
                ) : (
                  <span></span>
                )}
                {renderTextPetisi()}

                {detailAksi.numberofsupport === detailAksi.target ? (
                  <Link className="link-aksi" to={`/aksi`}>
                    <button
                      className="btn btn-petisi btn-main w-100 mb-4 "
                      data-bs-toggle="modal1"
                      data-bs-target="#staticBackdrop1"
                    >
                      <i className="fa fa-pen-nib me-2"> </i> Ikuti Aksi Yang
                      Lainnya
                    </button>
                  </Link>
                ) : showForm ? (
                  <div>
                    <FormPetisi />
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={32} />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={32} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl}>
                      <WhatsappIcon size={32} />
                    </WhatsappShareButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-4 mb-0">
        <div className="aksi">
          <h3 className="text-start ">Aksi Lainnya </h3>

          <div style={{ border: "0.5px solid #bfbfbf" }} className="mb-0"></div>

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
              aksiLainnya.map((item) => (
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
                          item.hashtag.map((item) => (
                            <Link
                              to={`/aksi/terkait/${item}`}
                              style={{ textDecoration: "none" }}
                            >
                              <span id="hashTag" className="p-2 hashTag ">
                                # {item}
                              </span>
                            </Link>
                          ))}
                      </p>
                      <a className="wrapperLinkTitleAksi">
                        <h3
                          className="titleAksi"
                          onClick={() => navigate(`/aksi/${item.id}`)}
                        >
                          {item.title}
                        </h3>
                      </a>
                      <p className="descAksi text-dark wrapText">{item.desc}</p>
                      <p className="card-text  kontributorAksi sub-title d-flex align-items-center gap-2">
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
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <FormPetisi />
    </>
  );
}

export default DetailPetisi;
