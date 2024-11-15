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
      items: [() => import("framework/src/components/contactButton.vue")],
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
    middle: { items: [() => import("framework/src/components/subscribeButton.vue")] },
    right: {},
    style: {
      //shadow: true,
    },
  },
};
