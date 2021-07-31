export default function ArrowRight({
	fillColor = "currentColor",
}: {
	fillColor?: string;
}) {
	return (
		<svg
			width="20"
			height="12"
			viewBox="0 0 20 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.2945 0.292893C12.904 0.683417 12.904 1.31658 13.2945 1.70711L16.5863 5H1C0.447716 5 0 5.44772 0 6C0 6.51284 0.38604 6.93551 0.883379 6.99327L1 7H16.5868L13.2937 10.292C12.9032 10.6826 12.9032 11.3157 13.2937 11.7063C13.6842 12.0968 14.3174 12.0968 14.7079 11.7063L19.7078 6.70798C20.0984 6.31753 20.0985 5.68437 19.708 5.29377L19.7013 5.28711L14.7087 0.292893C14.3182 -0.0976311 13.685 -0.0976311 13.2945 0.292893Z"
				fill={fillColor}
			/>
		</svg>
	);
}
