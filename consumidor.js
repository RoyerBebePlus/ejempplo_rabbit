
const amqp = require("amqplib");

async function procesarPedidos() {
  const conexion = await amqp.connect(
    "amqp://localhost"
  );

  const canal = await conexion.createChannel();
  const cola = "pedidos";

  await canal.assertQueue(cola, {
    durable: true
  });

  canal.prefetch(1);

  console.log("Esperando pedidos...");

  canal.consume(cola, (mensaje) => {
    if (mensaje !== null) {
      const pedido = JSON.parse(
        mensaje.content.toString()
      );

      console.log("Pedido recibido:", pedido);
      console.log("Procesando pedido...");
      console.log("Pedido procesado correctamente");

      canal.ack(mensaje);
    }
  }, { noAck: false });
}

procesarPedidos().catch(console.error);
