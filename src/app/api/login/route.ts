import { NextResponse } from "next/server";

interface LoginRequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: LoginRequestBody = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const { message, errorMessage, data } = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: message, errorMessage: errorMessage },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("authToken", data.token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1 * 60 * 60,
  });

  return res;
}
