import {  fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

const questions = {
  response_code: 0,

  results: [
    {
      "category": "Geography",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The Republic of Malta is the smallest microstate worldwide.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "Science & Nature",
      "type": "multiple",
      "difficulty": "hard",
      "question": "In quantum physics, which of these theorised sub-atomic particles has yet to be observed?",
      "correct_answer": "Graviton",
      "incorrect_answers": [
        "Z boson",
        "Tau neutrino",
        "Gluon"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Generally, which component of a computer draws the most power?",
      "correct_answer": "Video Card",
      "incorrect_answers": [
        "Hard Drive",
        "Processor",
        "Power Supply"
      ]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What is the most expensive weapon in Counter-Strike: Global Offensive?",
      "correct_answer": "Scar-20/G3SG1",
      "incorrect_answers": [
        "M4A1",
        "AWP",
        "R8 Revolver"
      ]
    },
    {
      "category": "Entertainment: Japanese Anime & Manga",
      "type": "multiple",
      "difficulty": "hard",
      "question": "Who was the Author of the manga Uzumaki?",
      "correct_answer": "Junji Ito",
      "incorrect_answers": [
        "Noboru Takahashi",
        "Akira Toriyama",
        "Masashi Kishimoto",
      ],
    },
  ],
};

const tokenInvalidQuestions = {
response_code: 3,
results: [],
}


describe('Testa se a página de Game tem os elementos e comportamentos esperados', () => {
    it('Testa se a página possui uma imagem de Gravatar, o nome do player, um contador e um score zerado', async () => {
      renderWithRouterAndRedux(<App />)
      const nameUser = 'pedro'
      const emailUser = 'teste@teste.com'
      const btnPlay = screen.getByRole('button', { name: 'Play' });
      expect(btnPlay).toBeInTheDocument();
      const input = screen.getAllByRole('textbox');
  
      userEvent.type(input[0], nameUser);
      userEvent.type(input[1], emailUser);
      fireEvent.click(btnPlay);

      await screen.findByTestId('header-profile-picture');
      const playerName = screen.getByTestId('header-player-name');
      expect(playerName).toBeInTheDocument();
      
    })

    it('Testa se ao receber um token expirado retorna a tela de Login', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(tokenInvalidQuestions),
      });

      expect(localStorage.getItem('token')).not.toBeNull();

      const {history} = renderWithRouterAndRedux(<App />, {}, '/game');

      await waitFor(() => expect(history.location.pathname).toBe('/'));
      expect(localStorage.getItem('token')).toBeNull();

      jest.restoreAllMocks();
  })

    it('Testa se ao jogar 5 vezes o comportamento ocorre como esperado', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(questions),
        });

        jest.useFakeTimers();

        const {history} = renderWithRouterAndRedux(<App />);
        const nameUser = 'pedro'
        const emailuser = 'teste@teste.com'
        const buttonName = screen.getByRole('button', { name: 'Play' });
        const input = screen.getAllByRole('textbox');
    
        userEvent.type(input[0], nameUser);
        userEvent.type(input[1], emailuser);
        fireEvent.click(buttonName)
        
        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const category = screen.getByTestId('question-category');
          expect(category).toBeInTheDocument();
          expect(category).toHaveTextContent('Geography');
          const questions = screen.getByTestId('question-text');
          expect(questions).toBeInTheDocument();
          const answer = screen.getByTestId('answer-options');
          expect(answer).toBeInTheDocument();

          const answerCorrect = screen.getByTestId('correct-answer');

          userEvent.click(answerCorrect);
          const nextButton = screen.getByTestId('btn-next');
          expect(nextButton).toBeInTheDocument();
          userEvent.click(nextButton);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const category = screen.getByTestId('question-category');
          expect(category).toBeInTheDocument();
          expect(category).toHaveTextContent('Science & Nature');
          const question = screen.getByTestId('question-text');
          expect(question).toBeInTheDocument();
          const answer = screen.getByTestId('answer-options');
          expect(answer).toBeInTheDocument();

          const answerCorrect = screen.getByTestId('correct-answer');

          userEvent.click(answerCorrect);
          const nextButton = screen.getByTestId('btn-next');
          expect(nextButton).toBeInTheDocument();
          userEvent.click(nextButton);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const category = screen.getByTestId('question-category');
          expect(category).toHaveTextContent('Science: Computers');

          const answer = screen.getByTestId('correct-answer');

          userEvent.click(answer);
          const nextButton = screen.getByTestId('btn-next');
          expect(nextButton).toBeInTheDocument();
          userEvent.click(nextButton);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const category = screen.getByTestId('question-category');
          expect(category).toHaveTextContent('Entertainment: Video Games');

          const answerWrong = screen.getByTestId('wrong-answer-0');

          userEvent.click(answerWrong);
          const nextButton = screen.getByTestId('btn-next');
          expect(nextButton).toBeInTheDocument();
          userEvent.click(nextButton);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const category = screen.getByTestId('question-category');
          expect(category).toHaveTextContent('Entertainment: Japanese Anime & Manga');

          const answerWrong = screen.getByTestId('wrong-answer-0');

          userEvent.click(answerWrong);
          const nextButton = screen.getByTestId('btn-next');
          expect(nextButton).toBeInTheDocument();
          userEvent.click(nextButton);

          const { pathname } = history.location;
          expect(pathname).toBe('/feedback');
        });
        })
        it('testa se botao esta disabilitado depois de 30 secs', async () => {
          renderWithRouterAndRedux(<App />)
          const nameUser = 'pedro'
          const emailUser = 'teste@teste.com'
          const btnPlay = screen.getByRole('button', { name: 'Play' });
          expect(btnPlay).toBeInTheDocument();
          const input = screen.getAllByRole('textbox');
      
          userEvent.type(input[0], nameUser);
          userEvent.type(input[1], emailUser);
          fireEvent.click(btnPlay);
    
          await waitFor(() => {
            jest.advanceTimersByTime(30000);

            const answer = screen.getByTestId('correct-answer');
            expect(answer).toBeDisabled();
  
          });

      jest.restoreAllMocks();
    })
})