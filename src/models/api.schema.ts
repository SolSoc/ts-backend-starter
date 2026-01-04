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

export function Ok(data: any) {
  return {
    status: "success" as const,
    data: prepareJSON(data),
  };
}

export function Err(code: number, message: string) {
  return {
    status: "error" as const,
    error: {
      code,
      message,
    },
  };
}
