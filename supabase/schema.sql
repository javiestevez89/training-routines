-- Create custom types
CREATE TYPE user_goal AS ENUM ('build_muscle', 'lose_fat', 'stay_fit');
CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Enable RLS
ALTER DATABASE postgres SET "auth.enable_rlspolicies" = on;

-- Create tables
CREATE TABLE IF NOT EXISTS routines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    goal user_goal NOT NULL,
    experience_level experience_level NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS routine_days (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    routine_id UUID REFERENCES routines(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(routine_id, day_of_week)
);

CREATE TABLE IF NOT EXISTS exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    routine_day_id UUID REFERENCES routine_days(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create RLS policies
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Policies for routines
CREATE POLICY "Users can view their own routines"
    ON routines FOR SELECT
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own routines"
    ON routines FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own routines"
    ON routines FOR UPDATE
    USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own routines"
    ON routines FOR DELETE
    USING (auth.uid()::text = user_id);

-- Policies for routine_days
CREATE POLICY "Users can view days of their routines"
    ON routine_days FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM routines
        WHERE routines.id = routine_days.routine_id
        AND routines.user_id = auth.uid()::text
    ));

-- Policies for exercises
CREATE POLICY "Users can view exercises of their routine days"
    ON exercises FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM routine_days
        JOIN routines ON routines.id = routine_days.routine_id
        WHERE routine_days.id = exercises.routine_day_id
        AND routines.user_id = auth.uid()::text
    )); 