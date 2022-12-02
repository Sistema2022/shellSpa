import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication(
  "@organization/frontend-group2",
  () => System.import("@organization/frontend-group2"),
  (location) => {
    return location.pathname.startsWith("/dev2");
  }
);

registerApplication(
  "@organization/clients-view",
  () => System.import("@organization/clients-view"),
  (location) => {
    return location.pathname.startsWith("/dev3");
  }
);

registerApplication(
  "@organization/project",
  () => System.import("@organization/project"),
  (location) => {
    return location.pathname.startsWith("/dev4");
  }
);

registerApplication(
  "@organization/prueba",
  () => System.import("@organization/prueba"),
  (location) => {
    return location.pathname.startsWith("/dev5");
  }
);

applications.forEach(registerApplication);
layoutEngine.activate();
start();
