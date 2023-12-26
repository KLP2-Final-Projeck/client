import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbars from "../Navbar";
import axios from "axios";
import { BASE_URL } from "../../utils/network";

const FormPetisi = () => {
  const petisiId = useParams().id;
  console.log(petisiId);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const [petisi, setPetisi] = useState({
    email: "",
    kota: "",
    name: "",
    NomorHp: "",
    UserId: userId,
    PetisiId: petisiId
  });

  const handleChangePetisi = (event) => {
    setPetisi({
      ...petisi,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitPetisi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BASE_URL}/formpetisi`, {
       ...petisi,
      });
      console.log(response.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Tanda Tangan Aksi Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/Petisi"))
      setPetisi("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbars />
      <form
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
            value={petisi.NomorHp}
            name="NomorHp"
            onChange={handleChangePetisi}
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
            name="kota"
            onChange={handleChangePetisi}
          />
        </div>
        <div className="form-check text-secondary text-start mb-3">
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
          type="submit"
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
