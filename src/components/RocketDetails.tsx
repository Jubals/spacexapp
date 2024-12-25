interface RocketDetailsProps {
  rocketDetails: {
    name: string;
    type: string;
    description: string;
    stages: number;
    mass: {
      kg: number;
      lb: number;
    };
  } | null;
}

export default function RocketDetails({ rocketDetails }: RocketDetailsProps) {
  if (!rocketDetails) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h5>Rocket Details</h5>
      </div>
      <div className="card-body">
        <h6>Rocket Name: {rocketDetails.name}</h6>
        <p>
          <strong>Type:</strong> {rocketDetails.type}
        </p>
        <p>
          <strong>Description:</strong> {rocketDetails.description}
        </p>
        <p>
          <strong>Stages:</strong> {rocketDetails.stages}
        </p>
        <p>
          <strong>Mass:</strong> {rocketDetails.mass.kg} kg (
          {rocketDetails.mass.lb} lb)
        </p>
      </div>
    </div>
  );
}
