export type GlobalsObj = {
	header: {
		visitCentreLabel: string;
		phoneNumber: string;
	};
};

export const getGlobals = (): GlobalsObj => ({
  header: {
    visitCentreLabel: "Ante quis nibh maximus",
    phoneNumber: "1300 100 100",
  },
});

export const getEntry = () => ({
  slides: [
    {
      image: {
        path: "/assets/burbank-streetscape.png",
        width: 1920, // these should come out of cms.
        height: 890, // these should come out of cms.
        objectPosition: "10% 80%",
      },
      heading: "Quis nibh maximus ut aliquet eros accumsan",
    },
    {
      image: {
        path: "/assets/bowser-castle.jpg",
        width: 950, // these should come out of cms.
        height: 550, // these should come out of cms.
      },
      heading: "Quisque luctus ante quis nibh maximus ut aliquet eros accumsan",
    },
  ],
  form: {
    heading: "Luctus ante quis nibh maximus ut aliquet quisque luctus",
    tickboxes: Array(9)
      .fill(1)
      .map((_v, idx) =>
        idx
          ? {
              label: `Value ${idx}`,
              slug: `value-${idx}`,
            }
          : "Trigger error example?"
      ),
  },
});
