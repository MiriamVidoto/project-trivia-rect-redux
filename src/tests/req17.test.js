// import { screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import React from 'react';
// import App from "../App";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import mockTriviaResults from './mocks/mockTriviaResults';
import mockToken from './mocks/mockToken';
beforeEach(() => {
    
});
window.fetch = jest
    .fn(() => 'default')
    .mockImplementationOnce( async () => ({
        json: async () => mockToken,
      }))
    .mockImplementationOnce(async () => ({
        json: async () => mockTriviaResults,
      }));
    
describe('', () => {
    it('', () => {
        renderWithRouterAndRedux(Feedback);
    })
});