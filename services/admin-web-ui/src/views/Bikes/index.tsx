import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

import { tempDataBikes } from "../../components/Bike/tempBikeData";

const Bikes: React.FC = () => {
	useEffect(() => {
		document.title = "Bikes - Avec";
	
	}, []);
	const navigate = useNavigate();

	const displayBike = (bike: string) => {
		navigate(`/bike/${bike}`);
  	};

	return (
		<div>
			<h1>Bikes</h1>
			<ul className="bike-list">
			{tempDataBikes.map((bike, index) => (
				<li 
					key={bike._id}
					onClick={() => displayBike(bike._id)}
					className={index === tempDataBikes.length - 1 ? "li-last-bike" : ""}
				>
            		{bike._id}
          		</li>
        	))}
      	</ul>
		<p>Add new bike (not implemented yet)</p>
		</div>
	);
};

export default Bikes;
