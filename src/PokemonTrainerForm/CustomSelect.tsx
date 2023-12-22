import React, {useEffect, useRef, useState} from 'react';
import {XMarkIcon, ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid'

export type SelectOption = {
	label: string;
	value: string | number;
};

type SelectProps = {
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
	options: SelectOption[];
	label:string
};

export function CustomSelect({value, onChange, options , label}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const inputRef = useRef<HTMLInputElement | null>(null);
	const badgeBlockRef = useRef<HTMLDivElement | null>(null);

	useEffect(()=>{
		if (value?.length === 4){
			setIsOpen(false)
		}
	} , [value])

	function clearOptions() {
		onChange([]);
	}

	const handleWheel = (e:React.WheelEvent<HTMLDivElement>) => {
		const direction = e.deltaY > 0 ? 1 : -1;
		const scrollAmount = 20;
		if(badgeBlockRef.current){
			badgeBlockRef.current.scrollLeft += direction * scrollAmount;
		}
	};

	function selectOption(option: SelectOption) {
		if (value && Array.isArray(value)) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option));
			} else {
				onChange([...value, option]);
			}
		} else {
			onChange([option]);
		}
	}

	return (
		<div
			onBlur={() => {
				setIsOpen(false)
			}}
			onClick={() => {
			    setIsOpen(!isOpen)
			}}

			tabIndex={0}

			className={`box-border cursor-text flex w-[400px] h-[40px]  rounded-md px-3  flex items-center
			 ${isOpen ? 'outline outline-1 outline-gray-800 border border-gray-800' : 'border border-gray-500'}  relative`}
		>
			<div ref={badgeBlockRef} onWheel={handleWheel}
				className={'flex gap-2 flex-nowrap w-full justify-start  w-[90%] mr-4 overflow-x-hidden'}>
				{value?.map((v) => (
					<div
						key={v.value}
						className={'text-[10px] max-w-[90px] flex items-center bg-orange-300 text-orange-700 font-semibold rounded-lg p-1 gap-1 bg-none outline-none'}
					>
						{v.label}
						<span className={'text-xl text-gray-700'}>
							<XMarkIcon className={'h-[14px] cursor-pointer'}
									   onClick={(e) => {
										   e.stopPropagation();
										   selectOption(v);
									   }}/>
						</span>
					</div>
				))}
				<input ref={inputRef}
					   value={inputValue}
					   onChange={(e) => setInputValue(e.target.value)}
					   autoFocus={isOpen}
					   placeholder={value?.length > 0 ? '' : label}
					   className={`w-full  border-0 outline-none box-border mr-2
						${value?.length === 4 ? 'hidden' : 'block'} `}/>
			</div>

			<div className={'w-[30px] h-[38px] '}>
				{isOpen
					? <ChevronUpIcon className={'w-6 h-5  inline-block absolute right-1 top-[10px] cursor-pointer '}/>
					: <ChevronDownIcon className={'w-6 h-5 inline-block absolute right-1 top-[10px] cursor-pointer'}/>
				}
			</div>


			<XMarkIcon onClick={(e) => {
				e.stopPropagation();
				clearOptions();
				setInputValue('')
			}}
					   className={`w-6 h-5 inline-block absolute right-7 top-[10px] cursor-pointer 
					    ${value && value.length > 0 || inputValue ? 'block' : 'hidden'}`}/>

			{
				isOpen &&
                <ul onMouseDown={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
                    onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
					}}
					className={`absolute m-0 p-0 list-none max-h-60 overflow-y-auto border border-solid bg-white w-full left-0 top-full mt-1  z-50`}>
					{options
						.filter((option) => !value || !value?.some((v) => v.value === option.value))
						.map((option, index) => (
							<li
								onMouseDown={(e) => {
									if (e.button === 0) {
										e.preventDefault();
										selectOption(option);
									}
								}}
								key={option.value}
								className={`p-2 bg-white mb-1 list-none max-h-60 overflow-y-auto border cursor-pointer w-full hover:bg-gray-100`}
							>
								{option.label}
							</li>
						))}
                </ul>
			}
		</div>
	);
}