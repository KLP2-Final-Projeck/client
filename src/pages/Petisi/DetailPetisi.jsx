import { Link, useNavigate, useParams } from "react-router-dom";
import "./Petisi.css";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Image from "../../assets/InfografisVector.jpg";
import FormPetisi from "./FormPetisi";
import { FaUsers } from "react-icons/fa";
import Navbars from "../Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { BASE_URL } from "../../utils/network";

function DetailPetisi() {
  const { id } = useParams();
  const [aksiLainnya, setAkasiLainnya] = useState([]);
  const navigate = useNavigate();
  const [showForm] = useState(true);
  const [detailAksi, setDetailAksi] = useState([]);
  const [listAksi, setListAksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setKontributor] = useState([]);
  const [numberofSupport, setNumberofSupport] = useState("");
  const [target, setTarget] = useState("");
  const [datafrom, setDataFrom] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${BASE_URL}/petisi/${id}`);
      const DataForm = await axios.get(`http://${BASE_URL}/formpetisi`);
      setNumberofSupport(response.data.setNumberofSupport);
      setTarget(response.data.target);
      setDataFrom(DataForm.data)
      setDetailAksi(response.data);
      console.log(response);
      console.log(DataForm);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const renderBar = () => {
    let Persentase =
      (detailAksi.numberofsupport / detailAksi.target) * 100 + "%";
    return { width: Persentase };
  };

  return (
    <>
      <Navbars />
      <div className="container mb-3">
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
          // detailAksi.map((item) => (
          <div className="container pt-5 detail-aksi">
            <div className="row gx-5">
              <div className="col-md-8 mt-3">
                <div className="mt-5" id="aksi">
                  <h3 id="title">{detailAksi.title}</h3>
                  <img
                    className="img-fluid pt-3"
                    width="100%"
                    src={detailAksi.image}
                    alt="image content"
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
              <div className="col-md-4 pt-5 mt-5" key={detailAksi.id}>
                <div className="marginTop" id="aksi">
                  <p className="card-text  kontributorAksi sub-title d-flex align-items-center gap-2">
                    <FaUsers />
                    {detailAksi.numberofSupport === 0 ? (
                      <span className="fw-medium fs-6">
                        Belum ada dukungan
                      </span>
                    ) : detailAksi.numberofSupport < detailAksi.target ? (
                      <span className="fw-medium fs-6">
                        {detailAksi.numberofSupport} orang mendukung
                      </span>
                    ) : (
                      <span className="fw-medium fs-6">
                        Petisi Mencapai Kemenangan
                      </span>
                    )}
                  </p>
                  <FormPetisi />
                </div>
              </div>
            </div>
          </div>
          // ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default DetailPetisi;
