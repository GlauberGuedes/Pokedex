import { useState } from "react";
import { useLocalStorage } from 'react-use';

export default function useAuthProvider () {
    const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('Token', null);
    const [token, setToken] = useState(tokenPersistido);

    const logar = (token) => {
        setToken(token);
        setTokenPersistido(token);
    }

    const deslogar = () => {
        setToken(null);
        removeTokenPersistido();
    }

    return {
        logar,
        deslogar,
        token
    };

}