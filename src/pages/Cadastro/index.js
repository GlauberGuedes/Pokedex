import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useStyles from './style';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Cadastro() {
  const classes = useStyles();
  const [value, setValue] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleClickShowPassword = () => {
    setValue(!value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function onSubmit (data) {
    setErro('');
    setCarregando(true);
    try{
    const resposta = await fetch('http://localhost:8000/cadastrar', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });

    const dados = await resposta.json();

    console.log(dados);

    setCarregando(false);
    if(!resposta.ok) {
      setErro(dados);
      return;
    }
    history.push('/');
    }catch(error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Cadastro</Typography>
      <TextField id="standard-basic" label="nome" type="text" {...register('nome')}/>
      <TextField id="standard-basic" label="E-mail" type="email" {...register('email')}/>
      <FormControl >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            type={value ? 'text' : 'password'}
            {...register('senha')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {value? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {carregando && <CircularProgress className={classes.carregar}/>}
        <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
        <Typography variant="body2">Já é cadastrado? <Link to="/">Login</Link></Typography>
        {erro && <Alert severity="error">{erro}</Alert>}    
    </form>
  );
}