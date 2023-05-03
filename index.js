const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const directory = "./data";

const base_url = process.env.BASE_URL;
const access_token = process.env.ACCESS_TOKEN;
const phone_number_id = process.env.PHONE_NUMBER_ID;
const version = process.env.VERSION;

const url = `${base_url}/${version}/${phone_number_id}/messages`;
const customHeaders = {
	"Content-Type": "application/json",
	Authorization: "Bearer " + access_token,
};

// const file_link_path = "https://www.africau.edu/images/default/sample.pdf";

const sendNotification = async (tel, fileName) => {
	let requestData = {
		messaging_product: "whatsapp",
		recipient_type: "individual",
		to: tel,
		type: "template",
		template: {
			name: "loan_notification",
			language: {
				code: "ru",
			},
			components: [
				{
					type: "button",
					sub_type: "url",
					index: "0",
					parameters: [
						{
							type: "text",
							text: fileName,
						},
					],
				},
			],
		},
	};

	await axios
		.post(url, requestData, {
			headers: customHeaders,
		})
		.then(({ data, status }) => {
			console.log("SUCCESS: ", status, data);
			return data;
		})
		.catch((error) => {
			console.error(
				"ERROR: ",
				error.response.status,
				error.response.statusText
			);
		});
};

fs.readdir(directory, (err, files) => {
	files.forEach((file) => {
		let fileDetails = fs.lstatSync(path.resolve(directory, file));
		// check if the file is directory
		if (fileDetails.isDirectory()) {
			// console.log("Directory: " + file);
		} else {
			console.log("File: " + file);
			const parts = file.split("_");
			const telephoneNumber = parts[2];
			let tel = `7${telephoneNumber}`;
			sendNotification(tel, file);
		}
	});
});
