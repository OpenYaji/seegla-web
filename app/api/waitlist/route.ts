import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type WaitlistPayload = {
  fullName?: string;
  workEmail?: string;
  companyName?: string;
  companySize?: string;
  role?: string;
};

const COMPANY_SIZES = new Set(["1-50", "51-200", "201-500", "500+"]);
const ROLES = new Set(["hr", "ceo", "ops", "wellness", "other"]);

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 },
    );
  }

  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fullName = body.fullName?.trim() ?? "";
  const workEmail = body.workEmail?.trim().toLowerCase() ?? "";
  const companyName = body.companyName?.trim() ?? "";
  const companySize = body.companySize?.trim() ?? "";
  const role = body.role?.trim() ?? "";

  if (!fullName || !workEmail || !companyName || !companySize || !role) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!COMPANY_SIZES.has(companySize)) {
    return NextResponse.json({ error: "Invalid company size." }, { status: 400 });
  }

  if (!ROLES.has(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from("waitlist_leads").insert({
    full_name: fullName,
    work_email: workEmail,
    company_name: companyName,
    company_size: companySize,
    role,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to save waitlist submission." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
