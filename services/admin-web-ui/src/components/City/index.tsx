import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import CityTable from "../CityTable";

// för test
import { tempDataBikes } from "./tempBikeData";
import { tempDataCharging } from "./tempChargingStationData";
import { tempDataParking } from "./tempParkingZoneData";
import { tempDataRules } from "./tempRulesData";

const City: React.FC = () => {
  const { city } = useParams<{ city: string }>();

  // ett sätt att bibehålla å, ä och ö när vi skriver ut stadens namn,
	// nackdel: behöva lägga in städer manuellt, fördel: smidig lösning
	// får fundera på bra lösning senare när db kommer in i bilden
  const cityNameDisplay: { [key: string]: string } = {
    lund: "Lund",
    solna: "Solna",
    skelleftea: "Skellefteå",
  };

  useEffect(() => {
    if (city) {
      document.title = `City ${cityNameDisplay[city]} - Avec`;
    }
  }, [city]);

  if (city) {
    const tableRows = [
      { category: "Bikes", count: tempDataBikes.length, data: tempDataBikes },
      { category: "Charging Stations", count: tempDataCharging.length, data: tempDataCharging },
      { category: "Parking Zones", count: tempDataParking.length, data: tempDataParking },
      { category: "Rules", count: tempDataRules.length, data: tempDataRules },
    ];

    return (
      <div>
        <h1>{cityNameDisplay[city]}</h1>
        <CityTable rows={tableRows} />
      </div>
    );
  }

  return null;
};

export default City;
