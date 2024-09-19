import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="dropdown ml-auto">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						{store.favorites.map((favorite, index) => (
							<li key={index} onClick={()=> actions.addFavorites(favorite)} className=" dropdown-item user-select-none me-2"> {favorite} <i className="fas fa-trash ms-2" style={{cursor: "pointer"}}></i></li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
