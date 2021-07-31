import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { GlobalsObj } from "../../lib/api/cms";

interface DefaultLayoutProps {
	globals: GlobalsObj;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ globals, children }) => {
	return (
		<>
			<Head>
				<title>App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header {...{ globals }} />

			<main>{children}</main>

			<Footer {...{ globals }} />
		</>
	);
};

export default DefaultLayout;
