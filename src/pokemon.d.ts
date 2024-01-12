type PokemonItem = {
	name: string;
	img: string;
	id: number
}

type SelectOption = {
	label: string;
	value: string | number;
};

type PokemonTrainerFormValuesType = {
	firstName: string;
	secondName: string;
	pokemonTeam:SelectOption[]
};