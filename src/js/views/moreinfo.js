import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MoreInfo = props => {
	const params = useParams();
	const [properties,setProperties] = useState(null)

	useEffect(()=>{
		fetch("https://www.swapi.tech/api/"+params.nameCard+"/"+params.uid)
		.then(response => response.json())
		.then(data => {
            setProperties(data.result.properties);
        })
	},[])

	const getContent = () => {
		if (!properties) return null;

		const fields = {
			people: [
				["Name", properties.name],
				["Birth Year", properties.birth_year],
				["Gender", properties.gender],
				["Height", properties.height],
				["Skin Color", properties.skin_color],
				["Eye Color", properties.eye_color],
			],
			planets: [
				["Name", properties.name],
				["Climate", properties.climate],
				["Population", properties.population],
				["Orbital Period", properties.orbital_period],
				["Rotation Period", properties.rotation_period],
				["Diameter", properties.diameter],
			],
			vehicles: [
				["Name", properties.name],
				["Vehicle Class", properties.vehicle_class],
				["Cost in Credits", properties.cost_in_credits],
				["Crew", properties.crew],
				["Passengers", properties.passengers],
				["Max Speed", properties.max_atmosphering_speed],
			],
		};

		return fields[params.nameCard] ? (
			<div className="d-flex justify-content-center text-danger text-center ms-5 me-5 fw-bold">
				{fields[params.nameCard].map(([label, value], index) => (
					<div key={index} className="me-5 ms-5">
						<p>{label}</p>
						<p>{value}</p>
					</div>
				))}
			</div>
		) : (
			<p>Unknown type</p>
		);
	};

	return properties ? (
		<>
			<div className="d-flex mt-5">
				<div className="me-5">
					<img src="https://via.placeholder.com/650x500" alt="Placeholder" />
				</div>
				<div className="text-center w-100">
					<h1>{properties.name}</h1>
					<p className="fw-semibold fs-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit augue a lorem varius maximus. Phasellus commodo lacus eu urna tincidunt, vitae fermentum ligula porttitor. Nullam ut tincidunt quam. Nullam pellentesque dignissim neque, id volutpat quam finibus at. Maecenas efficitur purus non lacus accumsan, sed consequat velit tempus. Vestibulum molestie risus est, et laoreet dolor condimentum et. Praesent congue sit amet odio sit amet blandit. In rutrum pharetra odio, ut blandit justo. In lectus odio, pulvinar id dictum eget, elementum a arcu. Vestibulum nec est pellentesque lorem aliquet molestie. Suspendisse eget lorem sem.
					Nullam pharetra mollis rutrum. Ut nec condimentum lorem. Quisque lorem justo.</p>
				</div>
			</div>
			<hr className="my-4 text-danger " style={{ height: "3px" }}/>

			{getContent()}
			
		</>
	) : <></>;
};


