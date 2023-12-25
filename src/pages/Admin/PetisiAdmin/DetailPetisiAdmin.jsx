import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../utils/network";

const UpdatePetisiAdmin = () => {
  const [numberofSupport, setNumberofSupport] = useState("");
  const [target, setTarget] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImages] = useState(null);
  const [hashtag, setHashtag] = useState("");
  const [desc, setDesc] = useState("");
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const { id } = useParams();
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
      const response = await axios.put(`http://${BASE_URL}/petisi/${id}`, {
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
      console.log("Respon dari server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getPetisibyId();
  }, []);

  const getPetisibyId = async () => {
    const response = await axios.get(`http://${BASE_URL}/petisi/${id}`);
    setNumberofSupport(response.data.numberofSupport);
    setTarget(response.data.target);
    setUrl(response.data.url);
    setTitle(response.data.title);
    setImages(response.data.image);
    setHashtag(response.data.hashtag);
    setDesc(response.data.desc);
    setDesc1(response.data.desc1);
    setDesc2(response.data.desc2);
  };

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
                        title: "Artikel Berhasil di Update!",
                        showConfirmButton: false,
                        timer: 1500,
                      }).then(() => navigate("/admin/petisi"))
                    }
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update
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

export default UpdatePetisiAdmin;
