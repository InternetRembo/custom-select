import React from 'react';

type PokemonTeamItemProps = {
	name:string;
	img:string;
}

const PokemonTeamItem = ({name, img}:PokemonTeamItemProps) => {
	return (
		<div className="w-[200px] h-[180px] p-4 flex border-2 border-orange-400 bg-yellow-300 rounded-md">
			<div >
				<img className={'h-[130px] w-[200px] rounded-md'} src={img} alt={name}/>
				<h3 className={'text-center font-semibold'}>
					{name && name.charAt(0).toUpperCase() + name.slice(1)}
				</h3>

			</div>
		</div>
	);
};

export default PokemonTeamItem;