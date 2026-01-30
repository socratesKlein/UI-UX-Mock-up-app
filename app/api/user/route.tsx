import { db } from "@/Config/db";
import { usersTable } from "@/Config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("=== API Route Called ===");
  
  const { userId } = await auth();
  console.log("userId:", userId);
  
  if (!userId) {
    console.log("No userId - unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("Request body:", body);
  
  const { name, email } = body;

  const users = await db.select().from(usersTable)
    .where(eq(usersTable.email, email));
  
  console.log("Found users:", users);
  
  if (users?.length === 0) {
    console.log("Creating new user...");
    const result = await db.insert(usersTable).values({
      name,
      email
    }).returning();
    
    console.log("New user created:", result);
    return NextResponse.json(result[0]);
  }
  
  console.log("Returning existing user:", users[0]);
  return NextResponse.json(users[0]);
}