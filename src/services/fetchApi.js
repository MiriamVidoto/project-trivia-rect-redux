export const fetchToken = async () => {
  const fetchApi = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(fetchApi);
  const result = await data.json();
  return result.token;
};

// comentário

export const fetchTrivia = async (token) => {
  const trivia = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const dataTrivia = await fetch(trivia);
  const resultTrivia = await dataTrivia.json();
  return resultTrivia;
};

// export const fetchGravatar = async (email) => {
//   const gravatarApi = `https://www.gravatar.com/avatar/${email}`;
//   const response = await fetch(gravatarApi);
//   const data = await response.json();
//   return data;
// };
