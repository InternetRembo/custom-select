import React, {FC, ReactNode, useState} from "react";
import {Meta} from "@storybook/react";

import {CustomSelect} from "../pokemonTrainerForm/CustomSelect";

const defaultOptions = [
	{value: 'blue', label: 'Blue'},
	{value: 'green', label: 'Green'},
	{value: 'yellow', label: 'Yellow'},
	{value: 'red', label: 'Red'},
	{value: 'white', label: 'White'},
];

type StoryCaseProps = {
	children: ReactNode;
	isDropdownOpen?: boolean;
};

interface StoryModuleProps {
	label: string;
	values: SelectOption[];
	onChange: (selectedOption: SelectOption[]) => void;
	additionalText?: string;
	isDropdownOpen?: boolean;
	textValue?: string,
	isHover?: boolean;
	isFocus?: boolean;
	isDisabled?: boolean;
	isError?: string | undefined
}

const StoryCase: FC<StoryCaseProps> = ({children, isDropdownOpen}) => {
	const [isOpen, setIsOpen] = useState(isDropdownOpen);

	return (
		<div className={` ${isOpen ? 'h-[340px]' : 'h-[160px]'} p-4 flex flex-col`}>
			<div onClick={() => setIsOpen(!isOpen)} onBlur={() =>{setIsOpen(false)}}>
				{children}
			</div>
		</div>
	);
};

const StoryModule: FC<StoryModuleProps> = (
	{
		label,
		values,
		onChange,
		additionalText,
		textValue,
		isDropdownOpen,
		isHover,
		isFocus,
		isDisabled,
		isError,
	}) => {
	return (
		<StoryCase isDropdownOpen={isDropdownOpen}>
			{additionalText && (
				<div className={'text-center'}>
					<h1 className={'text-xl font-bold mb-3'}>{additionalText}</h1>
					<h2 className={'text-lg font-semibold italic mb-3'}>{additionalText}</h2>
				</div>
			)}

			<CustomSelect
				label={label}
				value={values}
				options={defaultOptions}
				onChange={(selectedOption) => {
					onChange(selectedOption);
				}}
				isHover={isHover}
				isFocus={isFocus}
				isDisabled={isDisabled}
				textValue={textValue}
				isError={isError}
			/>

		</StoryCase>
	);
};

const meta: Meta<typeof CustomSelect> = {
	title: 'Select',
	component: CustomSelect,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

export const Default = () => {
	const [values, setValues] = useState<SelectOption[]>([]);
	return (
		<div className={'flex flex-col items-center p-4'}>
			<h2 className={'text-lg font-semibold italic mb-2'}>This is what the select will look like if no additional
				settings are given to it</h2>
			<StoryModule label={'Colour select'} values={values} onChange={setValues}/>
		</div>
	);
};

export const FilledAndSelected = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([
		{value: 'blue', label: 'Blue'},
		{value: 'green', label: 'Green'},
	]);

	return (
		<div className={'flex justify-center'}>
			<StoryModule label={'Colour select'}
						 values={firstCaseValues}
						 onChange={setFirstCaseValues}
						 isDropdownOpen={true}
						 additionalText={'Filled'}
						 textValue={'Re'}/>

			<StoryModule label={'Colour select'}
						 values={secondCaseValues}
						 onChange={setSecondCaseValues}
						 isDropdownOpen={false}
						 additionalText={'Selected'}/>
		</div>
	);
};

export const MouseEvents = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([]);

	return (
		<div className={'flex justify-center'}>
			<StoryModule label={'Colour select'}
						 values={firstCaseValues}
						 onChange={setFirstCaseValues}
						 isDropdownOpen={false}
						 additionalText={'Hovered'}
						 isHover={true}/>

			<StoryModule label={'Colour select'}
						 values={secondCaseValues}
						 onChange={setSecondCaseValues}
						 isDropdownOpen={true}
						 additionalText={'Focused'}
						 isFocus={true}/>
		</div>
	);
};

export const DisabledAndValidated = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([]);

	return (
		<div className={'flex justify-center'}>

			<StoryModule
				label={'Colour select'}
				values={firstCaseValues}
				onChange={setFirstCaseValues}
				isDropdownOpen={false}
				additionalText={'Disabled'}
				isDisabled={true}/>

			<StoryModule
				label={'Colour select'}
				values={secondCaseValues}
				onChange={setSecondCaseValues}
				isDropdownOpen={false}
				isError={secondCaseValues.length < 1 ? 'Select at least one colour' : undefined}
				additionalText={'With validation error'}
			/>
		</div>
	);
};