import React from "react";
import { GlobalsObj } from "../../lib/api/cms";

interface FooterProps {
	globals: GlobalsObj;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
	return <footer>{children}</footer>;
};

export default Footer;
