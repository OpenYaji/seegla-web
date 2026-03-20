import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !adminRow) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "100");
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 100;

  const { data, error } = await supabase
    .from("demo_bookings")
    .select("id, first_name, last_name, work_email, company_name, team_size, requested_date, requested_time, status, created_at")
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (error) {
    return NextResponse.json({ error: "Failed to fetch demo requests" }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] }, { status: 200 });
}
