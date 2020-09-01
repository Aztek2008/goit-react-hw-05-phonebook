import React from "react";

const marginStyle = {
  marginLeft: 10,
  marginTop: 30,
};

export default function Filter({ value, onChangeFilter }) {
  return (
    <label style={marginStyle}>
      <input
        type="text"
        name="filter"
        value={value}
        placeholder="Search contact..."
        onChange={(e) => onChangeFilter(e.target)}
      />
    </label>
  );
}
