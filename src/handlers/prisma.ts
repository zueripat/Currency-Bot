import { PrismaClient } from "@prisma/client";
import { configure } from "log4js";

// Configure logger
configure({
  appenders: {
    file: { type: "file", filename: "logs/main.log" },
  },
  categories: {
    DBError: { appenders: ["file"], level: "error" },
    DBQuery: { appenders: ["file"], level: "info" },
    DBInfo: { appenders: ["file"], level: "info" },
    DBWarn: { appenders: ["file"], level: "warn" },
  },
});

// Create a new Prisma Class , which extends the PrismaClient class and adds middleware
export default class DBClient {
  public $prisma = new PrismaClient();
  constructor() {
    // Add middleware to log queries
  }
}
