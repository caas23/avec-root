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
		<a href="/bikes/add" className="add-bike-btn">Add new bike</a>
		</div>
	);
};

export default Bikes;
