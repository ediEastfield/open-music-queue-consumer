require('dotenv').config();
const amqp = require('amqplib');
const PlaysongsService = require('./PlaylistsongsService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const playlistsongsService = new PlaysongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsongsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistsongs', {
    durable: true,
  });

  channel.consume('export:playlistsongs', listener.listen, { noAck: true });
};

init();
