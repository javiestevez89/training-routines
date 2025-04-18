-- Drop existing enum types if they exist
DROP TYPE IF EXISTS user_goal CASCADE;
DROP TYPE IF EXISTS experience_level CASCADE;

-- Create updated enum types
CREATE TYPE user_goal AS ENUM ('build_muscle', 'lose_fat', 'stay_fit', 'strength', 'endurance');
CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE equipment_access AS ENUM ('full_gym', 'home_gym', 'minimal', 'park');
CREATE TYPE workout_frequency AS ENUM ('2-3', '3-4', '4-5', '5+');
CREATE TYPE physical_limitations AS ENUM ('none', 'back', 'joints', 'other');
CREATE TYPE workout_preferences AS ENUM ('traditional', 'functional', 'hiit', 'strength');

-- Create user_preferences table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_preferences (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    email TEXT NOT NULL UNIQUE,
    fitness_goals user_goal[] NOT NULL,
    experience_level experience_level NOT NULL,
    equipment_access equipment_access NOT NULL,
    workout_frequency workout_frequency NOT NULL,
    physical_limitations physical_limitations NOT NULL,
    workout_preferences workout_preferences NOT NULL
);

-- Update the RLS policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update their own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can view their own preferences" ON user_preferences;

-- Create new policies
CREATE POLICY "Users can insert their own preferences"
ON user_preferences FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update their own preferences"
ON user_preferences FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'email' = email)
WITH CHECK (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can view their own preferences"
ON user_preferences FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = email);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_updated_at ON user_preferences;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at(); 