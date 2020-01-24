# Quick Trivia

A simple trivia game built [on stream](https://youtu.be/oD-sS4sLApk) relatively quickly.

* The trivia questions are scraped from this horrible article with node-fetch and cheerio:
  * https://www.rd.com/culture/trivia-questions/page/1/
* The server is an apollo graphql API that has a resolver that calls the scraping code
* The client is built with Vue and apollo-client
