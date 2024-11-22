import { NextResponse } from "next/server";

interface RegisterRequestBody {
  email: string;
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RegisterRequestBody = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const { message, errorMessage } = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: message, errorMessage: errorMessage },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ message: "User created!" });

  return res;
}
