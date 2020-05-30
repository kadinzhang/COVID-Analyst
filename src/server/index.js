const express = require('express');
const os = require('os');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.static('dist'));

app.get('/', function(req, res) {
	res.render('index', {});
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getNews/:location', async (req, res) => {
	const preparePageForTests = async page => {
		// Pass the User-Agent Test.
		const userAgent =
			'Mozilla/5.0 (X11; Linux x86_64)' +
			'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
		await page.setUserAgent(userAgent);
	};

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await preparePageForTests(page);

	let url = 'https://www.newsobserver.com/news/local/counties/wake-county/';
	await page.goto(url, { waitUntil: 'networkidle2' });

	let data = await page.evaluate(() => {
		var headlineList = document.querySelectorAll('div.digest > div.paper > div.package > h3');
		var headlines = [];

		// var random = document.querySelector('div.digest > div.paper > div.package > h3 > a').innerText;

		headlineList.forEach(e => {
			headlines.push(e.innerText);
		});
		return headlines;
	});

	await browser.close();

	// console.log(data);

	res.send({ news: data });
});

// app.get('/api/getNews/:location', function(req, res) {
//   (async () => {
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();
// 		let url = 'https://www.newsobserver.com/news/local/counties/wake-county/';
// 		await page.goto(url, { waitUntil: 'networkidle2' });

// 		let data = await page.evaluate(() => {
// 			var headlineList = document.querySelectorAll('div.digest > div.paper > div.package > h3');
// 			var headlines = [];

// 			var random = document.querySelector('div.digest > div.paper > div.package > h3').innerText;

// 			headlineList.forEach(e => {
// 				// headlines.push(header.innerText);
// 				console.log(e);
// 			});
// 			return random;
// 		});

// 		await browser.close();

// 		// console.log(data);

// 		res.send({ news: data });
//   })();
// });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
