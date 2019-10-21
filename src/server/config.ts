import path from "path";
import fsx from "fs-extra";
import dotenv from "dotenv-safe";
import { ChunkExtractor } from "@loadable/server";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  example: path.resolve(__dirname, "../../.env.example"),
});

// Env constants
// ---
export const ENVIRONMENT = process.env.ENV || "dev";
export const PRODUCTION = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || "3000";

// Build thingies
// ---
export const extractor = new ChunkExtractor({
  statsFile: path.resolve(__dirname, "../loadable-stats.json"),
});

// Only reads flat ones by default
export const routes: string[] = ["/"].concat(
  fsx
    .readdirSync(path.resolve(__dirname, "../client/scenes"))
    .filter(folder => folder.match(/^[a-zA-Z]+$/))
    .map(folder => `/${folder}`),
);
