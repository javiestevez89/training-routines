import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database'

export async function GET(request: Request) {
  console.log('GET Preferences API called')
  
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    console.log('Fetching preferences for email:', email)

    if (!email) {
      console.error('No email provided in query params')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    
    // Fetch preferences using email
    console.log('Querying Supabase for preferences...')
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('email', decodeURIComponent(email))
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      console.log('No preferences found for email:', email)
      return NextResponse.json(
        { error: 'No preferences found' },
        { status: 404 }
      )
    }

    console.log('Successfully fetched preferences:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/preferences:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  console.log('Preferences API called')
  
  try {
    // Get preferences data from request body
    const preferences = await request.json()
    console.log('Received preferences:', preferences)

    if (!preferences.email) {
      console.error('No email provided in preferences')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    
    // First check if a record exists for this email
    const { data: existingData } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('email', preferences.email)
      .single()

    let result
    if (existingData) {
      // Update existing record
      console.log('Updating existing preferences for email:', preferences.email)
      result = await supabase
        .from('user_preferences')
        .update({
          fitness_goals: preferences.fitness_goals,
          experience_level: preferences.experience_level,
          equipment_access: preferences.equipment_access,
          workout_frequency: preferences.workout_frequency,
          physical_limitations: preferences.physical_limitations,
          workout_preferences: preferences.workout_preferences,
          updated_at: new Date().toISOString()
        })
        .eq('email', preferences.email)
    } else {
      // Insert new record
      console.log('Creating new preferences for email:', preferences.email)
      result = await supabase
        .from('user_preferences')
        .insert({
          email: preferences.email,
          fitness_goals: preferences.fitness_goals,
          experience_level: preferences.experience_level,
          equipment_access: preferences.equipment_access,
          workout_frequency: preferences.workout_frequency,
          physical_limitations: preferences.physical_limitations,
          workout_preferences: preferences.workout_preferences,
        })
    }

    if (result.error) {
      console.error('Error saving preferences:', result.error)
      return NextResponse.json(
        { error: 'Failed to save preferences' },
        { status: 500 }
      )
    }

    // Create the response
    const response = NextResponse.json({
      success: true,
      email: preferences.email,
      message: `Preferences ${existingData ? 'updated' : 'saved'} successfully`
    })

    // Set the cookie with explicit domain
    const cookieOptions = {
      name: 'user_email',
      value: preferences.email,
      path: '/',
      httpOnly: false, // Make it accessible to JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }

    console.log('Setting cookie with options:', cookieOptions)
    response.cookies.set(cookieOptions)

    return response
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 