// app/api/getSession/route.ts

import { auth } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Get the session on the server side using NextAuth's `auth` method
    const session = await auth({ req, options: authOptions });

    if (session) {
      return NextResponse.json(session, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
