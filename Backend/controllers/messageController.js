const Chat = require("../Models/chatsModels");
const Message = require("../Models/messageModel");
const User = require("../Models/usersModel");
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400);
  }
  let newMessage = {
    sender: req.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    //now i am populate all the required field here....
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    //here we getting the latest message...
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestmessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { sendMessage, allMessage };
