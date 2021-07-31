import React from "react";

export interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<>
			<div className="contain">{children}</div>
		</>
	);
};

export default Container;
