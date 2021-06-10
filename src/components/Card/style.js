import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  media: {
    height: 250,
  },
  card: {
    textAlign: 'center',
    maxWidth: 345,
  },
  botoes: {
      display: 'flex',
      justifyContent: 'space-between',
  },
  titulo: {
      width: 180,
  }
}));

export default useStyles;