export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSucces = (user) => ({
  type: "LOGIN_SUCCES",
  payload: user, // -> Reducer
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error, // -> Reducer
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
