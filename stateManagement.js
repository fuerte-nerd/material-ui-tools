export default {
  library: {
    isLoading: false,
    loaded: false,
    fonts: [
      /*google fonts array*/
    ],
    blacklisted: [],
  },
  history: {
    past: [],
    current: [
      {
        date: "date",
        bodyFont: "font",
        headerFont: "font",
        palette: {
          primary: "color",
          secondary: "color",
          secondaryMix: "complement",
        },
      },
    ],
    future: [],
    stage: {
      isValidating: false,
      validated: false,
      changes: [
        {
          component: "body",
          font: "name",
        },
        { component: "palette", description: "primary", color: "#ffffff" },
      ],
    },
  },
  coreComponents: {
    loading: true,
    fonts: {
      default: {
        isValidating: false,
        loaded: false,
      },
      body: {
        loaded: false,
        locked: false,
        font: {
          /*font*/
        },
      },
      header: {
        loaded: false,
        locked: false,
        font: {
          /*font*/
        },
      },
    },
    palette: {
      primary: {
        previous: [],
        current: "#FFFFFF",
        future: [],
        locked: false,
        config: {},
      },
      secondary: {
        previous: [],
        current: "#000000",
        future: [],
        locked: false,
        config: {},
      },
      config: {},
    },
  },
  settings: { fonts: {}, palette: {}, general: {} },
  dialogs: {},
};