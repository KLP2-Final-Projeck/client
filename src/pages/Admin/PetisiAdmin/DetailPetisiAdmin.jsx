import { useEffect, useState } from "react";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

function DetailAksiAdmin() {
  const { key } = useParams();
  const [detailAksi, setDetailAksi] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gantilah dengan fetch atau metode pengambilan data sesuai kebutuhan backend Anda
    fetch(`URL_API_AKSI/${key}`)
      .then((response) => response.json())
      .then((data) => {
        setDetailAksi(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [key]);

  const handleUpdateClick = () => {
    // Implementasikan logika pembaruan data atau redirect ke halaman pembaruan sesuai kebutuhan
    // Misalnya, redirect ke halaman edit dengan key sebagai parameter
    // window.location.href = `/admin/aksi/edit/${key}`;
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin menghapus aksi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Gantilah dengan fetch atau metode penghapusan data sesuai kebutuhan backend Anda
        fetch(`URL_API_AKSI/${key}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: 'Berhasil!, "Berhasil Hapus Data Aksi',
              showConfirmButton: false,
              timer: 1500,
            });
            // Implementasikan logika penghapusan data atau redirect ke halaman lain sesuai kebutuhan
            // Misalnya, redirect ke halaman daftar aksi
            // window.location.href = '/admin/aksi';
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div>
        <div className="container pt-4">
          <h2>Detail Article</h2>
          <div className="row mb-4">
            <div className="col-md-12 d-flex justify-content-end">
              <button
                className="btn bg-success text-white text-sm me-4 px-5 py-2"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                className="btn bg-danger text-white text-sm me-5 px-5 py-2"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center d-flex justify-content-center align-items-center my-5 py-5">
              <span className="mx-2 h1">loading</span>
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            <>
              {detailAksi && (
                <>
                  <div className="row mb-4">
                    <div className="col-md-6 col-lg-6 p-3">
                      <img
                        className="imgArticleAdmin"
                        src={detailAksi.url}
                        alt={detailAksi.title}
                      />
                    </div>
                    <div className="col-md-6 col-lg-6 pt-5">
                      <h3 className="titleArticle pt-4" id="titleArticle">
                        {detailAksi.title}
                      </h3>
                      <Link
                        to={`/admin/aksi`}
                        style={{ textDecoration: "none" }}
                      >
                        <span id="cathegory">Petisi</span>{" "}
                        <span id="dot"> </span>
                      </Link>
                      {detailAksi.hashtag.map((hashtag) => (
                        <span
                          id="hashTag"
                          key={hashtag}
                          className="hashTagArticle text-decoration-none me-2 pt-4"
                        >
                          #{hashtag}
                        </span>
                      ))}
                      <h5 className="text-dark pt-3">
                        Number Of Support :{" "}
                        <span id="author" className="fw-bold">
                          {" "}
                          {detailAksi.numberofsupport}
                        </span>
                      </h5>
                      <h5 className="text-dark pt-3">
                        Target :{" "}
                        <span id="author" className="fw-bold">
                          {" "}
                          {detailAksi.target}
                        </span>
                      </h5>
                    </div>
                    <div className="descriptions pt-4 mb-3">
                      <h3 className="text-primary-dark">Descriptions</h3>
                      <div className="paragraf col-md-12 ps-0 pe-0 pt-4 ps-3">
                        <p className="mb-4 paragraf">{detailAksi.desc}</p>
                        <p className="mb-4 paragraf">{detailAksi.desc1}</p>
                        <p id="paragraf-konklusi" className="fw-bold paragraf">
                          {detailAksi.desc2}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default DetailAksiAdmin;
