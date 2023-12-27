import "../../App.css";
import ImgCreditCard from "../../assets/CreditCard.png";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"
import axios from "axios";
import { BASE_URL } from "../../utils/network";

const Donasi = () => {
  const navigate = useNavigate();
  const UserId = localStorage.getItem("id");
  const [inputMoney, setInputMoney] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    nomorRekening: "",
    UserId: UserId,
  });

  const handleInputMoney = (event) => {
    if (typeof event === "number") {
      const getButtonValue = event;
      const formatedValue = Number(getButtonValue).toLocaleString("id-ID");
      setInputMoney(formatedValue);

      setData({
        nominalValue: getButtonValue,
        formatedValue: `Rp ${formatedValue}`,
      });
    } else if (event.target.value === "") {
      setInputMoney("");
    } else if (typeof event === "object") {
      const inputNumber = parseInt(event.target.value.replace(/\D/g, ""), 10);
      const formatedValue = inputNumber.toLocaleString("id-ID");
      setInputMoney(formatedValue);

      setData({
        nominalValue: inputNumber,
        formatedValue: `Rp ${formatedValue}`,
      });
    }
  };

  const [data, setData] = useState({
    nominalValue: null,
    formatedValue: null,
  });

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        formData.email === "" ||
        formData.nama === "" ||
        formData.nomorRekening === "" ||
        formData.nomorHp === ""
      ) {
        throw new Error("Harap periksa inputan Anda!");
      }
  
      if (!UserId) {
        throw new Error("Anda harus login terlebih dahulu");
      }
  
      const response = await axios.post(`http://${BASE_URL}/donasi`, {
        ...formData,
        nominalValue: data.nominalValue,
      });
  
      console.log(response.data);
  
      Swal.fire({
        icon: "success",
        title: "Donasi berhasil dikirim!",
      }).then(() => navigate('/homePage'));

    } catch (error) {
      console.error(error);
  
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid row p-0 m-0">
        <div className="highlight col p-0">
          <div className="wrapperHighlightText d-flex flex-column text-white">
            <h2 className="titleHighlight">
              Yuk, jadi bagian dari Garden Plants!
            </h2>
            <p className="descHighlight">
              "Selamat datang di dunia kebun impian! Jelajahi keindahan alam melalui proyek website Garden Plants kami. Temukan ragam tanaman yang memikat hati, tips perawatan yang berguna, dan inspirasi untuk menciptakan kebun Anda sendiri. Dengan informasi lengkap dan gambar yang memukau, mari bersama-sama menjelajahi keajaiban tanaman dan membawa keindahan ke dalam hidup Anda melalui proyek Garden Plants website kami"
            </p>
          </div>
        </div>
        <div className="colDonasi col p-0 m-0">
          <div className="wrapperInputDonasi ">
            <form onSubmit={handleSubmit}>
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
                    name="nama"
                    value={formData.nama}
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
                    name="nomorHp"
                    value={formData.nomorHp}
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
                    name="email"
                    value={formData.email}
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
                    name="nomorRekening"
                    value={formData.nomorRekening}
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
                <a href="#">
                  <img src={ImgCreditCard} alt="Payment via credit card!" />
                </a>
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