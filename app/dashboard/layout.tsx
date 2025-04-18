import Link from "next/link"
import { Dumbbell } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6" />
              <span className="font-bold">GymRoutine</span>
            </Link>
            <nav className="flex items-center space-x-4 md:space-x-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/routine/new"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                New Routine
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex h-14 items-center text-sm">
          <p className="text-muted-foreground">
            Built with Next.js, Tailwind, and Supabase
          </p>
        </div>
      </footer>
    </div>
  )
} 