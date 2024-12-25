import { useEffect, useState } from "react";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import LaunchList from "../components/LaunchList";
import { Launch } from "../types/Launch.interface";

interface LaunchApiResponse {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  success: boolean | null;
  rocket: string;
}

interface RocketApiResponse {
  id: string;
  name: string;
}

export default function HomePage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(true);
  const [data, setData] = useState<Launch[] | null>(null);
  const [rockets, setRockets] = useState<RocketApiResponse[]>([]);

  const fetchRockets = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/rockets");
      if (!response.ok) {
        throw new Error("Failed to get data, please try again later.");
      }
      const rocketsData: RocketApiResponse[] = await response.json();
      setRockets(rocketsData);
    } catch (e) {
      console.log(e);
      setIsPending(false);
      setErrorMessage("Failed to get data, ,please try again later");
    }
  };

  const fetchLaunches = async () => {
    setErrorMessage("");
    try {
      const response = await fetch("https://api.spacexdata.com/v4/launches");
      if (!response.ok) {
        throw new Error("Failed to get data, please try again later.");
      }
      const launchData: LaunchApiResponse[] = await response.json();
      const launchesData: Launch[] = launchData.map((launch) => {
        const dateUtc = launch.date_utc;
        const date = new Date(dateUtc);
        const formattedDate = date.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        const rocket = rockets.find((rocket) => rocket.id === launch.rocket);
        const rocketName = rocket ? rocket.name : "Unknown Rocket";
        const launchObject: Launch = {
          id: launch.id,
          flight_number: launch.flight_number,
          name: launch.name,
          date: formattedDate,
          success: launch.success,
          rocketName,
        };

        return launchObject;
      });
      setData(launchesData);
      setIsPending(false);
    } catch (e) {
      console.log(e);
      setIsPending(false);
      setErrorMessage("A connection error occurred, please try again later.");
    }
  };
  useEffect(() => {
    fetchRockets();
  }, []);

  useEffect(() => {
    if (rockets.length > 0) {
      fetchLaunches();
    }
  }, [rockets]);

  return (
    <div className="container mt-5">
      <Header />
      {isPending && <Spinner />}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {data && <LaunchList launches={data} />}
    </div>
  );
}
