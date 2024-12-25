import { useNavigate } from 'react-router-dom';
import { Launch } from '../types/Launch.interface';

interface LaunchItemProps {
  launch: Launch;
}

export default function LaunchItem({ launch }: LaunchItemProps) {
  const navigate = useNavigate();
  const handleLaunchClick = () => {
    navigate(`/launch/${launch.id}`);
  };
  return (
    <tr key={launch.id} style={{ cursor: "pointer" }} onClick={handleLaunchClick}>
      <td>{launch.flight_number}</td>
      <td>{launch.name}</td>
      <td>{launch.date}</td>
      <td>{launch.rocketName || "Unknown Rocket"}</td>
      <td>
        {launch.success !== null
          ? launch.success
            ? "Successful"
            : "Failed"
          : "Unknown"}
      </td>
    </tr>
  );
}
