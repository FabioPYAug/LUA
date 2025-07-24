const { SlashCommandBuilder } = require("discord.js");

const senhas = {
	s1: 7,
	s2: 7731,
	s3: 6
};

let timeout = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName("medo")
		.setDescription("|||||||||||||||")
		.addIntegerOption(option =>
			option.setName("porr")
				.setDescription("Digite a primeira senha.")
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName("cal")
				.setDescription("Digite a segunda senha.")
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName("frea")
				.setDescription("Digite a terceira senha.")
				.setRequired(true)),

	async execute(interaction) {
		
		const usuario = interaction.user.id;
		const nickname = interaction.member.nickname || interaction.user.username;

		if (timeout.includes(usuario)) {
			return await interaction.reply({
				content: "Este comando está em cooldown. Tente novamente em alguns segundos.",
				ephemeral: true
			});
		}

		const senha1 = interaction.options.getInteger("porr");
		const senha2 = interaction.options.getInteger("cal");
		const senha3 = interaction.options.getInteger("frea");

		console.log("usuário: ", nickname, "tentou: ", senha1, senha2, senha3);
		const resultados = {
			s1: senha1 === senhas.s1,
			s2: senha2 === senhas.s2,
			s3: senha3 === senhas.s3
		};

		let mensagem = "";
		const todasCorretas = resultados.s1 && resultados.s2 && resultados.s3;

		if (todasCorretas) {
			mensagem = "Das três travas destravadas, um novo caminho se revela.\nPara as Terras do Conhecimento e do saber, um brilho espera.\nNo brilho que ressurge, Energia pulsa e se oculta,\nEntre tantos volumes, seu destino reluz, mas se disfarça na penumbra.\nEntre esses tantos, poucos têm o charme que a Morte ao tempo concede\nUm tom de sombras e segredo, guarda a verdade na sua clareza.\nNa dedicação escrita com Alma e Sangue,\nEstá a resposta que o Orquestrador tanto anseia.";
		} else {
			const acertos = Object.entries(resultados)
				.filter(([_, correto]) => correto)
				.map(([key]) => `A marca ${key.slice(1)} está correta.`);

			mensagem = acertos.length > 0 
				? `${acertos.join(" ")} Mas outras marcas estão incorretas. Você sente o Medo te dominando...`
				: "Todas as marcas estão incorretas. Desista e abidique ao Medo.";
		}

		await interaction.reply({
			content: mensagem,
			ephemeral: true
		});

		timeout.push(usuario);
		setTimeout(() => {
			timeout = timeout.filter(id => id !== usuario);
		}, 10000);
	}
};
