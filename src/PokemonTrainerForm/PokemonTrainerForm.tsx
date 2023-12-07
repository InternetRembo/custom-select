import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import { InformationCircleIcon , StarIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

type PokemonTrainerFormValuesType = {
	firstName: string;
	secondName: string;
	pokemonTeam:[any]
};

const PokemonTrainerForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PokemonTrainerFormValuesType>();

	const onSubmit: SubmitHandler<PokemonTrainerFormValuesType> = async (data) => {
		let formData = {
			firstName: data.firstName,
			secondName: data.secondName,
			pokemonTeam:data.pokemonTeam
		};
		console.log('data' , formData)
	};

	return (
		<div className={'h-[500px] w-[500px] bg-white rounded-lg shadow-2xl p-8 flex flex-col'}>
			<h1 className={'text-2xl font-semibold'}>Create your Pokemon team</h1>

			<form className={'w-[400px]'} onSubmit={handleSubmit(onSubmit)}>

				<div className="mt-6">
					<label htmlFor="firstName" className="block font-medium ">
						<span> First Name <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<input
						className="min-w-[400px] h-[40px] rounded-md border border-gray-500 px-3 py-4"
						{...register("firstName", {
							required: "This information is required",
						})}
						placeholder="Enter your first name"
					/>
				</div>

				<div className="mt-6">
					<label htmlFor="secondName" className="block font-medium ">
						<span> Second Name <InformationCircleIcon className="w-5 h-5 inline-block mb-1 " /></span>
					</label>
					<input
						className="min-w-[400px] h-[40px] rounded-md border border-gray-500 px-3 py-4"
						{...register("secondName", {
							required: "This information is required",
						})}
						placeholder="Enter your second name"
					/>
				</div>

					<button
						type="submit"
						className="h-12 bg-blue-800 mt-6 hover:bg-blue-700 p-3 rounded-md bg-blue-800 text-white flex items-center gap-1 "
					>
					 <StarIcon className={'h-[20px]'} />	Submit <ChevronDownIcon className={'h-[16px] font-bold'}/>
					</button>

			</form>
		</div>
	);
};

export default PokemonTrainerForm;