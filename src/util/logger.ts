import chalk from "chalk";
import winston from "winston";
import z, { ZodError } from "zod";

const levelColors: { [key: string]: (text: string) => string } = {
  error: chalk.bgRed,
  warn: chalk.bgYellow,
  info: chalk.bgBlue,
  http: chalk.bgMagenta,
  verbose: chalk.bgCyan,
  debug: chalk.bgGreen,
};

function getErrorDetails(error: any): { message: string; stack?: string } {
  let message = "";
  let stack: string | undefined = undefined;
  if (error instanceof Error) {
    message =
      error instanceof ZodError ? z.prettifyError(error) : error.message;
    stack = error.stack;
  } else if (typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else {
    message = String(error);
  }
  return { message, stack };
}

function getBaseLogMessage(info: {
  level: string;
  timestamp: string;
  label: string;
  module?: string;
}): string {
  const { level, timestamp, label, module } = info;
  return `${levelColors[level](level.toUpperCase())} ${chalk.green(
    timestamp
  )} [${chalk.blue(label)}]${module ? `::[${chalk.magenta(module)}]` : ""}: `;
}

const logFormat = (serviceName: string) => {
  return winston.format.printf(
    ({ level, message, label, timestamp, module, error }) => {
      if (!module) module = serviceName;
      const { message: errorMessage, stack: errorStack } =
        getErrorDetails(error);
      const baseMessage = getBaseLogMessage({
        level,
        timestamp: "" + timestamp,
        label: "" + label,
        module: "" + module,
      });
      return `${baseMessage}\n${message ? String(message).trim() : ""}${
        error ? `\nError: ${errorMessage}` : ""
      }${errorStack ? `\nStack Trace:\n${errorStack}` : ""}`;
    }
  );
};

export function Logger(service: string) {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
      winston.format.label({ label: service }),
      winston.format.timestamp(),
      logFormat(service)
    ),
    transports: [
      new winston.transports.Console(),
      // new winston.transports.File({ filename: "error.log", level: "error" }),
      // new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  return logger;
}
