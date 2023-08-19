#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import { askQuestion } from "./askQuestion";

console.log(figlet.textSync("Trivia Game", { horizontalLayout: "full" }));

const program = new Command();

program
  .version(JSON.stringify(require("../package.json").version))
  .description("Get random trivia questions and answer them")
  .parse(process.argv);

askQuestion();
