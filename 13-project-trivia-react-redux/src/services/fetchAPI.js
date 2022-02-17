export const fetchQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await (await fetch(URL)).json();
  return response;
};

export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await (await fetch(URL)).json();
  console.log(response);
  localStorage.setItem('token', response.token);
  return response.token;
};
