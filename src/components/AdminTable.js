// AdminTable.js
import React from "react";
import '../App.css'

const AdminTable = ({
  data,
  isEditing,
  editedId,
  editedName,
  editedEmail,
  editedRole,
  handleEdit,
  handleSave,
  handleDeleteRow,
  handleSelect,
  selected,
  handleSelectAll,
  setEditedName,
  setEditedEmail,
  setEditedRole,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-custom-style">
        <thead className="thead-dark">
          <tr>
            <th>
              <input id="selectAllCheckbox" type="checkbox" onChange={handleSelectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item) => (
            <tr key={item.id} className={selected.includes(item.id) ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>
                {isEditing && editedId === item.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {isEditing && editedId === item.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {isEditing && editedId === item.id ? (
                  <input
                    type="text"
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  item.role
                )}
              </td>
              <td>
                {isEditing && editedId === item.id ? (
                  <button
                    onClick={handleSave}
                    className="btn btn-outline-success btn-sm"
                  >
                    <img
                      width="16"
                      height="16"
                      src="https://img.icons8.com/fluency-systems-regular/48/40C057/save.png"
                      alt="save"
                    />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/sf-black/64/1A1A1A/create-new.png"
                        alt="create-new"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteRow(item.id)}
                      className="btn btn-outline-secondary btn-sm ml-2"
                    >
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/material-outlined/24/FA5252/delete.png"
                        alt="delete"
                      />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
