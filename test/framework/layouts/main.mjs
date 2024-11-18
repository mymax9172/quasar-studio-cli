export default {
  header: {
    left: {
      items: [{ component: "qs-btn-home", props: { color: "red" } }],
    },
    
    middle: {
      items: [
        {
          component: "qs-navigation",
          props: {
            horizontal: true,
          },
        },
      ],
    },

    right: {
      items: ["contactButton"],
    },

    style: {
      // shadow: false,
    },
  },

  // leftPanel: {
  //   top: {},
  //   middle: {},
  //   bottom: {},
  //   style: {},
  // },

  // rightPanel: {
  //   top: {},
  //   middle: {},
  //   bottom: {},
  //   style: {},
  // },

  footer: {
    left: {},
    middle: { items: ["subscribeButton"] },
    right: {},
    style: {
      //shadow: true,
    },
  },
};
