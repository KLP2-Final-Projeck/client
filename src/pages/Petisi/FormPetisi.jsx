import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbars from "../Navbar";
import axios from "axios";

function FormPetisi() {
  const navigate = useNavigate();
  const [petisi, setPetisi] = useState({
    email: "",
    kota: "",
    name: "",
    telepon: "",
  });

  const handleChangePetisi = (event) => {
    setPetisi({
      ...petisi,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitPetisi = (e) => {
    e.preventDefault();
    if (localStorage.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan !",
        text: "Anda Harus Login Terlebih Dahulu",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        title: "Konfirmasi Data",
        text: "Apakah data yang diisi sudah benar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Konfirmasi",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // submitDataPetisi();
        }
      });
    }
  };

  return (
    <>
      <Navbars />
      <form
        style={{ marginLeft: "100px", marginRight: "100px" }}
        className="form-group mb-4"
        id="form-petisi"
        onSubmit={handleSubmitPetisi}
      >
        <div className="mb-3 text-start">
          <label htmlFor="namaLengkap" className="form-label">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="form-control"
            id="namaLengkap"
            required
            value={petisi.name}
            name="name"
            onChange={handleChangePetisi}
            // onClick={handleInputPetisi}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={petisi.email}
            name="email"
            onChange={handleChangePetisi}
            // onClick={handleInputPetisi}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="nomorTelepone" className="form-label">
            Nomor Telepon
          </label>
          <input
            type="text"
            className="form-control"
            id="nomorTelepone"
            required
            value={petisi.telepon}
            name="tlp"
            onChange={handleChangePetisi}
            // onClick={handleInputPetisi}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="kota" className="form-label">
            Kota
          </label>
          <input
            type="text"
            className="form-control"
            id="kota"
            required
            value={petisi.kota}
            name="city"
            onChange={handleChangePetisi}
            // onClick={handleInputPetisi}
          />
        </div>
        <div className="form-check text-secondary text-start">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue
            id="flexCheckDefault"
            required
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Saya setuju untuk membagikan nama dan alamat email untuk menerima
            pemberitahuan pembaruan tentang kampanye ini dan kampanye lainnya.
          </label>
        </div>
        <button
          className="btn btn-petisi btn-danger w-100 "
          data-bs-toggle="modal1"
          data-bs-target="#staticBackdrop1"
        >
          <i className="fa fa-pen-nib me-2"> </i> Tanda Tangani Petisi
        </button>
      </form>
    </>
  );
}

export default FormPetisi;
