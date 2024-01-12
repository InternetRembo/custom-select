import React, {useEffect, useState} from "react";
import axios from "axios";
import {CheckBadgeIcon} from '@heroicons/react/24/solid'

import PokemonTrainerForm from "./pokemonTrainerForm/PokemonTrainerForm";
import PokemonTeamModal from "./pokemonTeamModal/pokemonTeamModal";

import Logoproqio from '/src/assets/logos/Logoproqio.png'

function App() {

	const [pokemonData, setPokemonData] = useState<PokemonItem[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<SelectOption[]>([]);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [formData , setFormData] = useState<PokemonTrainerFormValuesType | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20');
				const pokemonList = response.data.results;

				const processedData = await Promise.all(pokemonList.map(async (el: { url: string, name: string }) => {
					const detailsResponse = await axios.get(el.url);
					const {name, id} = detailsResponse.data;

					const img = detailsResponse.data.sprites.front_default;

					return {name, img, id};
				}));

				setPokemonData(processedData);
			} catch (error) {
				await console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<div
			className={' h-[100vh] flex justify-center bg-gradient-to-b from-yellow-300 to-orange-500 items-center gap-20 bg-gray-200'}>
			<img className={'absolute top-3 left-2 h-[80px]'} src={Logoproqio} alt={'logo'}/>
			<PokemonTrainerForm setIsFormSubmitted={setIsFormSubmitted}
								setFormData={setFormData}
								pokemonData={pokemonData}
								setSelectedPokemon={setSelectedPokemon}/>

			<PokemonTeamModal pokemonData={pokemonData}
							  selectedPokemon={selectedPokemon}/>

			{isFormSubmitted &&
			<div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center backdrop-blur-sm bg-opacity-50 bg-white">
				<div className="text-lg flex items-center justify-center mb-4">
					<h1 className="text-4xl font-bold mb-2">{`${formData?.firstName} ${formData?.secondName} , your team was successfully registered!`}</h1>
					<CheckBadgeIcon className="w-12 h-12 text-green-500 bg" />
				</div>
				<h2 className="mb-3 text-3xl font-semibold">
					{`Your choice is 
					 ${formData?.pokemonTeam[0].label},
					 ${formData?.pokemonTeam[1].label},
					 ${formData?.pokemonTeam[2].label} and
					 ${formData?.pokemonTeam[3].label} - looks amazing`}
				</h2>
				<h3 className={'text-2xl font-semibold'}>If you want to come back and create another team -&nbsp;
					<span className={'cursor-pointer text-blue-600 hover:text-blue-500'}
						  onClick={()=> setIsFormSubmitted(false)}
					>type here</span>
				</h3>
			</div>}
		</div>

	)
}

export default App
