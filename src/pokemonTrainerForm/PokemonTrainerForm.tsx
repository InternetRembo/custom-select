import React, {useState} from 'react';
import {SubmitHandler, useForm , Controller} from "react-hook-form";
import { InformationCircleIcon , StarIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

import {CustomSelect} from "./CustomSelect";
import {ErrorMessage} from "./ErrorMessage";

type PokemonTrainerFormProps = {
	pokemonData:PokemonItem[],
	setSelectedPokemon: (value:SelectOption[]) => void
	setIsFormSubmitted:(bool:boolean) => void
	setFormData:(value:PokemonTrainerFormValuesType)=> void
}


const PokemonTrainerForm = ({pokemonData , setSelectedPokemon , setIsFormSubmitted , setFormData}:PokemonTrainerFormProps) => {

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm<PokemonTrainerFormValuesType>();

	const onSubmit: SubmitHandler<PokemonTrainerFormValuesType> = async (data) => {
		let pokemonFormData = {
			firstName: data.firstName,
			secondName: data.secondName,
			pokemonTeam:data.pokemonTeam
		};

		setFormData(pokemonFormData)
		setIsFormSubmitted(true)
		setValue('pokemonTeam', []);
		setSelectedPokemon([])
		reset()
	};

	const pokemonOptions = pokemonData.map((el) => ({ label: el.name.charAt(0).toUpperCase() + el.name.slice(1) , value:el.id }));

	const [isFirstNameOnFocus, setIsFirstNameOnFocus] = useState(false);
	const [isSecondNameOnFocus, setIsSecondNameOnFocus] = useState(false);

	return (
		<div className={'h-[500px] w-[500px] bg-white rounded-lg shadow-2xl p-8 flex flex-col'}>
			<h1 className={'text-2xl font-semibold'}>Create your Pokemon team</h1>

			<form className={'w-[400px]'} onSubmit={handleSubmit(onSubmit)}>

				<div className="mt-4">
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
							minLength: {
								value: 2,
								message: "First name should be at least 2 characters long",
							},
							maxLength: {
								value: 12,
								message: "First name should be no more than 12 symbols",
							},
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: "First name should contain only letters",
							},
						})}
						placeholder="Enter your first name"
					/>

					{errors.firstName && <ErrorMessage error={errors.firstName.message} />}
				</div>

				<div className="mt-4 relative">
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
							minLength: {
								value: 2,
								message: "Second name should be at least 2 characters long",
							},
							maxLength: {
								value: 12,
								message: "Second name should be no more than 12 symbols",
							},
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: "Second name should contain only letters",
							},
						})}
						placeholder="Enter your second name"
					/>

					{errors.secondName && <ErrorMessage error={errors.secondName.message} />}
				</div>

				<div className="mt-4">
					<label htmlFor="pokemonTeam" className="block font-medium">
						<span> Pokemon Team <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<Controller
						control={control}
						{...register('pokemonTeam', {
							onBlur: () => setIsSecondNameOnFocus(false),
							validate: (value) => value?.length === 4 || 'Please choose exactly 4 pokemons',
						})}
						render={({ field }) => (
							<CustomSelect
								label={'Select a pokemons'}
								options={pokemonOptions}
								value={field.value}
								maxSelections={4}
								isError={errors.pokemonTeam?.message}
								onChange={(selectedOptions) => {
									field.onChange(selectedOptions);
									setSelectedPokemon(selectedOptions);
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