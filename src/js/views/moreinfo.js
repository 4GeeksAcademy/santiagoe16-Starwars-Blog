import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MoreInfo = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [properties,setProperties] = useState(null)

	useEffect(()=>{
		fetch("https://www.swapi.tech/api/"+params.nameCard+"/"+params.uid)
		.then(response => response.json())
		.then(data => {
            setProperties(data.result.properties);
        })
	},[])
	return properties ? (
		<>
			<div className="d-flex">
				<div className="me-5">
					<img src="https://via.placeholder.com/700x600" alt="Placeholder" />
				</div>
				<div className="text-center">
					<h1 className="text-center">{properties.name}</h1>
				</div>
			</div>
			<hr className="my-4" />
			<Link to="/">
				<span className="btn btn-primary btn-lg" role="button">
					Back home
				</span>
			</Link>
		</>
	) : <></>;
};


