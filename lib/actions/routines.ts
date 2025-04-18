import { supabase } from "@/lib/supabase/client"
import type { Routine } from "@/types/database"

export async function getUserActiveRoutine(userId: string): Promise<Routine | null> {
  const { data, error } = await supabase
    .from("routines")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching active routine:", error)
    return null
  }

  return data
} 