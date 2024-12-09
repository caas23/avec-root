import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import BikeDetails from "./BikeDetails";

import { tempDataBikes } from "./tempBikeData";

const Bike: React.FC = () => {
  const { bike: bikeId } = useParams<{ bike: string }>();

  useEffect(() => {
    document.title = `Bike ${bikeId} - Avec`;
  }, [bikeId]);

  const bikeData = tempDataBikes.find((bike) => bike._id === bikeId);

  return (
    <div>
      <h1>Bike {bikeId}</h1>
      {bikeData ? (
        <BikeDetails data={bikeData} />
      ) : (
        <p>No data related to bike <i>{bikeId}</i> was found.</p>
      )}
    </div>
  );
};

export default Bike;
