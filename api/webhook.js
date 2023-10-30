import dotenv from "dotenv";
import telegraf from "telegraf";

dotenv.config();

const { Telegraf, Markup } = telegraf;

export const bot = new Telegraf(process.env.BOT_TOKEN);
const URL = process.env.URL;

const webAppHome = Markup.button.webApp("Choose device", URL);
const webAppLots = Markup.button.webApp("Seller app", `${URL}/seller/lots`);

bot.command("start", async (ctx) => {
	const markup = {
		inline_keyboard: [[webAppHome]],
	};

	const message = `Start`;

	bot.telegram.sendMessage(ctx.chat.id, message, {
		reply_markup: markup,
	});
});

bot.command("seller", async (ctx) => {
	const markup = {
		inline_keyboard: [
			[webAppLots],
			[
				{
					text: "Seller page",
					url: `${URL}/seller/lots`,
				},
			],
		],
	};

	const message = `Start`;

	bot.telegram.sendMessage(ctx.chat.id, message, {
		reply_markup: markup,
	});
});

export default async (request, response) => {
	try {
		const { body } = request;

		if (body.message || body.callback_query) {
			await bot.handleUpdate(body);
		}
	} catch (error) {
		console.error("Error sending message");
		console.log(error.toString());
	}

	response.send("OK");
};
