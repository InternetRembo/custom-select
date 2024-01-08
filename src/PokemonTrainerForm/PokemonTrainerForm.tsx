import React, {useState} from 'react';
import {SubmitHandler, useForm , Controller} from "react-hook-form";
import { InformationCircleIcon , StarIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

import {CustomSelect} from "./CustomSelect";
import {ErrorMessage} from "./ErrorMessage";

type PokemonTrainerFormValuesType = {
	firstName: string;
	secondName: string;
	pokemonTeam:[any]
};

export const pokemonOptions = [
	{ value: 'bulbasaur', label: 'Bulbasaur' },
	{ value: 'charmander', label: 'Charmander' },
	{ value: 'Pokemon', label: 'Pokemon' },
	{ value: 'Naruto', label: 'Naruto' },
	{ value: 'charmander1', label: 'Charmander22' },
	{ value: '4', label: 'Charmander9' },
	{ value: '5', label: 'CharmanderU' },
];

const PokemonTrainerForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<PokemonTrainerFormValuesType>();

	const onSubmit: SubmitHandler<PokemonTrainerFormValuesType> = async (data) => {
		let formData = {
			firstName: data.firstName,
			secondName: data.secondName,
			pokemonTeam:data.pokemonTeam
		};
	};

	const [isFirstNameOnFocus, setIsFirstNameOnFocus] = useState(false);
	const [isSecondNameOnFocus, setIsSecondNameOnFocus] = useState(false);

	return (
		<div className={'h-[500px] w-[500px] bg-white rounded-lg shadow-2xl p-8 flex flex-col'}>
			<h1 className={'text-2xl font-semibold'}>Create your Pokemon team</h1>

			<form className={'w-[400px]'} onSubmit={handleSubmit(onSubmit)}>

				<div className="mt-6">
					<label htmlFor="firstName" className="block font-medium ">
						<span> First Name <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<input
						className={`py-4 form_input
						${isFirstNameOnFocus && 'focused_input'}
						${errors.firstName ? 'border-red-500 outline outline-1 outline-red-500' : 'hover:hovered_input'}`}

						onClick={()=> setIsFirstNameOnFocus(true)}

						{...register("firstName", {
							onBlur:()=>setIsFirstNameOnFocus(false),
							required: "Please enter your first name",
						})}
						placeholder="Enter your first name"
					/>

					{errors.firstName && <ErrorMessage error={errors.firstName.message} />}
				</div>

				<div className="mt-6">
					<label htmlFor="secondName" className="block font-medium ">
						<span> Second Name <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<input
						className={`py-4 form_input 
						${isSecondNameOnFocus && 'focused_input'}
						${errors.secondName ? 'border-red-500 outline outline-1 outline-red-500' : 'hover:hovered_input'}
						`}

						onClick={()=>setIsSecondNameOnFocus(true)}

						{...register("secondName", {
							onBlur:()=>setIsSecondNameOnFocus(false),
							required: "Please enter your second name",
						})}
						placeholder="Enter your second name"
					/>

					{errors.secondName && <ErrorMessage error={errors.secondName.message} />}
				</div>

				<div className="mt-6">
					<label htmlFor="pokemonTeam" className="block font-medium">
						<span> Pokemon Team <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<Controller
						control={control}
						{...register("pokemonTeam", {
							onBlur:()=>setIsSecondNameOnFocus(false),
							required: "Please choose 4 pokemons",
						})}
						render={({ field }) => (
							<CustomSelect
								label={'Select a pokemons'}
							options={pokemonOptions}
							value={field.value}
							isError={errors.pokemonTeam?.message}
							onChange={(selectedOptions) => {
								field.onChange(selectedOptions);
							}}
							/>
						)}
					/>
				</div>

					<button
						type="submit"
						className="h-12 bg-blue-800 mt-6 hover:bg-blue-700 p-3 rounded-md bg-blue-800 text-white flex items-center gap-1 "
					>
					 <StarIcon className={'h-[20px]'} /> Submit <ChevronDownIcon className={'h-[16px] font-bold'}/>
					</button>

			</form>
		</div>
	);
};

export default PokemonTrainerForm;