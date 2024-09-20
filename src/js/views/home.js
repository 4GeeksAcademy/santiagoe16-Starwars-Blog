import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";
export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
        <>
            <h1 className="text-danger">characters</h1>
            <div className="mb-5 d-flex overflow-auto">
                {store.characters.map((character) => (
                    <Card
                        key={character._id}
                        name={character.properties.name}
                        text1={`Gender ${character.properties.gender}`}
                        text2={`Hair colo: ${character.properties.hair_color}`}
                        text3={`Eye color: ${character.properties.eye_color}`}
                        uid={character.uid}
                        url={character.url}
                    ></Card>
                ))}
            </div>

            <h1 className="text-danger">Planets</h1>
            <div className="mb-5 d-flex overflow-auto">
                {store.planets.map((planet) => (
                    <Card
                        key={planet._id}
                        name={planet.properties.name}
                        text1={`population: ${planet.properties.population}`}
                        text2={`terrain: ${planet.properties.terrain}`}
                        text3={`climate: ${planet.properties.climate}`}
                        uid={planet.uid}
                        url={planet.url}
                    ></Card>
                ))}
            </div>

            <h1 className="text-danger">Vehicles</h1>
            <div className="mb-5 d-flex overflow-auto">
                {store.vehicles.map((vehicle) => (
                    <Card
                        key={vehicle._id}
                        name={vehicle.properties.name}
                        text1={`vehicle class: ${vehicle.properties.vehicle_class}`}
                        text2={`cargo capacity: ${vehicle.properties.cargo_capacity}`}
                        text3={`cost in credits: ${vehicle.properties.cost_in_credits}`}
                        uid={vehicle.uid}
                        url={vehicle.url}
                    ></Card>
                ))}
            </div>
        </>
    )
};
