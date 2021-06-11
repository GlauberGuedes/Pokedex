import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeContent: 'center',
    minHeight: '100vh',
    gap: 15
  },
  carregar: {
    display: 'block',
    margin: '0 auto 0 auto',
  },
}));

export default useStyles;
