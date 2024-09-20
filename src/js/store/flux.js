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

				if (!store.favorites.includes(name)) {
					
					const updatedFavorites = [...store.favorites, name];
					setStore({ favorites: updatedFavorites });
				} else {
					setStore({favorites: store.favorites.filter((favorite) => favorite !== name)});
    			}
			},
			changeColor: (index, color) => {
				
				const store = getStore();

				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
