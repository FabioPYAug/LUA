const { REST, Routes } = require("discord.js");

// dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ("data" in command && typeof command.data.toJSON === "function") {
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[AVISO] O comando em './commands/${file}' está mal formatado e foi ignorado.`);
    }
}

// instância REST
const rest = new REST({ version: "10" }).setToken(TOKEN);

// deploy
(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log("✅ Comandos registrados com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao registrar comandos:", error);
    }
})();
