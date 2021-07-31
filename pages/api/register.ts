import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	body: NextApiRequest["body"];
};
type ErrorResult = {
	error: string;
};

export default (
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorResult>
) => {
	if (JSON.stringify(req.body).includes("trigger-error")) {
		res.status(500).json({ error: "Error triggered." });
	} else {
		res.status(200).json({ body: req.body });
	}
};
