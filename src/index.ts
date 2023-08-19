#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import { askQuestion } from "./askQuestion";
import { LIB_VERSION } from "./version";

console.log(figlet.textSync("Trivia Game", { horizontalLayout: "full" }));

const program = new Command();

program
  .version(LIB_VERSION)
  .description("Get random trivia questions and answer them")
  .parse(process.argv);

askQuestion();
