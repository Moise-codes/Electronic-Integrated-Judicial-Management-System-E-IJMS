const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
export class ApiError extends Error { constructor(public status: number, message: string) { super(message); this.name = "ApiError"; } }
export async function api<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  try { const response = await fetch(`${API_URL}${path}`, { ...options, headers }); if (!response.ok) { const payload = await response.json().catch(() => null); throw new ApiError(response.status, payload?.detail || messageFor(response.status)); } if (response.status === 204) return undefined as T; return response.json() as Promise<T>; }
  catch (error) { if (error instanceof ApiError) throw error; throw new ApiError(0, "We couldn't connect to IJMS. Check your connection and try again."); }
}
function messageFor(status: number) { return ({ 401: "Your session has expired. Please sign in again.", 403: "You don't have permission to perform this action.", 404: "The requested resource could not be found.", 422: "Please review the highlighted fields.", 500: "Something went wrong on the server. Please try again." } as Record<number, string>)[status] || "We couldn't complete that request."; }
