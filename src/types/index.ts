export type UserRole = "judge" | "lawyer" | "clerk" | "citizen" | "admin";
export interface User { id: number; email: string; firstname: string; lastname: string; role: UserRole; is_active: boolean; is_verified: boolean }
export interface Case { id: number; case_number: string; title: string; description: string | null; case_type: string; status: "pending" | "active" | "hearing" | "judgment" | "closed" | "archived"; priority: "low" | "medium" | "high" | "urgent"; plaintiff_id: number; defendant_name: string; assigned_judge_id: number | null; assigned_lawyer_id: number | null; created_at: string; updated_at: string }
export type CaseInput = Pick<Case, "title" | "description" | "case_type" | "defendant_name" | "priority">;
