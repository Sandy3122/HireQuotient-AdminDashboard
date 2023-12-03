// AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AdminTable from "./AdminTable";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(res.data);
        setFilteredData(res.data.slice(0, 10));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditedId(id);

    const currentItem = data.find((item) => item.id === id);
    setEditedName(currentItem.name);
    setEditedEmail(currentItem.email);
    setEditedRole(currentItem.role);
  };

  const handleSave = () => {
    const updatedData = data.map((item) => {
      if (item.id === editedId) {
        return {
          ...item,
          name: editedName,
          email: editedEmail,
          role: editedRole,
        };
      }
      return item;
    });

    setData(updatedData);
    setFilteredData(updatedData.slice((page - 1) * 10, page * 10));
    setIsEditing(false);
    setEditedId(null);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);

    if (searchTerm === "") {
      setFilteredData(data.slice((page - 1) * 10, page * 10));
    } else {
      const filteredData = data.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm)
        );
      });

      setFilteredData(filteredData.slice(0, 10));
    }
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData.slice((page - 1) * 10, page * 10));
    setSelected(selected.filter((item) => item !== id));
  };

  const handleDeleteSelectedRows = () => {
    const updatedData = data.filter((item) => !selected.includes(item.id));
    setData(updatedData);
    setFilteredData(updatedData.slice((page - 1) * 10, page * 10));
    setSelected([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(
        data.slice((page - 1) * 10, page * 10).map((item) => item.id)
      );
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setFilteredData(data.slice((pageNumber - 1) * 10, pageNumber * 10));
  };

  const renderPageNumbers = () => {
    const totalPageCount = Math.ceil(data.length / 10);
    const visiblePageNumbers = 3; // Change this value to set the number of visible page numbers

    const getPageNumbers = () => {
      const currentPage = page;
      const halfVisiblePages = Math.floor(visiblePageNumbers / 2);

      let startPage = Math.max(1, currentPage - halfVisiblePages);
      let endPage = Math.min(totalPageCount, startPage + visiblePageNumbers - 1);

      if (endPage - startPage + 1 < visiblePageNumbers) {
        startPage = Math.max(1, endPage - visiblePageNumbers + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const pageNumbers = getPageNumbers();

    return (
      <>
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-outline-secondary btn-sm ml-2 ${
              page === pageNumber ? "active" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPageCount && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPageCount - 1 && (
              <span className="ml-2">..</span>
            )}
            <button
              onClick={() => handlePageChange(totalPageCount)}
              className={`btn btn-outline-secondary btn-sm ml-2 last-page`}
            >
              {totalPageCount}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
          <div className="">
            <button
              onClick={handleDeleteSelectedRows}
              className="btn btn-danger"
            >
              Delete Selected
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <AdminTable
            data={filteredData}
            isEditing={isEditing}
            editedId={editedId}
            editedName={editedName}
            editedEmail={editedEmail}
            editedRole={editedRole}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDeleteRow={handleDeleteRow}
            handleSelect={handleSelect}
            selected={selected}
            handleSelectAll={handleSelectAll}
            setEditedName={setEditedName}
            setEditedEmail={setEditedEmail}
            setEditedRole={setEditedRole}
          />
        </div>
        <Pagination
          page={page}
          handlePageChange={handlePageChange}
          totalPageCount={Math.ceil(data.length / 10)}
          renderPageNumbers={renderPageNumbers}
        />
      </div>
    </>
  );
};

export default AdminDashboard;