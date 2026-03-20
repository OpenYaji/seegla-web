import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type BookingPayload = {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  companyName?: string;
  teamSize?: string;
  requestedDate?: string;
  requestedTime?: string;
  timezone?: string;
  goals?: string;
};

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 },
    );
  }

  let body: BookingPayload;
  try {
    body = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const workEmail = body.workEmail?.trim().toLowerCase() ?? "";
  const companyName = body.companyName?.trim() ?? "";
  const teamSize = body.teamSize?.trim() ?? "";
  const requestedDate = body.requestedDate?.trim() ?? "";
  const requestedTime = body.requestedTime?.trim() ?? "";
  const timezone = body.timezone?.trim() || "Asia/Manila";
  const goals = body.goals?.trim() || null;

  if (!firstName || !lastName || !workEmail || !companyName || !teamSize || !requestedDate || !requestedTime) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(requestedDate)) {
    return NextResponse.json({ error: "Invalid requested date format." }, { status: 400 });
  }

  const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from("demo_bookings").insert({
    first_name: firstName,
    last_name: lastName,
    work_email: workEmail,
    company_name: companyName,
    team_size: teamSize,
    requested_date: requestedDate,
    requested_time: requestedTime,
    timezone,
    goals,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save booking request." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
