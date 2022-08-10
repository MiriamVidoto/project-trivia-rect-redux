import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react';
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import mockToken from "./mocks/mockToken";

describe('A página de login:', () => {

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockToken)
  })

  afterEach(() => jest.clearAllMocks());

  it('Possui inputs para nome e email e botões de play e settings', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(inputName).toBeDefined();
    expect(inputEmail).toBeDefined();
    expect(btnPlay).toBeDefined();
    expect(btnSettings).toBeDefined();
  });

  it('O botão de play só é habilitado quando os inputs estão preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
  
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, 'Nome');
    expect(btnPlay).toBeDisabled();

    // userEvent.type(inputEmail, 'teste@teste.br');
    // expect(btnPlay).toBeDisabled(true);

    // userEvent.type(inputEmail, 'testeateste.com');
    // expect(btnPlay).toBeDisabled(true);

    userEvent.type(inputEmail, 'teste@teste.com');
    expect(btnPlay).not.toBeDisabled();
  });

  it('O botão de settings leva para a página correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');

    userEvent.click(btnSettings);

    const { pathname } = history.location;
    const settingsTitle = screen.getByTestId('settings-title');

    expect(pathname).toBe('/settings');
    expect(settingsTitle).toBeDefined();
  });

  it('Ao clicar em play, é feita uma requisição para obter o token', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(btnPlay);

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
  });

  it('O botão de play redireciona para a página correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'teste@teste.com');
    await waitFor(() => userEvent.click(btnPlay));

    const { pathname } = history.location;

    expect(pathname).toBe('/game');
  });

  it('O token é salvo na localStorage', async () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Nome');
    userEvent.type(inputEmail, 'teste@teste.com');
    await waitFor(() => userEvent.click(btnPlay));

    const storageToken = localStorage.getItem('token');

    expect(storageToken).toBeDefined();
    expect(storageToken).toBe(mockToken["token"]);
  });
});
