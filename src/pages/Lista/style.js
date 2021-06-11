import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    textAlign:'center'
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  lista: {
      display: 'flex',
      flexDirection: 'column',
      gap:15,
      alignItems: 'flex-end'
  },
  listaDeCard: {
    marginTop: 84,
    padding: '0 30px 0 30px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 40
  },
}));

export default useStyles;