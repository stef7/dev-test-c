import React from "react";
import { useUIDSeed } from "react-uid";
import useLocalStorage from "../../lib/hooks/useLocalStorage";

export interface RegForm {
	heading: string;
	tickboxes?: (
		| string
		| {
				label: string;
				slug: string;
		  }
	)[];
}
interface RegFormProps extends RegForm {
	onSubmit?: (submitEvent: React.FormEvent<HTMLFormElement>) => void;
}

const RegistrationForm: React.FC<RegFormProps> = ({
	heading,
	tickboxes,
	onSubmit,
}) => {
	const [loading, setLoading] = React.useState(false);
	const [response, setResponse] =
		React.useState<undefined | Record<string, any> | Error>();

	const [firstName, setFirstName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phoneNum, setPhoneNum] = React.useState("");
	const [whenLooking, setWhenLooking] = React.useState("");
	const [services, setServices] = useLocalStorage(
		"services",
		[] as typeof tickboxes
	);

	const resetForm = () => {
		setFirstName("");
		setEmail("");
		setPhoneNum("");
		setWhenLooking("");
		setServices([]);
	};

	const required = (
		<>
			{" "}
			<span className="required">(required)</span>
		</>
	);
	const requiredStr = " (required)";
	const seed = useUIDSeed();

	const fieldLabelAttrs = (name: string, required?: boolean) => {
		const str = `${name}${required ? requiredStr : ""}`;
		return {
			title: str,
			placeholder: str,
		};
	};

	const formRef = React.useRef<HTMLFormElement>(null);
	const setServicesValidity = () => {
		if (!formRef.current) return;

		const serviceBoxes = Array.from(
			formRef.current.querySelectorAll(
				'input[type="checkbox"][name="services"]'
			)
		) as HTMLInputElement[];

		serviceBoxes[serviceBoxes.length - 1].setCustomValidity(
			services.length < 2 || services.length > 5
				? "Please select between 2 and 5 services."
				: ""
		);
	};
	React.useEffect(() => {
		setServicesValidity();
	}, [services]);
	React.useEffect(() => {
		setServicesValidity();
	});

	return (
		<>
			<style jsx>{`
				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				.form-container {
					position: relative;
				}
				.form-container.loading > * {
					opacity: 0.3;
					pointer-events: none;
				}
				.form-container.loading::after {
					content: "";
					position: absolute;
					top: 50%;
					left: 50%;
					font-size: calc(80em / 16);
					margin: -0.5em -0.5em 0;
					width: 1em;
					height: 0.5em;
					border: 0.2em solid currentColor;
					border-bottom: 0;
					border-top-left-radius: 0.5em;
					border-top-right-radius: 0.5em;
					animation: spin 1s infinite linear;
					transform-origin: bottom;
				}

				h3 {
					font-family: var(--font-slab);
					font-weight: 700;
					margin: 0 0 1.5rem;
					font-size: calc(24rem / 16);
				}

				.field {
					margin: calc(8rem / 16) 0;
				}

				.field--texty input,
				.field--texty select {
					display: block;
					width: 100%;
					background: var(--color-grey-inputbg);
					border: calc(1rem / 16) solid var(--color-blackish);
					border-radius: calc(4rem / 16);
					padding: 0.75rem;
				}
				.field--texty select {
					appearance: none;
					background: var(--color-grey-inputbg)
						url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23666' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E")
						calc(100% - 0.5rem) center no-repeat;
					background-size: 1rem;
				}
				.field--texty input::placeholder,
				.field--texty select.value-as-placeholder {
					color: var(--color-grey-middark);
				}

				.field--choosy h4 {
					margin: 0.75rem 0 calc(6rem / 16);
				}
				.field--choosy ul {
					margin: 0 0 0 calc(-12rem / 16);
					display: flex;
					flex-wrap: wrap;
				}
				.field--choosy li {
					min-width: calc(50% - (12rem / 16));
					margin: 0 0 0 calc(12rem / 16);
					display: flex;
				}
				.field--choosy input {
					cursor: pointer;
					margin: 0 0 calc(8rem / 16) 0;
					width: 1.5rem;
					height: 1.5rem;
					flex-shrink: 0;
					align-self: flex-start;
				}
				.field--choosy label {
					cursor: pointer;
					font-size: calc(14rem / 16);
					padding: 0 0 calc(8rem / 16) 0.5rem;
					display: flex;
					align-items: center;
				}

				button {
					border: 0;
					padding: 0.7rem 0.9rem;
					margin: 0;
					cursor: pointer;
					border-radius: 0.25rem;
					font-weight: 600;
					text-transform: uppercase;
					text-align: center;
					color: var(--color-blackish);
					background: var(--color-grey-mid);
				}
				button[type="submit"] {
					color: var(--color-grey-darker);
					background: var(--color-green);
				}
				button[type="reset"] {
					color: var(--color-white);
					background: var(--color-blue);
				}

				.buttons {
					display: flex;
					margin-left: -0.5rem;
					margin-top: 1rem;
				}
				.buttons > li {
					flex-grow: 1;
					display: flex;
					margin-left: 0.5rem;
					margin-top: 0.5rem;
				}
				.buttons button {
					flex-grow: 1;
				}
			`}</style>

			<div className={`form-container ${loading ? "loading" : ""}`}>
				{response ? (
					<div className="response-indicator">
						{response instanceof Error ? (
							<>
								<p>
									Sorry, there was an error submitting your registration. Please
									call us for assistance.
								</p>
								<p>
									<button
										type="button"
										onClick={() => {
											setResponse(undefined);
										}}
									>
										Go back
									</button>
								</p>
							</>
						) : (
							<>
								<p>
									Thank you for registering! A team member will be in touch
									soon.
								</p>
								<p>
									<button
										type="button"
										onClick={() => {
											resetForm();
											setResponse(undefined);
										}}
									>
										OK
									</button>{" "}
									<button
										type="button"
										onClick={() => {
											setResponse(undefined);
										}}
									>
										OK (without reset)
									</button>
								</p>
							</>
						)}
					</div>
				) : (
					<form
						id="register-form"
						ref={formRef}
						onSubmit={async (submitEvent) => {
							submitEvent.preventDefault();
							setLoading(true);

							await new Promise((resolve) => setTimeout(resolve, 1500));

							const res = await fetch("/api/register", {
								method: "POST",
								cache: "no-cache",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									firstName,
									email,
									phoneNum,
									whenLooking,
									services,
								}),
							});

							if (res.status >= 500 && res.status < 600) {
								setLoading(false);
								setResponse(new Error(res.statusText));
								return;
							}

							const json = await res.json();
							setLoading(false);
							setResponse(json);
						}}
					>
						<h3>{heading}</h3>

						<ul className="unlist">
							<li className="field field--texty">
								<label htmlFor={seed("first-name")} className="sr-only">
									First name {required}
								</label>

								<input
									{...fieldLabelAttrs("First name", true)}
									id={seed("first-name")}
									name="first-name"
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</li>

							<li className="field field--texty">
								<label htmlFor={seed("email")} className="sr-only">
									Email address {required}
								</label>

								<input
									{...fieldLabelAttrs("Email address", true)}
									id={seed("email")}
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</li>

							<li className="field field--texty">
								<label htmlFor={seed("phone")} className="sr-only">
									Phone number {required}
								</label>

								<input
									{...fieldLabelAttrs("Phone number", true)}
									id={seed("phone")}
									name="phone"
									type="tel"
									value={phoneNum}
									onChange={(e) => setPhoneNum(e.target.value)}
									required
								/>
							</li>

							<li className="field field--texty">
								<label htmlFor={seed("when-looking")} className="sr-only">
									When are you looking to buy?
								</label>

								<select
									{...fieldLabelAttrs("When are you looking to buy?")}
									id={seed("when-looking")}
									name="when-looking"
									value={whenLooking}
									onChange={(e) => setWhenLooking(e.target.value)}
									className={`${!whenLooking ? "value-as-placeholder" : ""}`}
								>
									<option value="">When are you looking to buy?</option>
									{[
										"In the next 6 months",
										"In the next 12 months",
										"In the next 24 months",
									].map((opt) => (
										<option key={seed(opt)} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</li>

							<li className="field field--choosy">
								<h4>Services (please select between 2 and 5):</h4>

								<ul className="unlist checkboxes">
									{tickboxes?.map((opt) => {
										const label = typeof opt === "string" ? opt : opt.label;

										const slug =
											typeof opt === "string"
												? opt
														.replace(/\s+/g, "-")
														.replace(/[^a-z0-9-_]/gi, "")
														.toLowerCase()
												: opt.slug;

										const id = seed(slug);

										return (
											<li key={seed(opt)}>
												<input
													type="checkbox"
													name="services"
													id={id}
													value={slug}
													checked={services.includes(slug)}
													onChange={(e) => {
														const serviceSet = new Set(services);
														e.target.checked
															? serviceSet.add(slug)
															: serviceSet.delete(slug);
														setServices(Array.from(serviceSet));
													}}
												/>

												<label htmlFor={id}>{label}</label>
											</li>
										);
									})}
								</ul>
							</li>
						</ul>

						<ul className="unlist buttons">
							<li>
								<button type="submit">Submit</button>
							</li>

							<li>
								<button
									type="reset"
									onClick={(ev) => {
										ev.preventDefault();
										resetForm();
									}}
								>
									Reset
								</button>
							</li>
						</ul>
					</form>
				)}
			</div>
		</>
	);
};

export default RegistrationForm;
