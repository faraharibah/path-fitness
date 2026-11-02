import Link from 'next/link';
import { Activity, ArrowLeft } from 'lucide-react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#F2F2F7] px-4 py-8 text-[#1C1C1E] sm:grid sm:place-items-center">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#636366]"><ArrowLeft size={16}/> Back to Path Fitness</Link>
        <div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#007AFF] text-white"><Activity size={20}/></div><div><div className="text-lg font-bold">Path Fitness</div><div className="text-xs text-[#8E8E93]">Welcome back</div></div></div>
        <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/today"
            appearance={{
              variables: { colorPrimary: '#007AFF', colorForeground: '#1C1C1E', colorBackground: '#FFFFFF' },
              elements: { card: 'shadow-none border-0 p-0', headerTitle: 'font-bold tracking-tight', headerSubtitle: 'text-[#8E8E93]', formButtonPrimary: 'rounded-full shadow-none', socialButtonsBlockButton: 'rounded-full border-slate-200', footerActionLink: 'text-[#007AFF]' },
            }}
          />
        </section>
      </div>
    </main>
  );
}
