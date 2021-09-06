import * as fs from "fs";
import * as yaml from "js-yaml";
import { Config } from "./types.js";

const path = ".config/config.yml"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function load() {
  const config = yaml.load(fs.readFileSync(path, "utf8")) as Config;

  return config;
}
