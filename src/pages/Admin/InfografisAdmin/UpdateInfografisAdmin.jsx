import { useNavigate } from "react-router";


const UpdateInfografisAdmin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container pt-4">
        <div className="addArtikel">
          <h3>Edit Article</h3>
          <div className="card mt-3 mb-5">
            <div className="card-header text-center  h4">
              FORM DATA EDIT INFOGRAFIS
            </div>
            <div className="card-body">
              <form>
                <div className="form-group row pt-3">
                  <label
                    htmlFor="judulInfografis"
                    className="col-sm-2 col-form-label"
                  >
                    Update Judul Infografis
                  </label>
                  <div className="col-md-5">
                    <input
                      name="judulInfografis"
                      type="text"
                      className="form-control"
                      id="judulInfografis"
                      //   value={judulInfografis}
                      //   onChange={(e) => setJudulInfografis(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row pt-3">
                  <label htmlFor="gambar" className="col-sm-2 col-form-label">
                    Update Gambar
                  </label>
                  <div className="col-md-5">
                    <input
                      type="file"
                      className="form-control-file"
                      id="gambar"
                      accept="image/*"
                      //   onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="card-footer text-body-secondary text-center">
                  <button
                    type="button"
                    className="btn btn-success text-white me-3"
                    onClick={() => navigate("/admin/infografis")}
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
    </div>
  );
};

export default UpdateInfografisAdmin;
