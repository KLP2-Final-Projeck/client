import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer id="footer" className="mt-auto">
        <div className="container">
          <div className="row pt-3">
            <div className="col-sm-12 col-md-5">
              <h5 className="judulDeskripsiGardenPlants text-bold text-start">
                Garden Plants
              </h5>
              <p className="deskripsiGardenPlants">
                Garden Plants berfokus pada komunitas tanaman hias dan solusi
                untuk menjaga tanaman hias. Website ini meningkatkan keterkaitan
                antara lingkungan dan pemikiran, serta menjaga tanaman hias
                seperti merawat kebahagian dalam hidup.
              </p>
            </div>
            <div className="col-sm-12 col-md-4 text-align: justify;">
              <h6 className="text-bold text-white">Informasi Kontak</h6>
              <p className="mb-1">
                <i className="bi bi-telephone"></i> 0831 3715 6650
              </p>
              <p className="mb-1">
                <i className="bi bi-envelope"></i> gardenplants23@gmail.com
              </p>
              <p className="mb-1">
                <i className="bi bi-geo-alt"></i> Jl. Lestari No. 99 Planet Mars
              </p>
            </div>
            <div id="medsos" className="col-sm-12 col-md-3">
              <h6 className="text-bold text-white">Media Sosial</h6>

              <Link
                className="bg-white fs-4 text-dark  pb-1 ps-2 pe-2 m-1 border rounded"
                to="https://www.instagram.com/greenpeaceid/"
              >
                <i>
                  <FaInstagram />
                </i>
              </Link>
              <Link
                className="bg-white fs-4  pb-1 ps-2 pe-2 m-1 border rounded"
                to="https://www.facebook.com/GreenpeaceIndonesia/"
              >
                <i>
                  <FaFacebook />
                </i>
              </Link>
              <Link
                className="bg-white fs-4 pb-1 ps-2 pe-2 m-1 border rounded"
                to="https://twitter.com/greenpeaceid"
              >
                <i>
                  <FaTwitter />
                </i>
              </Link>
              <Link
                className="bg-white fs-4  pb-1 ps-2 pe-2 m-1 border rounded text-danger"
                to="https://www.youtube.com/greenpeaceindonesia"
              >
                <i>
                  <FaYoutube />
                </i>
              </Link>
            </div>
          </div>
          <hr className="mb-3 opacity-100 border border-white " />
          <div className="row pb-0 pb-md-3">
            <div className="col-sm-12 col-md-6 text-white text-align: justify">
              Copyright &#169; 2023. The Miracle. All Right Reserved.
            </div>
            <div
              id="country"
              className="col-sm-12 col-md-6 text-center text-md-end mb-5 mb-md-0 text-white"
            >
              Indonesia
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
