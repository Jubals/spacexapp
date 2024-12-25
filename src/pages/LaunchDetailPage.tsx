import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigateHomeButton from "../components/NavigateHomeButton";
import LaunchDetails from "../components/LaunchDetails";
import RocketDetails from "../components/RocketDetails";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

interface LaunchDetail {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  details: string;
  success: boolean | null;
  rocket: string;
  links: {
    patch: {
      small: string;
    };
    youtube_id: string | null;
  };
}

interface RocketDetails {
  name: string;
  type: string;
  description: string;
  stages: number;
  mass: {
    kg: number;
    lb: number;
  };
}

export default function LaunchDetailPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(true);
  const [data, setData] = useState<LaunchDetail | null>(null);
  const [rocketId, setRocketId] = useState<string | null>(null);
  const [rocketDetails, setRocketDetails] = useState<RocketDetails | null>(
    null
  );
  const { id } = useParams<{ id: string }>();

  const fetchLaunch = async () => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launches/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to get data, please try again later.");
      }
      const launchData: LaunchDetail = await response.json();
      console.log(launchData);
      setData(launchData);
      setRocketId(launchData.rocket);
      setIsPending(false);
    } catch (e) {
      console.log(e);
      setIsPending(false);
      setErrorMessage(
        "Error occured, please make sure you went to the right url, or try again later."
      );
    }
  };

  const fetchRocketDetails = async () => {
    if (!rocketId) return;

    try {
      const response = await fetch(
        `https://api.spacexdata.com/v4/rockets/${rocketId}`
      );
      if (!response.ok) {
        throw new Error(
          "Failed to get rocket details, please try again later."
        );
      }
      const rocketData: RocketDetails = await response.json();
      console.log(rocketData);
      setRocketDetails(rocketData);
      setIsPending(false);
    } catch (e) {
      console.log(e);
      setIsPending(false);
      setErrorMessage(
        "Error occured, please make sure you went to the right url, or try again later."
      );
    }
  };

  useEffect(() => {
    fetchLaunch();
  }, [id]);

  useEffect(() => {
    if (rocketId) {
      fetchRocketDetails();
    }
  }, [rocketId]);

  return (
    <div className="container mt-5">
      <Header />
      <NavigateHomeButton />
      {isPending && <Spinner />}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {data && (
        <div className="row mt-4">
          <div className="col-md-8">
            <LaunchDetails data={data} />
          </div>
          <div className="col-md-4">
            <RocketDetails rocketDetails={rocketDetails} />
          </div>
        </div>
      )}
    </div>
  );
}
