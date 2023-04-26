const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const directory = "./data";
const base_url = process.env.BASE_URL;
const access_token = process.env.ACCESS_TOKEN;
const phone_number_id = process.env.PHONE_NUMBER_ID;
const version = process.env.VERSION;
const file_link_path = "https://www.africau.edu/images/default/sample.pdf";
const url = `${base_url}/${version}/${phone_number_id}/messages`;
const customHeaders = {
	"Content-Type": "application/json",
	Authorization: "Bearer " + access_token,
};

const requestData = {
	messaging_product: "whatsapp",
	recipient_type: "individual",
	type: "document",
	to: "787025496788",
	document: {
		link: "https://www.africau.edu/images/default/sample.pdf",
		filename: "hello.pdf",
		caption: "Caption text...",
	},
};

const sendNotification = async (payload) => {
	let response = await axios
		.post(url, payload, {
			headers: customHeaders,
		})
		.then(({ data }) => {
			console.log(data);
		})
		.catch((error) => {
			console.error(error);
		});

	console.log("response", response);
};

sendNotification(requestData);

fs.readdir(directory, (err, files) => {
	files.forEach((file) => {
		// get the details of the file
		let fileDetails = fs.lstatSync(path.resolve(directory, file));
		// check if the file is directory
		if (fileDetails.isDirectory()) {
			// console.log("Directory: " + file);
		} else {
			console.log("File: " + file);
			const parts = file.split("_");
			const telephoneNumber = parts[2];

			console.log("telephoneNumber", telephoneNumber);
		}
	});
});
