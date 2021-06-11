import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


export default function ModalForm(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { token } = useAuth();


  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };


  async function onSubmit (data) {
    try {
      const pokemonEditado = {apelido:data.apelido, token}
      const respostaMinhaApi = await fetch(`http://localhost:8000/pokemons/${props.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemonEditado),
        headers: {
          "Content-type": 'application/json'
        }
      });

      const dados = await respostaMinhaApi.json();

      if(!respostaMinhaApi.ok) {
        console.log(dados)
      }

      handleClose();
      props.pegarListaDePokemons();
      reset({});

    }catch(error) {
      console.log(error.message);
    }
  }

  

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <form id="capturar" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
              <TextField
                {...register('apelido')}
                autoFocus
                margin="dense"
                label="Apelido"
                fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Editar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}