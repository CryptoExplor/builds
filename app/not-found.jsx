import Link from 'next/link'
import { ArrowLeft, SearchX } from '@/app/components/icons'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <SearchX size={40} className="mx-auto mb-5 text-indigo-400/70" />
        <h1 className="text-2xl font-bold mb-3">Project not found</h1>
        <p className="text-white/55 mb-8">
          The project you&apos;re looking for doesn&apos;t exist, was removed, or is no longer
          publicly listed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>
      </div>
    </div>
  )
}
