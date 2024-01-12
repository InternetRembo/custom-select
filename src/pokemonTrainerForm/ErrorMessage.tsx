import React from "react";

type ErrorMessageProps = {
	error: string | undefined;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
	if (error) {
		return (
			<span className="text-md font-medium text-red-500 ml-2">{error}</span>
		);
	} else {
		return null;
	}
};