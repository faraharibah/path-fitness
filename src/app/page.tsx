import Link from 'next/link';
import { Activity, ArrowRight, Footprints, Heart, Mountain } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F2F2F7] px-5 py-12 text-[#1C1C1E]">
      <div className="w-full max-w-md">
        <div className="mb-7 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[16px] bg-[#007AFF] text-white shadow-sm"><Activity size={22}/></div>
            <div><div className="text-[19px] font-bold tracking-[-.5px]">Path Fitness</div><div className="text-xs text-[#8E8E93]">Move at your pace</div></div>
          </div>
        </div>
        <section className="rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-sm sm:p-9">
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-[19px] bg-blue-50 text-[#007AFF]"><Footprints size={27}/></div>
          <p className="text-sm font-semibold text-[#007AFF]">A FITNESS APP THAT FLEXES WITH YOU</p>
          <h1 className="mt-2 text-[38px] font-bold leading-[1.08] tracking-[-1.2px]">Find your<br/>own rhythm.</h1>
          <p className="mt-4 text-base leading-6 text-[#8E8E93]">Train for a race or build a movement habit. Your plan adapts to the life you have today.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-[#F7F7FA] p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#007AFF]"><Activity size={19}/></span><div><div className="text-sm font-bold">Training that fits your week</div><div className="text-xs text-[#8E8E93]">A plan shaped around your goals.</div></div></div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#F7F7FA] p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#34C759]"><Heart size={19}/></span><div><div className="text-sm font-bold">Consistency without pressure</div><div className="text-xs text-[#8E8E93]">Small steps count. Rest days too.</div></div></div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#F7F7FA] p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#5856D6]"><Mountain size={19}/></span><div><div className="text-sm font-bold">Your path, your activities</div><div className="text-xs text-[#8E8E93]">Run, hike, ride, stretch, and more.</div></div></div>
          </div>
          <Link href="/today?setup=1" className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-blue-600">Create my plan <ArrowRight size={17}/></Link>
          <p className="mt-5 text-center text-xs text-[#8E8E93]">No account needed. Your progress stays in this browser.</p>
        </section>
      </div>
    </main>
  );
}
