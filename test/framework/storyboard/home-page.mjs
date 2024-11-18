export default {
  // Name of the page
  name: "home",

  // Title of the page
  title: "Home",

  // Page type
  //  custom, custom page
  type: "custom",

  // If custom type, a page detail is provided
  definition: {
    class: "flex flex-center",
    component: "home-page",
  },

  // Layout used by the page (if empty it uses the default one)
  // layout: "secondary",
};
