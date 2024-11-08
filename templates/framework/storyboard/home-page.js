export default {
  // Name of the page
  name: "HomePage",

  // Page type
  //  custom, custom page
  type: "custom",

  // If custom type, a page detail is provided
  page: {
    class: "flex flex-center",
    component: () => import("framework/src/pages/home-page.vue"),
  },

  // Layout used by the page (if empty it uses the default one)
  // layout: "secondary",
};
