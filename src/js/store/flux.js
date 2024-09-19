const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			planets: [],
			vehicles: [],
			favorites: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			getCharacters: () => {
				const fetchPromises = [];
	
				for (let i = 1; i <= 10; i++) {
					fetchPromises.push(
						fetch("https://www.swapi.tech/api/people/" + i)
						.then((response) => response.json())
						.then((result) => ({
							properties: result.result.properties,
							_id: result.result._id,
							uid: result.result.uid,
							url: result.result.properties.url,
						}))
					);
				}
				Promise.all(fetchPromises)
				.then((data) => {
					setStore({characters: data});
				})
			},
			getPlanets: () => {
				const fetchPromises = [];
	
				for (let i = 1; i <= 10; i++) {
					fetchPromises.push(
						fetch("https://www.swapi.tech/api/planets/" + i)
						.then((response) => response.json())
						.then((result) => ({
							properties: result.result.properties,
							_id: result.result._id,
							uid: result.result.uid,
							url: result.result.properties.url,
						}))
					);
				}
				Promise.all(fetchPromises)
				.then((data) => {
					setStore({planets: data});
				})
			},
			
			getVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles/")
					.then((response) => response.json())
					.then((result) => {
						const allVehicles = result.results.map((vehicle) => vehicle.url);
			
						const fetchPromises = allVehicles.map((url) =>
							fetch(url)
								.then((response) => response.json())
								.then((result) => ({
									properties: result.result.properties,
									_id: result.result._id,
									uid: result.result.uid,
									url: result.result.properties.url,
								}))
						);
			
						return Promise.all(fetchPromises);
					})
					.then((data) => {
						setStore({ vehicles: data });
					})
			},
			addFavorites: (name) => {
				const store = getStore();

				// Verificar si el nombre ya está en el array de favoritos
				if (!store.favorites.includes(name)) {
					// Si no está, lo añadimos al array
					const updatedFavorites = [...store.favorites, name];
					setStore({ favorites: updatedFavorites });
				} else {
					setStore({favorites: store.favorites.filter((favorite) => favorite !== name)});
    			}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
