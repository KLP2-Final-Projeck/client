import React, { useEffect, useState } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const AddInfografisAdmin = () => {
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState(null);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        try {
          setGambar(reader.result);
          console.log("Gambar setelah diubah:", reader.result);
        } catch (error) {
          console.error("Error konversi gambar:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const infografisSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BASE_URL}/infografis`, {
        judul,
        gambar,
        url,
      });
      console.log(response);

      setJudul("");
      setGambar(null);
      setUrl("");
      console.log("Respon dari server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <div className="addArtikel">
          <h3>Add Infografis</h3>
          <div className="card mt-3 mb-5">
            <div className="card-header text-center  h4">
              FORM DATA INFOGRAFIS
            </div>
            <div className="card-body">
              <form onSubmit={infografisSubmit}>
                <div className="form-group row pt-3">
                  <label
                    htmlFor="judulInfografis"
                    className="col-sm-2 col-form-label"
                  >
                    Judul Infografis
                  </label>
                  <div className="col-md-5">
                    <input
                      name="judulInfografis"
                      id="judulInfografis"
                      type="text"
                      className="form-control"
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label
                    htmlFor="judulInfografis"
                    className="col-sm-2 col-form-label"
                  >
                    Url
                  </label>
                  <div className="col-md-5">
                    <input
                      name="judulInfografis"
                      id="judulInfografis"
                      type="text"
                      className="form-control"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label className="col-sm-2 col-form-label">Gambar</label>
                  <div className="col-md-5">
                    <input
                      type="file"
                      className="form-control-file"
                      id="gambar"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="text-body-secondary text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-success text-white me-3"
                    onClick={() => navigate("/admin/infografis")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() =>
                      Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Infografis Berhasil di Tambahkan!",
                        showConfirmButton: false,
                        timer: 1500,
                      }).then(() => navigate("/admin/infografis"))
                    }
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInfografisAdmin;
