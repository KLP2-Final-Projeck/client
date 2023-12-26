import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/network";
function Komentar() {
  const artikelId = useParams().id;
  const userId = localStorage.getItem('id');
  const [komentar, setKomentar] = useState("");  
  const [Datakomentar, setDataKomentar] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [nama, setNama] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [komen, setKomen] = useState({
    nama, 
    komentar,
    ArtikelId : artikelId,
    UserId : userId
  });

  const handleKomen = (event) => {
    setKomen({
      ...komen,
      [event.target.name]: event.target.value,
    });
  };
  const getKomentar = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/comment`);
      console.log(response);
      setDataKomentar(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching komentar:", error);
      setIsLoading(false);
    }
  };
  const addOrUpdateKomentar = async () => {
    console.log(artikelId);
    try {
      const kirimKoment = await axios.post(`http://${BASE_URL}/comment`, {
       ...komen,
      });
      console.log("Respon dari server:", kirimKoment.data); 

      if (editingId) {
        await axios.put(
          `http://localhost:4002/comment/${editingId}`);
        setEditingId(null);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Edit sukses",
          showConfirmButton: false,
          timer: 1500,
        });
      } 
      else {
        await axios.post("http://localhost:4002/comment");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Menambahkan komentar",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setNama("");
      setInputEmail("");
      setShowModal(false);
      getKomentar();
    } catch (error) {
      console.error("Error adding komentar:", error);
    }
  };
  const deleteKomentar = async (commentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:4002/comment/${commentId}`, config);

      Swal.fire({
        position: "top",
        icon: "success",
        title: 'Berhasil!, "Berhasil Hapus Data Komentar',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting komentar:", error);
    }
  };

  useEffect(() => {
    getKomentar();
  }, []);

  return (
    <>
      <div className="container p-5">
        <div className="komentar" id="komentar">
          <h3 className="text-start mb-3">Komentar</h3>
          <div style={{ border: "0.5px solid #bfbfbf" }}></div>
          <form onSubmit={addOrUpdateKomentar} className="add-post-form">
            <div className="row pt-5">
              <div className="col-lg-12 col-md-8 col-sm-12 field">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email-value"
                    className="form-control form-control-md me-2"
                    placeholder="Masukkan Alamat Email"
                    required
                  />
                  <input
                    type="text"
                    id="name-value"
                    className="form-control form-control-md"
                    placeholder="Masukkan Nama"
                    name="nama"
                    value={komen.nama}
                    onChange={handleKomen}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    id="komentar-value"
                    className="form-control form-control-md"
                    placeholder="Tulis Komentar"
                    style={{ height: "150px", width: "200px", resize: "none" }}
                    name="komentar"
                    value={komen.komentar}
                    onChange={handleKomen}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                 Add Comment
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="row pt-4">
          {isLoading ? (
            <div className="text-center  d-flex justify-content-center align-items-center my-5 py-5">
              <span className="mx-2 h1">loading</span>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            Datakomentar.length > 0 &&
            Datakomentar.map((item) => (
              <div
                key={item.id}
                className="posts-list"
                id="posts-list"
              >
                <div
                  className="card bg-light mt-2 mb-2"
                  style={{ width: "65rem" }}
                >
                  <div className="card-body text-start">
                    <h5 className="card-title">{item.nama}</h5>
                    <p className="card-text text-dark">{item.komentar}</p>
                    {item.UserId == localStorage.getItem("id") && (
                      <>
                        <Link
                          // onClick={() => handleEdit(item.id)}
                          className="card-link text-decoration-none"
                        >
                          Edit
                        </Link>
                        <Link
                          onClick={() => deleteKomentar(item.id)}
                          className="card-link text-decoration-none"
                        >
                          Delete
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Komentar;



