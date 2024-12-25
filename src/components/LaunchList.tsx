import { useState } from "react";
import LaunchItem from "./LaunchItem";
import LaunchFilter from "./LaunchFilter";
import { Launch } from "../types/Launch.interface";

interface LaunchListProps {
  launches: Launch[];
}

export default function LaunchList({ launches }: LaunchListProps) {
  const [filteredLaunches, setFilteredLaunches] = useState(launches);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);

  const currentLaunches = filteredLaunches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType: string, filterValue: string) => {
    let filtered = [...launches];
    if (filterType === "name") {
      filtered = filtered.filter((launch) =>
        launch.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === "success") {
      const successValue =
        filterValue.toLowerCase() === "true"
          ? true
          : filterValue.toLowerCase() === "false"
          ? false
          : null;
      filtered = filtered.filter((launch) => launch.success === successValue);
    }

    setFilteredLaunches(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <LaunchFilter onFilterChange={handleFilterChange} />
      <div className="pagination d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <h2>Launches</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Mission Name</th>
            <th>Date</th>
            <th>Rocket Name</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {currentLaunches.map((launch) => (
            <LaunchItem key={launch.id} launch={launch} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
