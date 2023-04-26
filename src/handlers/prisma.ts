import { PrismaClient } from "@prisma/client";
import log4js, { configure } from "log4js";

// Configure logger
configure({
  appenders: {
    file: { type: "file", filename: "logs/main.log" },
  },
  categories: {
    default: { appenders: ["file"], level: "info" },
    DBError: { appenders: ["file"], level: "error" },
    DBQuery: { appenders: ["file"], level: "info" },
    DBInfo: { appenders: ["file"], level: "info" },
    DBWarn: { appenders: ["file"], level: "warn" },
  },
});

// Create a new Prisma Class , which extends the PrismaClient class and adds middleware
export default class DBClient {
  public instance;

  constructor() {
    this.instance = new PrismaClient({
      log: [
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
      errorFormat: "pretty",
    });

    // Add middleware to log queries
    this.instance.$use(async (params, next) => {
      const logger = log4js.getLogger("DBQuery");
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      const queryTime = after - before;
      logger.info(`${params.model}.${params.action} ${queryTime}ms`);
      return result;
    });

    // Add listener to log errors and warnings
    this.instance.$on("error", (e) => {
      const logger = log4js.getLogger("DBError");
      logger.error(`[ ${e.target} ] ${e.message}`);
    });

    this.instance.$on("warn", (e) => {
      const logger = log4js.getLogger("DBWarn");
      logger.warn(`[ ${e.target} ] ${e.message}`);
    });
  }
}
