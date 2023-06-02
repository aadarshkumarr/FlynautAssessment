export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

//here login userId and other parameter passing for last message get profile pic of user....
export const isSameSender = (message, m, i, userId) => {
  return (
    i < message.length - 1 &&
    (message[i + 1].sender._id !== m.sender._id ||
      message[i + 1].sender._id === undefined) &&
    message[i].sender._id !== userId
  );
};

//we are checking here opposite user last message here...
export const isLastMessage = (message, i, userId) => {
  return (
    i === message.length - 1 &&
    message[message.length - 1].sender._id !== userId && //opposite user and current login user id checking here..
    message[message.length - 1].sender._id
  );
};

//here we are dividing the chat of oppsite sender into one side and another sender at ont side...
export const isSameSenderMargin = (message, m, i, userId) => {
  if (
    i < message.length - 1 &&
    message[i + 1].sender._id === m.sender._id &&
    message[i].sender._id !== userId
  )
    return;
  else if (
    (i < message.length - 1 &&
      message[i + 1].sender._id !== m.sender._id &&
      message[i].sender._id !== userId) ||
    (i === message.length - 1 && message[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

//here for same users....
export const isSameUser = (message, m, i) => {
  return i > 0 && message[i - 1].sender._id === m.sender._id;
};
