import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import ModalForm from '../../components/Modal';
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from '@material-ui/core/Button';
import CardPokemon from '../../components/Card/index.js';
import useStyles from './style';



export default function Lista() {
  const classes = useStyles();
  const theme = useTheme();
  const [pokemons, setPokemons] = useState([]);
  const [open, setOpen] = useState(false);
  const { deslogar, token } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    pegarListaDePokemons();
  }, []);

  async function pegarListaDePokemons () {

    try {
      const resposta = await fetch('http://localhost:8000/pokemons', {
        headers: {
          'Authorization': `${token}`
        }
      });

      const data = await resposta.json();
      setPokemons(data);
    }catch(error) {
      console.log(error);
    }
  }
  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Pokédex
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.lista}>
            <ModalForm title="Capturar" pegarListaDePokemons={pegarListaDePokemons} />
            <Button color="secondary" onClick={deslogar}>Sair</Button>
        </List>
      </Drawer>
      <div className={classes.listaDeCard}>
        {pokemons.map(pokemon => (
          <CardPokemon pegarListaDePokemons={pegarListaDePokemons} nome={pokemon.nome} imagem={pokemon.imagem} habilidades={pokemon.habilidades} apelido={pokemon.apelido} key={pokemon.id} id={pokemon.id}/>
        ))}        
      </div>
    </>
  );
}
