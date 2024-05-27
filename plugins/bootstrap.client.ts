import * as bootstrap from "bootstrap";
const { Dropdown, Collapse } = bootstrap;

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      bootstrap: {
        dropdown: (element: string | Element) => new Dropdown(element),
        collapse: (element: string | Element) => new Collapse(element),
      },
    },
  };
});
