import { LoaderOverlay, LoaderContainer } from "./loader.styles.jsx";

const Loader = ({ isComponent }) => (
  <LoaderOverlay>
    <LoaderContainer />
  </LoaderOverlay>
);

export default Loader;
