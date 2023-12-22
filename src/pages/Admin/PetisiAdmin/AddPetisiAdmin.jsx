import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const AddPetisiAdmin = () => {
  const [numberofSupport, setNumberofSupport] = useState("");
  const [target, setTarget] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImages] = useState(null);
  const [hashtag, setHashtag] = useState("");
  const [desc, setDesc] = useState("");
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        try {
          setImages(reader.result);
          console.log("Gambar setelah diubah:", reader.result);
        } catch (error) {
          console.error("Error konversi gambar:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const PetisiSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BASE_URL}/petisi`, {
        numberofSupport,
        target,
        url,
        title,
        image,
        hashtag,
        desc,
        desc1,
        desc2,
      });
      console.log(response);
      // setNumberofSupport(""),
      setTarget("");
      setUrl("");
      setTitle("");
      setImages("");
      setHashtag("");
      setDesc("");
      setDesc1("");
      setDesc2("");
      console.log("Respon dari server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  // if (localStorage.getItem("role") == null) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Terjadi Kesalahan !",
  //     text: "Anda Harus Login Terlebih Dahulu",
  //     confirm: {
  //       text: "OK",
  //       value: true,
  //     },
  //   }).then((value) => {
  //     if (value) {
  //       navigate("/login");
  //     }
  //   });
  // } else if (localStorage.getItem("role") === "user") {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Anda Bukan Admin !",
  //     text: "User Tidak Bisa Akses Ke Halaman Admin!",
  //     confirm: {
  //       text: "OK",
  //       value: true,
  //     },
  //   }).then((value) => {
  //     if (value) {
  //       navigate("/");
  //     }
  //   });
  // }
  // }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">
        <div className="addArtikel">
          <h3>Add Petisi</h3>
          <div className="card mt-3 mb-5">
            <div className="card-header text-center h4">FORM DATA PETISI</div>
            <div className="card-body">
              <form onSubmit={PetisiSubmit}>
                <div className="form-group row pt-3">
                  <label
                    htmlFor="titleArticle"
                    className="col-sm-2 col-form-label"
                  >
                    Number Of Support
                  </label>
                  <div className="col-md-5">
                    <input
                      name="titleArticle"
                      type="text"
                      className="form-control"
                      id="titleArticle"
                      value={numberofSupport}
                      onChange={(e) => setNumberofSupport(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label
                    htmlFor="descArticle"
                    className="col-sm-2 col-form-label"
                  >
                    Target
                  </label>
                  <div className="col-md-5">
                    <input
                      name="descArticle"
                      type="text"
                      className="form-control"
                      id="descArticle"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="category" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-md-5">
                    <input
                      name="category"
                      type="text"
                      className="form-control"
                      id="category"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="author" className="col-sm-2 col-form-label">
                    url
                  </label>
                  <div className="col-md-5">
                    <input
                      name="author"
                      type="text"
                      className="form-control"
                      id="author"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="images" className="col-sm-2 col-form-label">
                    Images
                  </label>
                  <div className="col-md-5">
                    <input
                      type="file"
                      className="form-control-file"
                      id="images"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="hashtag" className="col-sm-2 col-form-label">
                    hashtag
                  </label>
                  <div className="col-md-5">
                    <input
                      name="hashtag"
                      type="text"
                      className="form-control"
                      id="hashtag"
                      value={hashtag}
                      onChange={(e) => setHashtag(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="desc" className="col-sm-2 col-form-label">
                    Desc
                  </label>
                  <div className="col-md-5">
                    <textarea
                      className="form-control"
                      name="desc"
                      id="desc"
                      rows="3"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      type="text"
                    ></textarea>
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="desc1" className="col-sm-2 col-form-label">
                    Desc 1
                  </label>
                  <div className="col-md-5">
                    <textarea
                      className="form-control"
                      name="desc1"
                      id="desc1"
                      rows="3"
                      value={desc1}
                      onChange={(e) => setDesc1(e.target.value)}
                      type="text"
                    ></textarea>
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="desc2" className="col-sm-2 col-form-label">
                    Desc 2
                  </label>
                  <div className="col-md-5">
                    <textarea
                      className="form-control"
                      name="desc2"
                      id="desc2"
                      rows="3"
                      value={desc2}
                      onChange={(e) => setDesc2(e.target.value)}
                      type="text"
                    ></textarea>
                  </div>
                </div>

                <div className="text-body-secondary text-center pt-4">
                  <button
                    type="submit"
                    className="btn btn-success text-white me-3"
                    onClick={() => navigate("/admin/petisi")}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Artikel Berhasil di Tambahkan!",
                        showConfirmButton: false,
                        timer: 1500,
                      }).then(() => navigate("/admin/petisi"))
                    }
                    type="submit"
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

export default AddPetisiAdmin;
