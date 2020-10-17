
module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`- Activated -`);
    client.user.setStatus("idle")
  },
};
