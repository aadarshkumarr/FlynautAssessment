const chat = require("../Models/chatsModels");
const User = require("../Models/usersModel");

//this router for single chating app...
const AccessChat = async (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    return res.status(404).send("UserId param not sent with request");
  }

  let isChat = await chat
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.id } } }, //here we matching the id of both the user login user as well as other user..
        { users: { $elemMatch: { $eq: UserId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  //here we checking the chat if there is any chat between them it will show other wise we will create new chat...
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.id, UserId],
    };
    try {
      const createdChat = await chat.create(chatData);
      const FullChat = await chat
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).send(FullChat);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    chat
      .find({ users: { $elemMatch: { $eq: req.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestmessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestmessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please Fill all the feilds" });
  }
  let users = JSON.parse(req.body.users); //here my getting the data in stringfy format from frontend so i need to convert it..
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  console.log(req.id);
  users.push(req.id);
  try {
    const groupChat = await chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.id,
    });

    const fullGroupChat = await chat
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await chat
    .findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400).send("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404).send("Chat Not Found");
  } else {
    res.json(added);
  }
};

const RemoveToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const remove = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  //console.log(remove);
  if (!remove) {
    res.status(404).send("Chat Not Found");
  } else {
    res.json(remove);
  }
};
module.exports = {
  AccessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  RemoveToGroup,
};
