import { useState } from "react";

interface LaunchFilterProps {
  onFilterChange: (filterType: string, filterValue: string) => void;
}

export default function LaunchFilter({ onFilterChange }: LaunchFilterProps) {
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    onFilterChange(newFilterType, filterValue);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterValue = e.target.value;
    setFilterValue(newFilterValue);
    onFilterChange(filterType, newFilterValue);
  };

  return (
    <div className="border p-4 mb-4 rounded shadow-sm">
      <h3 className="mb-3">Filter Launches</h3>
      
      <div className="mb-3">
        <label className="form-label d-block mb-2">Filter by:</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="filterType"
            value="name"
            checked={filterType === "name"}
            onChange={handleFilterTypeChange}
            className="form-check-input"
          />
          <label className="form-check-label">Mission Name</label>
        </div>
        <div className="form-check form-check-inline ms-3">
          <input
            type="radio"
            name="filterType"
            value="success"
            checked={filterType === "success"}
            onChange={handleFilterTypeChange}
            className="form-check-input"
          />
          <label className="form-check-label">Success</label>
        </div>
      </div>

      <div>
        <input
          type="text"
          className="form-control"
          placeholder={filterType === "name" ? "Enter mission name" : "Enter success status (true/false)"}
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </div>
    </div>
  );
}


