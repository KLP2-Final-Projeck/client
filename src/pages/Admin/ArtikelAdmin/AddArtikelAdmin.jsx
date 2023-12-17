import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";

function AddArtikelAdmin() {
  const navigate = useNavigate();

  const [titleArticle, setTitleArticle] = useState("");
  const [descArticle, setDescArticle] = useState("");
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImages] = useState(null);
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");
  const [desc3, setDesc3] = useState("");
  const [desc4, setDesc4] = useState("");
  const [desc5, setDesc5] = useState("");
  const [desc6, setDesc6] = useState("");
  const [desc7, setDesc7] = useState("");
  const [desc8, setDesc8] = useState("");
  const [desc9, setDesc9] = useState("");
  const [desc10, setDesc10] = useState("");

  const handleHashtagChange = (e) => {
    setHashtag(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lakukan validasi atau proses lainnya sesuai kebutuhan

    // Navigasi setelah berhasil menambahkan artikel
    navigate("/admin/article");

    // Reset form
    setTitleArticle("");
    setDescArticle("");
    setCategory("");
    setHashtag("");
    setAuthor("");
    setDate("");
    setImages(null);
    setDesc1("");
    setDesc2("");
    setDesc3("");
    setDesc4("");
    setDesc5("");
    setDesc6("");
    setDesc7("");
    setDesc8("");
    setDesc9("");
    setDesc10("");
  };

  useEffect(() => {
    if (localStorage.getItem("role") == null) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan !",
        text: "Anda Harus Login Terlebih Dahulu",
        confirm: {
          text: "OK",
          value: true,
        },
      }).then((value) => {
        if (value.isConfirmed) {
          navigate("/login");
        }
      });
    } else if (localStorage.getItem("role") === "user") {
      Swal.fire({
        icon: "error",
        title: "Anda Bukan Admin !",
        text: "User Tidak Bisa Akses Ke Halaman Admin!",
        confirm: {
          text: "OK",
          value: true,
        },
      }).then((value) => {
        if (value.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, [navigate]);

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <div className="addArtikel">
          <h3>Add Article</h3>
          <div className="card mt-3 mb-5">
            <div className="card-header text-center  h4">FORM DATA ARTICLE</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* ... Form input fields ... */}

                <div className="text-body-secondary text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-success text-white me-3"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
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
}

export default AddArtikelAdmin;
