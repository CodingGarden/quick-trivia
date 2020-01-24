const fetch = require('node-fetch');
const cheerio = require('cheerio');

const baseUrl = 'https://www.rd.com/culture/trivia-questions/page';

async function getTriviaPage(pageNum) {
  const url = `${baseUrl}/${pageNum}/`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const containers = $('.listicle-page');
  const questions = [];
  for (let i = 0; i < containers.length; i += 2) {
    const questionContainer = $(containers[i]);
    const answerContainer = $(containers[i + 1]);
    const options = [];
    const questionImage = $(questionContainer.find('img')).attr('data-original-src');
    let question = '';
    const possibleQuestion = $(questionContainer.find('p')[1]).text();
    if (!possibleQuestion.match(/^A\./g)) {
      question = possibleQuestion;
    }
    questionContainer.find('p').each((_, element) => {
      const text = $(element).text().trim();
      const matching = /^[A-D]\.\s(.*)/g.exec(text);
      if (matching) {
        options.push(matching[1]);
      }
    });
    let answer = '';
    if (options.length) {
      answer = /^Answer: [A-D]\.\s(.*)/g.exec($(answerContainer.find('h2')[0]).text())[1].trim();
    } else {
      answer = /^Answer:\s(.*)/g.exec($(answerContainer.find('h2')[0]).text())[1].trim();
    }
    const answerDescription = $(answerContainer.find('p').slice(1)).text();
    questions.push({
      question,
      questionImage,
      options,
      answer,
      answerDescription,
    });
  }
  return questions;
}

async function getAllTriviaQuestions() {
  let questions = [];
  for (let i = 1; i < 11; i += 1) {
    console.log('Requesting page', i);
    // eslint-disable-next-line
    questions = questions.concat(await getTriviaPage(i));
  }
  return questions;
}

module.exports = {
  getAllTriviaQuestions,
};
