export type ServerResponseType<T = unknown> =
  | { success: true; data?: T }
  | { success: false; message: string };

export function successResponse<T>(data?: T): ServerResponseType<T> {
  return { success: true, data };
}

export function errorResponse<T = unknown>(
  message: string,
  error: any
): ServerResponseType<T> {
  console.error(message, error);
  return { success: false, message };
}
