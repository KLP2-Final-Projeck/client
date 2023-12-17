import "./Donasi.css";
import ImgCreditCard from "../../assets/CardCredit.png";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

const Donasi = () => {
  const navigate = useNavigate();
  const ref = useRef();

  const [inputMoney, setInputMoney] = useState("");
  const [formData, setFormData] = useState({
    Nama: "",
    Nomor_Telepon: "",
    Email: "",
    Nomor_Rekening: "",
  });

  useEffect(() => {
    if (localStorage.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Nama: localStorage.getItem("username"),
        Nomor_Telepon: localStorage.getItem("telepon"),
        Email: localStorage.getItem("email"),
      }));
    }
  }, []);

  const [data, setData] = useState({
    originalValue: null,
    formattedValue: null,
  });

  const handleInputMoney = (event) => {
    if (typeof event === "number") {
      const getButtonValue = event;
      const formattedValue = Number(getButtonValue).toLocaleString("id-ID");
      setInputMoney(formattedValue);

      setData({
        originalValue: getButtonValue,
        formattedValue: `Rp ${formattedValue}`,
      });
    } else if (event.target.value === "") {
      setInputMoney("");
    } else if (typeof event === "object") {
      const inputNumber = parseInt(event.target.value.replace(/\D/g, ""), 10);
      const formattedValue = inputNumber.toLocaleString("id-ID");
      setInputMoney(formattedValue);

      setData({
        originalValue: inputNumber,
        formattedValue: `Rp ${formattedValue}`,
      });
    }
  };

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.Email === "" ||
      formData.Nama === "" ||
      formData.Nomor_Rekening === "" ||
      formData.Nomor_Telepon === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Harap Periksa Inputan Anda !",
      });
    } else if (localStorage.getItem("role") == null) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan !",
        text: "Anda Harus Login Terlebih Dahulu",
        confirm: {
          text: "OK",
          value: true,
        },
      }).then((value) => {
        if (value) {
          navigate("/Donasi");
        }
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid row p-0 m-0">
        <div className="highlight col bg-primary p-0">
          <div className="wrapperHighlightText d-flex flex-column text-white">
            <h2 className="titleHighlight">
              Yuk, jadi bagian dari Garden Plants!
            </h2>
            <p className="descHighlight">
              Tanaman hias bukan hanya tanaman, tapi juga cerita cinta dan
              kepedulian. Dengan berdonasi untuk komunitas tanaman hias, Anda
              ikut menulis bab baru dalam kisah keberlanjutan ini. Mari
              bersama-sama membuat dunia lebih indah melalui kecintaan pada
              tanaman hias. Mari bergabung dalam perjalanan kami untuk
              melestarikan keindahan ini. Dengan berdonasi, Anda menjadi bagian
              tak terpisahkan dari upaya kami untuk merawat dan menyebarkan
              cinta pada tanaman hias <br />
              Kami membutuhkan bantuan Anda! Bergabunglah dengan kami dalam
              membangun komunitas tanaman hias yang lebih kuat dan
              berkelanjutan. Dengan berdonasi, Anda menjadi pionir perubahan dan
              turut serta dalam menciptakan lingkungan yang hijau dan sehat
            </p>
          </div>
        </div>

        <div className="colDonasi col p-0 m-0">
          <div className="wrapperInputDonasi ">
            <form ref={ref} onSubmit={handleSubmit}>
              <p className="DescDonasi">Masukan jumlah nominal donasi anda :</p>
              <div className="input-group">
                <span className="input-group-text text-white" id="basic-addon1">
                  Rp
                </span>
                <input
                  type="text"
                  className="form-control m-0 shadow-none inputMoney"
                  placeholder="0"
                  aria-describedby="basic-addon1"
                  onChange={handleInputMoney}
                  value={inputMoney}
                  required
                />
              </div>
              <div className="row mt-4 mb-5">
                <div className="col text-center ">
                  <button
                    type="button"
                    className="btn-50k btn w-100"
                    onClick={() => handleInputMoney(50000)}
                  >
                    Rp 50.000
                  </button>
                </div>
                <div className="col text-center ">
                  <button
                    className="btn-100k btn w-100"
                    type="button"
                    onClick={() => handleInputMoney(100000)}
                  >
                    Rp 100.000
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="btn-150k btn w-100"
                    type="button"
                    onClick={() => handleInputMoney(150000)}
                  >
                    Rp 150.000
                  </button>
                </div>
              </div>
              <div className="row gy-4">
                <div className="col-12">
                  <p className="titleInputName mb-1">Nama Lengkap</p>
                  <input
                    type="text"
                    className="form-control m-0 shadow-none"
                    name="Nama"
                    value={formData.Nama}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-12">
                  {" "}
                  <p className="titleInputNoTel mb-1">Nomor Telepon</p>
                  <input
                    type="number"
                    className="form-control m-0 shadow-none"
                    name="Nomor_Telepon"
                    value={formData.Nomor_Telepon}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-12">
                  {" "}
                  <p className="titleEmail mb-1">Alamat Email</p>
                  <input
                    type="email"
                    className="form-control m-0 shadow-none"
                    name="Email"
                    value={formData.Email}
                    onChange={handleFormData}
                    required
                  />
                </div>
                <div className="col-12">
                  {" "}
                  <p className="titleNomorRekening mb-1">Nomor Rekening</p>
                  <input
                    type="number"
                    className="form-control m-0 shadow-none"
                    name="Nomor_Rekening"
                    value={formData.Nomor_Rekening}
                    onChange={handleFormData}
                    required
                  />
                </div>
              </div>
              <div className="text-center mt-5 mb-5">
                <button type="submit" className="btn-lanjut btn text-white">
                  LANJUT
                </button>
              </div>
              <div className="mb-5 text-center">
                <img src={ImgCreditCard} alt="Payment via credit card!" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donasi;
