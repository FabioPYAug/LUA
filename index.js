const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else  {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
    } 
}

client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`)
});

//TESTAR NO TERMINAL OS COMANDOS

async function simulateCommand(commandName, options = {}) {
    const command = client.commands.get(commandName);

    if (!command) {
        console.error(`Comando "${commandName}" não encontrado.`);
        return;
    }
    const mockInteraction = {
        commandName: commandName,
        options: {
            get: (name) => options[name], 
        },
        reply: (message) => console.log(`Bot responde: ${message}`), 
        user: { id: '1234567890', username: 'TerminalUser' },
    };

    try {
        await command.execute(mockInteraction);
    } catch (error) {
        console.error(`Erro ao executar o comando: ${error}`);
    }
}




client.login(TOKEN)

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})

//AUTOCOMPLETE?
client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		// command handling
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});


//FAZER MAIS UMA VERIFICAÇÃO PARA O TESTE NO TERMINAL

if (process.argv[2] === 'test') {
    const commandName = process.argv[3];
    const args = process.argv.slice(4); 
    const options = {};
    args.forEach((arg) => {
        const [key, value] = arg.split('=');
        options[key] = value;
    });

    simulateCommand(commandName, options);
}
