import { screen } from '@testing-library/react'
import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event'

describe('testa o funcionamento da página Ranking', () => {
  test('testa se a página exibe todos os elementos', () => {

    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/Feedback')

    const buttonRanking = screen.getByTestId('btn-ranking')
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonRanking)


    const playerName = screen.getByTestId('player-name-0');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('player-score-0');
    expect(playerScore).toBeInTheDocument();

  });
  test('testa retorno para pagina de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const button = screen.getByTestId('btn-go-home');
    userEvent.click(button);


    expect(history.location.pathname).toBe('/');
  });
});