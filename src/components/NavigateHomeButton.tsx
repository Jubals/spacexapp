import { Link } from "react-router-dom";

export default function NavigateHomeButton() {
  return (
    <Link to={`/`} className="nav-link text-center">
      <div className="container mt-5">
        <button className="btn btn-primary">Go Back to Home</button>
      </div>
    </Link>
  );
}
