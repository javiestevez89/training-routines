# Training Routines

A personalized workout planning application built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🏋️‍♂️ Personalized workout plans based on user preferences
- 📊 Progress tracking
- 🎯 Goal-based routines
- 📱 Responsive design
- 🔐 Secure authentication
- 🎨 Modern UI with Tailwind CSS and Radix UI

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Custom email-based auth
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/javiestevez89/training-routines.git
   cd training-routines
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   └── onboarding/     # Onboarding flow
├── components/          # Reusable components
│   ├── ui/             # UI components
│   └── providers/      # Context providers
├── lib/                # Utility functions
├── types/              # TypeScript types
└── public/             # Static assets
```

## Database Schema

The application uses the following main tables:
- `user_preferences`: Stores user preferences and fitness goals
- `routines`: Workout routines
- `routine_days`: Days within a routine
- `exercises`: Individual exercises

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI Components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
