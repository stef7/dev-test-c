import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import DefaultLayout from "../layouts/DefaultLayout";
import FadeSlider, { SlideProps } from "../components/FadeSlider";
import { GlobalsObj, getGlobals, getEntry } from "../lib/api/cms";
import RegistrationForm, { RegForm } from "../components/RegistrationForm";

interface PageProps {
	globals: GlobalsObj;
	entry: {
		slides: SlideProps[];
		form?: RegForm;
	};
}

export default function Home({
	globals,
	entry: { slides, form },
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<style jsx>{`
				p.response-indicator {
					margin: 1rem 0;
				}

				div.cta-each-slide {
					margin-top: 1rem;
				}
				a.cta-button {
					background: var(--color-green);
					color: var(--color-black);
					display: inline-block;
					max-width: 100%;
					font-size: calc(13rem / 16);
					letter-spacing: calc(1em / 13);
					font-weight: bold;
					text-transform: uppercase;
					padding: 1rem;
					border-radius: calc(4rem / 16);
					box-shadow: 0 calc(2rem / 16) calc(4rem / 16) #00000060;
					transition: background-color 0.2s linear, color 0.2s linear;
				}
				a.cta-button:hover {
					background: var(--color-grey-darker);
					color: var(--color-white);
				}

				@media (min-width: 768px) {
					div.cta-each-slide {
						display: none;
					}
				}
			`}</style>

			<DefaultLayout {...{ globals }}>
				<FadeSlider
					slides={slides.map((slide) => ({
						...slide,
						ctaNode: (
							<div className="cta-each-slide">
								<a
									className="cta-button"
									href="#register-form"
									onClick={(ev) => {
										const targetElem = document.getElementById(
											ev.currentTarget.hash.split("#")[1]
										);
										if (!targetElem) return;

										ev.preventDefault();

										targetElem.scrollIntoView({ behavior: "smooth" });
										window.history.pushState(
											undefined,
											document.title,
											ev.currentTarget.hash
										);
									}}
								>
									Register
								</a>
							</div>
						),
					}))}
				>
					{form && (
						<RegistrationForm
							heading={form.heading}
							tickboxes={form.tickboxes}
						/>
					)}
				</FadeSlider>
			</DefaultLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const globals = getGlobals();
	const entry = getEntry();

	return {
		props: {
			globals,
			entry,
		},
	};
};
