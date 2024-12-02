import React, { useEffect } from "react";
// import "./index.css";

const Cities: React.FC = () => {
	useEffect(() => {
		document.title = "Cities - Avec";
}, []);
	return (
		<div>
			<h1>Cities</h1>
		</div>
	);
};

export default Cities;
