import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import useStyles from './style';
import useAuth from '../../hooks/useAuth';
import ModalEditar from '../../components/Modal/ModalEditar';

export default function CardPokemon (props) {
    const classes = useStyles();
    const { token } = useAuth();

    async function deletarPokemon (id) {
      try{ 
        const resposta = await fetch(`http://localhost:8000/pokemons/${id}`, {
          method: 'DELETE',
          headers: {
            'authorization': `${token}`,
          }
        })

        const dados = await resposta.json();
        console.log(dados);
        props.pegarListaDePokemons();

      }catch(error) {
        console.log(error.message);
      }
    }

    return (
        <Card className={classes.card} >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.imagem}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.titulo}>
              <Typography gutterBottom variant="h6" component="h2">
                {props.nome} {props.apelido ? `(${props.apelido})` : ''}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                Habilidades:
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                {props.habilidades}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.botoes}>
            <ModalEditar title="Editar" id={props.id} pegarListaDePokemons={props.pegarListaDePokemons}/>
            <Button size="small" color="secondary" onClick={() => deletarPokemon(props.id)}>
              excluir
            </Button>
          </CardActions>
        </Card>
    )
}