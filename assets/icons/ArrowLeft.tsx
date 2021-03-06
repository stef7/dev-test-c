export default function ArrowLeft({
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
				d="M6.70552 0.292893C7.09604 0.683417 7.09604 1.31658 6.70552 1.70711L3.41367 5H19C19.5523 5 20 5.44772 20 6C20 6.51284 19.614 6.93551 19.1166 6.99327L19 7H3.41323L6.70631 10.292C7.09684 10.6826 7.09684 11.3157 6.70631 11.7063C6.31579 12.0968 5.68262 12.0968 5.2921 11.7063L0.29224 6.70798C-0.0983616 6.31753 -0.0984875 5.68437 0.291959 5.29377L0.298679 5.28711L5.29131 0.292893C5.68183 -0.0976311 6.315 -0.0976311 6.70552 0.292893Z"
				fill={fillColor}
			/>
		</svg>
	);
}
