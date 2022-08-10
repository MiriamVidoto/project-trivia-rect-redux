import React from 'react'
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';
import { toHaveTextContent } from '@testing-library/jest-dom';

describe('testa se a página de feedback possui os elementos corretos', () => {
  test('se a página possui o nome e o score do usuário', () => {
    renderWithRouterAndRedux(<Feedback />);
    const userName = screen.getByTestId('header-player-name')
    const userScore = screen.getByTestId('header-score')

    expect(userName).toBeInTheDocument();
    expect(userScore).toBeInTheDocument();
  })
  test('se a página possui o score total', () => {
    renderWithRouterAndRedux(<Feedback />);

    const scoreTotal = screen.getByTestId('feedback-total-score')
    expect(scoreTotal).toBeInTheDocument();
  })
  test('se a página possui o total de perguntas corretas', () => {
    renderWithRouterAndRedux(<Feedback />);

    const questionTotal = screen.getByTestId('feedback-total-question')
    expect(questionTotal).toBeInTheDocument();
  })
  test('se a página possui um botão que redireciona para tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/Feedback')
    const button = screen.getByTestId('btn-play-again')
    userEvent.click(button)
    expect(history.location.pathname).toBe('/');
    
  })
  test('se a página possui um botão que redireciona para tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/Feedback')
    const rankingBtn = screen.getByTestId('btn-ranking')
    expect(rankingBtn).toBeInTheDocument();
    userEvent.click(rankingBtn)
    expect(history.location.pathname).toBe('/ranking')
  })
  test('testa msg "Could be better..."', () => {
    const { history } = renderWithRouterAndRedux(<App /> , { player: {assertions: 2 } });
    history.push('/Feedback');

    const msg = screen.getByTestId('feedback-text');
    expect(msg).toHaveTextContent('Could be better...');
  })
  test('testa msg "Well Done!"', () => {
    const { history } = renderWithRouterAndRedux(<App /> , { player: {assertions: 3 } });
    history.push('/Feedback');

    const msg = screen.getByTestId('feedback-text');
    expect(msg).toHaveTextContent('Well Done!');
  })
})