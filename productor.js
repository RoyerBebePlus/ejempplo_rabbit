
const amqp = require("amqplib");

async function enviarPedido() {
  const conexion = await amqp.connect(
    "amqp://localhost"
  );

  const canal = await conexion.createChannel();
  const cola = "pedidos";

  await canal.assertQueue(cola, {
    durable: true
  });

  const pedido = {
    id: 1,
    producto: "Laptop",
    cantidad: 2
  };

  canal.sendToQueue(
    cola,
    Buffer.from(JSON.stringify(pedido)),
    { persistent: true }
  );

  console.log("Pedido enviado:", pedido);

  await canal.close();
  await conexion.close();
}

enviarPedido().catch(console.error);
