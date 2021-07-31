import RegistrationForm, { RegForm } from "../RegistrationForm";
import Image from "next/image";
import React, { Children } from "react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import ArrowRight from "../../assets/icons/ArrowRight";

export interface SlideProps {
	image: {
		path: string;
		width: number;
		height: number;
		objectPosition?: string;
	};
	heading: string;
	ctaNode?: React.ReactNode;
}
interface FadeSliderProps {
	slides: SlideProps[];
}

function usePrevious<V>(value: V): V {
	const ref = React.useRef<V>();
	React.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const FadeSlider: React.FC<FadeSliderProps> = ({ children, slides }) => {
	const hasChildren = !!React.Children.count(children);
	const [activeIndex, setActiveIndex] = React.useState(0);
	const previousIndex = usePrevious(activeIndex);

	const prevSlide = () => {
		setActiveIndex(activeIndex <= 0 ? slides.length - 1 : activeIndex - 1);
	};
	const nextSlide = () => {
		setActiveIndex(activeIndex >= slides.length - 1 ? 0 : activeIndex + 1);
	};

	const slideListRef = React.useRef<HTMLUListElement>(null);

	React.useEffect(() => {
		const ul = slideListRef.current;
		if (!ul) return;

		const fromChild = ul.children[previousIndex];
		const toChild = ul.children[activeIndex];
		if (!fromChild || !toChild) return;

		ul.style.height = fromChild.clientHeight + "px";

		const heightTimerStart = setTimeout(() => {
			ul.style.height = toChild.clientHeight + "px";
		}, 5);

		const heightTimerAuto = setTimeout(() => {
			ul.style.height = "";
		}, 1000);

		return () => {
			clearTimeout(heightTimerStart);
			clearTimeout(heightTimerAuto);
		};
	}, [activeIndex, slideListRef]);

	React.useEffect(() => {
		const timerAutoplay = setTimeout(() => nextSlide(), 5000);

		return () => {
			clearTimeout(timerAutoplay);
		};
	}, [activeIndex]);

	return (
		<>
			<style jsx>{`
				.outer {
					--sidebar-width: calc((520 / (520 + 729)) * 100%);
					--sidebar-gap: 1.5rem;
					position: relative;
				}

				.slider {
					position: relative;
				}

				.slides {
					position: relative;
					overflow: hidden;
					transition: height 0.5s ease 0s;
				}

				.slide {
					background: var(--color-grey-mid);
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					opacity: 0;
					visibility: hidden;
					transition: opacity 0.5s linear 0s, visibility 0s linear 0.5s;
				}

				.slide.active {
					position: relative;
					z-index: 1;
					opacity: 1;
					visibility: visible;
					transition: opacity 0.5s linear 0s, visibility 0s linear 0s;
				}

				.slide > .contain {
					position: relative;
				}

				.slide .inner {
					min-height: 600px;
					padding-top: 4rem;
					padding-bottom: 8rem;
				}

				h2 {
					margin: 0;
					text-transform: uppercase;
					color: var(--color-white);
					font-weight: 900;
					font-size: max(calc(36 / 16 * 1rem), 7vw);
					line-height: 1.2;
					text-shadow: calc(2em / 60) calc(2em / 60) calc(4em / 60) #00000088;
				}

				.controls {
					position: absolute;
					z-index: 1;
					bottom: 2.5rem;
					width: calc(100% - var(--sidebar-width) - var(--sidebar-gap));
				}
				.controls .inner {
					display: flex;
					margin: -0.5rem 0 0 -0.5rem;
				}
				.controls .inner > li {
					margin: 0.5rem 0 0 0.5rem;
				}
				.controls button {
					cursor: pointer;
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 1.25rem;
					border: 0;
					padding: 0.5rem;
					margin: 0;
					background: var(--color-green);
					color: var(--color-blackish);
					transition: background-color 0.2s linear, color 0.2s linear;
					display: flex;
					justify-content: center;
					align-items: center;

					box-shadow: 0 calc(2rem / 16) calc(4rem / 16) #00000060;
				}
				.controls button:hover,
				.controls button:focus {
					background: var(--color-grey-darker);
					color: var(--color-white);
				}

				.sidebar .inner {
					margin: 2rem 0;
				}

				@media (min-width: 768px) {
					.outer.outer1.has-sidebar > ul .inner {
						padding-right: calc(var(--sidebar-gap) + var(--sidebar-width));
					}

					.slide .inner {
						width: calc(100% - var(--sidebar-width) - var(--sidebar-gap));
						padding-top: 8rem;
						padding-bottom: 18rem;
					}

					h2 {
						font-size: min(5.75vw, calc(76 / 16 * 1rem));
					}

					.sidebar {
						position: absolute;
						width: 100%;
						top: 0;
						z-index: 1;

						/* feel nervous using this but it's either this or height: 0 (see below): */
						pointer-events: none;
					}
					/*
					.sidebar,
					.sidebar .contain {
						height: 0;
					}
					*/

					.sidebar .inner {
						pointer-events: all;

						width: var(--sidebar-width);
						margin: 8rem 0 2rem auto;

						background: var(--color-white);
						padding: calc(40 / 16 * 1rem);
						border-radius: calc(4 / 16 * 1rem);

						box-shadow: 0 calc(2rem / 16) calc(4rem / 16) #00000060;
					}

					.controls {
						bottom: 4rem;
					}
				}
			`}</style>

			<div className={`outer ${hasChildren ? "has-sidebar" : ""}`}>
				<div className="slider">
					<ul className="slides unlist" ref={slideListRef}>
						{slides.map((slide, i) => (
							<li
								key={slide.image.path}
								className={`slide ${activeIndex === i ? "active" : ""}`}
							>
								<Image
									layout="fill"
									src={slide.image.path}
									objectFit="cover"
									objectPosition={slide.image.objectPosition}
								/>

								<div className="contain">
									<div className="inner">
										<h2>{slide.heading}</h2>

										{slide.ctaNode}
									</div>
								</div>
							</li>
						))}
					</ul>

					<div className="controls contain">
						<ul className="unlist inner">
							<li>
								<button
									type="button"
									title="Previous"
									onClick={() => prevSlide()}
								>
									<ArrowLeft />
								</button>
							</li>
							<li>
								<button type="button" title="Next" onClick={() => nextSlide()}>
									<ArrowRight />
								</button>
							</li>
						</ul>
					</div>
				</div>

				{hasChildren && (
					<div className="sidebar">
						<div className="contain">
							<div className="inner">{children}</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FadeSlider;
