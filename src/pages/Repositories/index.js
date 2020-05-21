import React, { useEffect, useState } from 'react';
import { Container, Title, List, ListItem, LinkHome } from './styled';
import { useHistory } from 'react-router-dom';

function Repositories() {
  const history = useHistory();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    let repositoriesName = localStorage.getItem('repositoriesName');
    if (repositoriesName !== null) {
      repositoriesName = JSON.parse(repositoriesName);
      setRepositories(repositoriesName);
      localStorage.clear();
    } else {
      history.push('/')
    }
  }, [history]);
  return (
    <Container>
      <Title>Repositórios</Title>
      <List>
        {repositories.map(repository => {
          return (
            <ListItem>Repositório: {repository}</ListItem>
          );
        })}
      </List>
      <LinkHome to="/">Voltar</LinkHome>
    </Container>
  );
}

export default Repositories;