export const fetchToken = async () => {
  const fetchApi = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(fetchApi);
  const result = await data.json();
  return result.token;
};

export const fetchTrivia = async (token) => {
  const trivia = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const dataTrivia = await fetch(trivia);
  const resultTrivia = await dataTrivia.json();
  return resultTrivia.results;
};
//teste