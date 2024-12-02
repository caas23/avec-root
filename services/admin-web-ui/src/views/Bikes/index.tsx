import React, { useEffect } from "react";
// import "./index.css";


const Bikes: React.FC = () => {
	useEffect(() => {
		document.title = "Bikes - Avec";
}, []);
	return (
		<div>
			<h1>Bikes</h1>
		</div>
	);
};

export default Bikes;
