import "./DonasiAdmin.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useNavigate } from "react-router";
import { Spinner } from "react-bootstrap";
import axios from "axios";
// import DonationVector from "../../../assets/DonationVector.jpg";

const DonasiAdmin = () => {
  const [donasiData, setDonasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonasi, setTotalDonasi] = useState(0);
  const roleLocalStorage = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleDelete = (name, user_id) => {
    Swal.fire({
      title: `Apakah anda yakin ingin menghapus donasi dari ${name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement your delete logic here
        // Update the donasiData state after successful deletion
        setDonasiData((prevData) =>
          prevData.filter((user) => user.id !== user_id)
        );
        Swal.fire("Berhasil!", "Berhasil Hapus Data Donasi", "success");
      }
    });
  };

  const formatTime = (dateTime) => {
    const indonesianTime = dayjs(dateTime)
      .locale("id")
      .format("D MMMM YYYY, HH:mm:ss");
    return indonesianTime;
  };

  useEffect(() => {
    // if (roleLocalStorage === null) {
    //   if (localStorage.getItem("role") == null) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Terjadi Kesalahan !",
    //       text: "Anda Harus Login Terlebih Dahulu",
    //       confirm: {
    //         text: "OK",
    //         value: true,
    //       },
    //     }).then((value) => {
    //       if (value) {
    //         navigate("/login");
    //       }
    //     });
    //   } else if (localStorage.getItem("role") === "user") {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Anda Bukan Admin !",
    //       text: "User Tidak Bisa Akses Ke Halaman Admin!",
    //       confirm: {
    //         text: "OK",
    //         value: true,
    //       },
    //     }).then((value) => {
    //       if (value) {
    //         navigate("/");
    //       }
    //     });
    //   }
    // }

    // Assuming you have an API endpoint to fetch donasi data
    // Replace the following with your actual API call
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await fetch("your_api_endpoint");
        const data = await response.json();

        // Update state with fetched data
        setDonasiData(data.result);
        setTotalDonasi(data.totalDonasi);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching donasi data", error);
        setIsLoading(false);
      }
    };

    if (roleLocalStorage === "admin") {
      fetchData();
    }
  }, [navigate]);

  return (
    <>
      <NavbarAdmin />
      <div className="container pt-4">{/* ... (rest of your code) */}</div>
    </>
  );
};

export default DonasiAdmin;
