import YouTubeEmbed from "./YouTubeEmbed";

interface LaunchDetail {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  details: string;
  success: boolean | null;
  links: {
    patch: {
      small: string;
    };
    youtube_id: string | null;
  };
}

interface LaunchDetailsProps {
  data: LaunchDetail;
}

export default function LaunchDetails({ data }: LaunchDetailsProps) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Flight Name: {data.name}</h5>
      </div>
      <div className="card-body">
        <p>
          <strong>Flight Number:</strong> {data.flight_number || 'N/A'}
        </p>
        <p>
          <strong>Date:</strong> {new Date(data.date_utc).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
        </p>
        <p>
          <strong>Details:</strong> {data.details || 'N/A'}
        </p>
        <p>
          <strong>Success:</strong> {data.success?.toString() ?? "Unknown"}
        </p>
        {data.links.patch.small && (
          <div className="text-center mb-3">
            <img
              src={data.links.patch.small}
              alt="Launch Patch"
              className="img-fluid"
            />
          </div>
        )}
        {data.links.youtube_id && (
          <YouTubeEmbed videoId={data.links.youtube_id} />
        )}
      </div>
    </div>
  );
}
