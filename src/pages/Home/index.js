import React, { useState } from 'react';
import axios from 'axios';
import { HomeContainer, Content, Input, Button, ErrorMsg } from './styled';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }
  return (
    <HomeContainer>
      <Content>
        <Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <Button type="button" onClick={handlePesquisa}>Pesquisar</Button>
      </Content>
      {erro ? <ErrorMsg>Ocorreu um erro. Tente novamente.</ErrorMsg> : ''}
    </HomeContainer>
  );
}

export default App;
