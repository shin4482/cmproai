export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          AI-Powered Job Application Assistant
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Meet <span className="text-cyan-400">CMproAI</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Create smarter resumes, tailor your applications to each job,
          and prepare for interviews - all in one place.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-300">
            Get Started
          </button>

          <button className="rounded-full border border-slate-700 px-8 py-4 font-semibold text-white transition hover:bg-slate-800">
            See How It Works
          </button>
        </div>

        <div className="mt-16 grid w-full gap-6 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Smart Resume</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Build professional resumes designed around the job you want.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Job Matching</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Tailor your resume and application to different job positions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Interview Prep</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Practice questions and prepare with AI before your interview.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}