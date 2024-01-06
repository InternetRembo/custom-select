import { Meta } from "@storybook/react";
import { CustomSelect, SelectOption } from "../PokemonTrainerForm/CustomSelect";
import { FC, ReactNode, useState } from "react";

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

type StoryCaseProps = {
	children: ReactNode;
	isDropdownOpen?: boolean;
};

const StoryCase: FC<StoryCaseProps> = ({ children, isDropdownOpen }) => {
	const [isOpen, setIsOpen] = useState(isDropdownOpen);

	return (
		<div className={` ${isOpen ? 'h-[340px]' : 'h-[160px]'} p-4 flex flex-col text-center`}>
			<div onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)}>
				{children}
			</div>
		</div>
	);
};

const defaultOptions = [
	{ value: 'blue', label: 'Blue' },
	{ value: 'green', label: 'Green' },
	{ value: 'yellow', label: 'Yellow' },
	{ value: 'red', label: 'Red' },
];

interface StoryModuleProps {
	label: string;
	values: SelectOption[];
	onChange: (selectedOption: SelectOption[]) => void;
	additionalText?: string;
	isDropdownOpen?: boolean;
	textValue?:string,
	hover?: boolean;
	focus?: boolean;
	disabled?: boolean;
}

const StoryModule: FC<StoryModuleProps> = ({ label, values, onChange, additionalText, isDropdownOpen, hover, focus, disabled }) => {
	return (
		<StoryCase isDropdownOpen={isDropdownOpen}>
			{additionalText && (
				<>
					<h1 className={'text-xl font-bold mb-3'}>{additionalText}</h1>
					<h2 className={'text-lg font-semibold italic mb-3'}>{additionalText}</h2>
				</>
			)}
			<CustomSelect
				label={label}
				value={values}
				options={defaultOptions}
				onChange={(selectedOption) => {
					onChange(selectedOption);
				}}
				hover={hover}
				focus={focus}
				disabled={disabled}
			/>
		</StoryCase>
	);
};

export const Default = () => {
	const [values, setValues] = useState<SelectOption[]>([]);
	return (
		<div className={'flex flex-col items-center p-4'}>
			<h2 className={'text-lg font-semibold italic mb-2'}>This is what the select will look like if no additional settings are given to it</h2>
			<StoryModule label={'Colour select'} values={values} onChange={setValues} />
		</div>
	);
};

export const FilledAndSelected = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([
		{ value: 'blue', label: 'Blue' },
		{ value: 'green', label: 'Green' },
	]);

	return (
		<div className={'flex justify-center'}>
			<StoryModule label={'Colour select'} values={firstCaseValues} onChange={setFirstCaseValues} isDropdownOpen={true} additionalText={'Filled'} hover={true} textValue={'Re'} />
			<StoryModule label={'Colour select'} values={secondCaseValues} onChange={setSecondCaseValues} isDropdownOpen={false} additionalText={'Selected'} />
		</div>
	);
};

export const MouseEvents = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([]);

	return (
		<div className={'flex justify-center'}>
			<StoryModule label={'Colour select'} values={firstCaseValues} onChange={setFirstCaseValues} isDropdownOpen={false} additionalText={'Hovered'} hover={true} />
			<StoryModule label={'Colour select'} values={secondCaseValues} onChange={setSecondCaseValues} isDropdownOpen={true} additionalText={'Focused'} focus={true} />
		</div>
	);
};

export const DisabledAndValidated = () => {
	const [firstCaseValues, setFirstCaseValues] = useState<SelectOption[]>([]);
	const [secondCaseValues, setSecondCaseValues] = useState<SelectOption[]>([]);

	return (
		<div className={'flex justify-center'}>
			<StoryModule label={'Colour select'} values={firstCaseValues} onChange={setFirstCaseValues} isDropdownOpen={false} additionalText={'Disabled'} disabled={true} />
			<StoryModule label={'Colour select'} values={secondCaseValues} onChange={setSecondCaseValues} isDropdownOpen={false} additionalText={'Disabled'} />
		</div>
	);
};