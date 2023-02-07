import React from 'react';
import './SortButton.css';

const SortButton = ({ col, sortOrder, onSortOrderChange }) => {
  const handleAscendingClick = () => {
    if (sortOrder.col === col && sortOrder.order === "asc") {
      onSortOrderChange("", "");
    } else {
      onSortOrderChange(col, "asc");
    }
  };
  const handleDescendingClick = () => {
    if (sortOrder.col === col && sortOrder.order === "dsc") {
      onSortOrderChange("", "");
    } else {
      onSortOrderChange(col, "dsc");
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: sortOrder.col === col && sortOrder.order === "asc"
            ? "lightgray"
            : "white"
        }}
        onClick={handleAscendingClick}
      >
        ▲
      </button>
      <button
        style={{
          backgroundColor: sortOrder.col === col && sortOrder.order === "dsc" 
          ? "lightgray" 
          : "white"
        }}
        onClick={handleDescendingClick}
      >
        ▼
      </button>
    </div>
  );
};

export default SortButton;
