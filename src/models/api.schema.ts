import z, { ZodError, ZodType } from "zod";
import { BadRequestError } from "../util/error";

function prepareJSON(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    })
  );
}

/**
 * Success response structure
 *
 * Build a success response object to be sent to the client. Handles bigint serialization.
 * @param data the response data
 * @returns A success response object
 */
export function Ok(data: any) {
  return {
    status: "success" as const,
    data: prepareJSON(data),
  };
}

/**
 * Error response structure
 *
 * Build an error response object to be sent to the client.
 * @param code the http status code
 * @param message the error message
 * @returns An error response object
 */
export function Err(code: number, message: string) {
  return {
    status: "error" as const,
    error: {
      code,
      message,
    },
  };
}

/**
 * Parse and validate request data
 *
 * Validates the given data against the provided Zod schema. If validation fails, throws a BadRequestError.
 * @param schema The Zod schema to validate against
 * @param data The data to be validated
 * @returns The validated data
 * @throws BadRequestError if validation fails
 */
export function parseRequestData<T extends ZodType>(schema: T, data: unknown) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new BadRequestError(z.prettifyError(error));
    }
    throw error;
  }
}
