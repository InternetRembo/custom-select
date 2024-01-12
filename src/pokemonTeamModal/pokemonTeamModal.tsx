import React from 'react';
import PokemonTeamItem from "./pokemonTeamItem/PokemonTeamItem";

type PokemonTeamModal = {
	pokemonData:PokemonItem[];
	selectedPokemon:SelectOption[];
}

const PokemonTeamModal = ({pokemonData , selectedPokemon}:PokemonTeamModal) => {
	return (
		<div className={'flex items-center justify-center relative'}>
			<div className={'h-[500px] w-[500px] bg-white rounded-lg shadow-2xl p-6 flex flex-col'}>
				<h2 className={'text-2xl font-semibold text-center'}>Here is your team</h2>

				{selectedPokemon.length > 0 ?
					<div className="w-[440px] h-[400px] flex flex-wrap justify-between gap-4 mt-4">
						{selectedPokemon.map((el) => {
							let p = pokemonData.find((pokemon) => pokemon.id === el.value);

							if (p) {
								return <PokemonTeamItem key={p.id} name={p.name} img={p.img} />;
							}

							return null
						})}
					</div>
					: <h1 className={' w-full font-bold text-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
						Your selected pokemons will appear here
					</h1>
				}
			</div>
		</div>
	);}

export default PokemonTeamModal;