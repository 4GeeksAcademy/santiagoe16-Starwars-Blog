import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Card = (props) => {
	const { store, actions } = useContext(Context);
	const [isHovered, setIsHovered] = useState(false);
    const [onfavorites, setOnFavorites] = useState(false);
    useEffect(() => {
        if (store.favorites.includes(props.name)) {
            setOnFavorites(true);
        } else {
            setOnFavorites(false);
        }
    }, [store.favorites]);
    const nameCard = props.url.split("/").slice(-2, -1)[0];
	return (
        <>
            <div className="card mb-2" style={{ width: "19rem", flexShrink: 0, marginRight: '1rem' }}>
                <img src="https://via.placeholder.com/400x200" className="card-img-top" alt={`image of ${props.name}`} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text mb-0">{props.text1}</p>
                    <p className="card-text mb-0">{props.text2}</p>
                    <p className="card-text mb-3">{props.text3}</p>
                    <div className="d-flex justify-content-between">
                    <Link className="me-5" to={"/moreinfo/" + nameCard + "/" + props.uid}>
                        <span className="btn btn-primary" href="#" role="button">
                        Learn more!
                        </span>
                    </Link>
                    <i 
                    className={`${onfavorites ? "fas fa-heart" : "far fa-heart"} h5 p-2 border border-warning rounded-2 me-2 ${isHovered ? " bg-warning" : ""} ${isHovered ? "text-dark" : "text-warning"}`}
                    style={{cursor: "pointer"}}
                      onMouseEnter={()=>setIsHovered(true)} 
                      onMouseLeave={()=>setIsHovered(false)} 
                      onClick={()=> {
                        actions.addFavorites(props.name)}} ></i>
                    </div>
                </div>
            </div>
        </>
    )
};
