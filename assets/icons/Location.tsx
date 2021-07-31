export default function LocationIcon({
	fillColor = "currentColor",
}: {
	fillColor?: string;
}) {
	return (
		<svg
			width="15"
			height="20"
			viewBox="0 0 15 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.08 6.1599C13.08 2.9823 10.4976 0.399902 7.32 0.399902C4.1424 0.399902 1.56 2.9823 1.56 6.1599C1.56 10.4799 7.32 16.7199 7.32 16.7199C7.32 16.7199 13.08 10.4799 13.08 6.1599ZM5.40001 6.15989C5.40001 5.10389 6.26401 4.23989 7.32001 4.23989C8.37601 4.23989 9.24001 5.10389 9.24001 6.15989C9.24001 7.21589 8.38561 8.07989 7.32001 8.07989C6.26401 8.07989 5.40001 7.21589 5.40001 6.15989ZM0.600006 17.6799V19.5999H14.04V17.6799H0.600006Z"
				fill={fillColor}
			/>
		</svg>
	);
}
