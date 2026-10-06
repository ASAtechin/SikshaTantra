"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BusFront,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import type { ERPSimulationState } from "@/lib/curriculum-types";
import { cn } from "@/lib/utils";

const modules: { id: ERPSimulationState["activeModule"]; label: string; icon: typeof Activity }[] = [
  { id: "fees", label: "Fees & ledger", icon: CircleDollarSign },
  { id: "attendance", label: "Morning roll call", icon: UsersRound },
  { id: "report_cards", label: "Term marksheet", icon: ReceiptText },
  { id: "transport", label: "School transport", icon: BusFront },
  { id: "timetable", label: "Substitution", icon: CalendarClock },
];

const sampleStudents = [
  { studentName: "Aarav Mehta", admissionNo: "ST-2024-0816", classSection: "VIII · A" },
  { studentName: "Ananya Rao", admissionNo: "ST-2023-0421", classSection: "IX · B" },
  { studentName: "Kabir Shah", admissionNo: "ST-2025-0198", classSection: "VII · C" },
];

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function SchoolOperationsSimulator({ onClose }: { onClose: () => void }) {
  const [activeModule, setActiveModule] = useState<ERPSimulationState["activeModule"]>("fees");
  const [studentIndex, setStudentIndex] = useState(0);
  const [receiptIssued, setReceiptIssued] = useState(false);
  const [present, setPresent] = useState(1382);
  const [substituteAssigned, setSubstituteAssigned] = useState(false);
  const [routeStop, setRouteStop] = useState(2);
  const currentStudent = sampleStudents[studentIndex];
  const state: ERPSimulationState = { activeModule, ...currentStudent };
  const attendanceRate = useMemo(() => ((present / 1420) * 100).toFixed(1), [present]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function cycleStudent() {
    setStudentIndex((index) => (index + 1) % sampleStudents.length);
    setReceiptIssued(false);
  }

  return (
    <section className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[26px] border border-white/75 bg-[#f9f8f2]/95 shadow-[0_28px_90px_-42px_rgba(20,38,30,.5)] backdrop-blur-2xl" aria-label="School operations simulator">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26312e]/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#263e34] text-[#efd080]"><Activity className="h-4 w-4" /></span>
          <div>
            <p className="font-display text-sm font-extrabold text-[#283a31]">Siksha OS</p>
            <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#8a958c]">Operations simulator · demo data</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={cycleStudent} className="rounded-full border border-[#26312e]/10 bg-white/80 px-3 py-2 text-[10px] font-bold text-[#607067] hover:bg-white" aria-label="Switch demonstration student">
            {state.studentName} · {state.classSection} <ArrowDownRight className="ml-1 inline h-3 w-3" />
          </button>
          <button onClick={onClose} aria-label="Close simulator" className="rounded-full p-2 text-[#65746d] hover:bg-black/5"><X className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#26312e]/10 p-2 lg:w-[190px] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-3" aria-label="Simulator modules">
          {modules.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveModule(id); setReceiptIssued(false); }} aria-pressed={activeModule === id} className={cn("flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[10px] font-bold transition-colors", activeModule === id ? "bg-[#263e34] text-white" : "text-[#6f7c72] hover:bg-white/80")}>
              <Icon className={cn("h-4 w-4", activeModule === id && "text-[#efd080]")} /> {label}
            </button>
          ))}
        </nav>

        <div className="min-h-[290px] flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#87948a]">Selected workspace</p>
              <h3 className="font-display text-base font-extrabold text-[#283a31]">{modules.find((item) => item.id === activeModule)?.label}</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7eee5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#477058]"><span className="h-1.5 w-1.5 rounded-full bg-[#4b9868]"/>Simulated</span>
          </div>
          {activeModule === "fees" && <FeesDesk student={state} receiptIssued={receiptIssued} onIssueReceipt={() => setReceiptIssued(true)} />}
          {activeModule === "attendance" && <AttendanceDesk present={present} rate={attendanceRate} onToggle={() => setPresent((n) => n === 1382 ? 1383 : 1382)} />}
          {activeModule === "report_cards" && <MarksDesk student={state} />}
          {activeModule === "transport" && <TransportDesk routeStop={routeStop} onNextStop={() => setRouteStop((n) => (n + 1) % 4)} />}
          {activeModule === "timetable" && <SubstitutionDesk assigned={substituteAssigned} onAssign={() => setSubstituteAssigned(true)} />}
        </div>
      </div>
      <footer className="flex items-start gap-2 border-t border-[#26312e]/10 bg-[#f3f1e8] px-4 py-2.5 text-[9px] leading-relaxed text-[#777f75] sm:px-5">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#698676]" /> All names, amounts, marks, alerts, and routes shown here are fictional simulator values—not live school data or proof of production availability.
      </footer>
    </section>
  );
}

function FeesDesk({ student, receiptIssued, onIssueReceipt }: { student: ERPSimulationState; receiptIssued: boolean; onIssueReceipt: () => void }) {
  return <div className="grid gap-3 xl:grid-cols-[1fr_210px]">
    <div className="overflow-hidden rounded-2xl border border-[#293c32]/10 bg-white/85">
      <div className="flex items-center justify-between bg-[#293f35] px-4 py-3 text-white"><div><p className="text-[9px] uppercase tracking-widest text-white/55">Fee ledger · {student.admissionNo}</p><p className="mt-0.5 text-xs font-bold">{student.studentName} · {student.classSection}</p></div><CreditCard className="h-4 w-4 text-[#efd080]"/></div>
      {[ ["Tuition · Term II", 24500], ["Transport", 7200], ["RTE concession", -12000] ].map(([label, amount]) => <div key={label} className="flex items-center justify-between border-b border-[#293c32]/6 px-4 py-3 text-xs"><span className="text-[#64736a]">{label}</span><span className={cn("font-bold", Number(amount) < 0 ? "text-[#45825c]" : "text-[#304137]")}>{Number(amount) < 0 ? "−" : ""}{rupees.format(Math.abs(Number(amount)))}</span></div>)}
      <div className="flex items-center justify-between px-4 py-3"><span className="text-xs font-bold text-[#35463c]">Balance due</span><span className="font-display text-lg font-extrabold text-[#9a7131]">{rupees.format(19700)}</span></div>
    </div>
    <div className="flex flex-col justify-between rounded-2xl border border-[#c5d9ca] bg-[#edf4ec] p-4"><div><p className="text-[9px] font-extrabold uppercase tracking-widest text-[#6e8a74]">UPI · PhonePe</p><p className="mt-2 font-display text-2xl font-extrabold text-[#2e6545]">Paid</p><p className="mt-1 text-[10px] leading-snug text-[#77877a]">Fictional payment state · TXN•••8402</p></div><button onClick={onIssueReceipt} className="mt-4 rounded-xl bg-[#2d6547] px-3 py-2.5 text-[10px] font-bold text-white hover:bg-[#24563b]">{receiptIssued ? "Receipt #DEMO-1042 ready ✓" : "Generate demo receipt"}</button></div>
  </div>;
}

function AttendanceDesk({ present, rate, onToggle }: { present: number; rate: string; onToggle: () => void }) {
  return <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
    <div className="rounded-2xl bg-[#293f35] p-5 text-white"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Morning roll call</p><UsersRound className="h-4 w-4 text-[#efd080]"/></div><p className="mt-4 font-display text-4xl font-extrabold">{present.toLocaleString("en-IN")} <span className="text-lg text-white/40">/ 1,420</span></p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"><motion.div animate={{width:`${rate}%`}} className="h-full rounded-full bg-[#e5c46d]"/></div><p className="mt-2 text-[10px] text-white/65">{rate}% present · demo roll call</p><button onClick={onToggle} className="mt-4 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold hover:bg-white/10">Toggle one learner</button></div>
    <div className="rounded-2xl border border-[#c9d9c9] bg-[#eff5ed] p-5"><div className="flex items-center gap-2 text-[#417051]"><MessageCircle className="h-4 w-4"/><p className="text-[10px] font-extrabold uppercase tracking-wide">WhatsApp preview</p></div><div className="mt-4 rounded-2xl rounded-tl-sm bg-white p-3 text-xs leading-relaxed text-[#55645a] shadow-sm">Namaste, Aarav was marked present in Class VIII-A at 08:14. <span className="mt-1 block text-right text-[9px] text-[#9ba39a]">Demo message · not sent</span></div><p className="mt-3 text-[9px] leading-relaxed text-[#7d897f]">Real messaging requires an approved provider, guardian permissions, and opt-in configuration.</p></div>
  </div>;
}

function MarksDesk({ student }: { student: ERPSimulationState }) {
  const subjects = [{ name:"Mathematics", pt:18, exam:76, grade:"A1" }, { name:"Science", pt:16, exam:71, grade:"A2" }, { name:"English", pt:19, exam:82, grade:"A1" }, { name:"Social Science", pt:15, exam:68, grade:"B1" }];
  return <div className="overflow-hidden rounded-2xl border border-[#293c32]/10 bg-white/85"><div className="flex flex-wrap items-center justify-between gap-2 bg-[#293f35] px-4 py-3 text-white"><div><p className="text-[9px] uppercase tracking-widest text-white/55">Term 1 · CBSE example</p><p className="mt-0.5 text-xs font-bold">{student.studentName} · {student.classSection}</p></div><span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-[#efd080]">SIMULATED</span></div><div className="grid grid-cols-[1.3fr_.7fr_.9fr_.6fr] gap-2 border-b border-[#293c32]/8 px-4 py-2 text-[9px] font-extrabold uppercase text-[#89938b]"><span>Subject</span><span>PT / 20</span><span>Half-yearly / 100</span><span>Grade</span></div>{subjects.map((row)=><div key={row.name} className="grid grid-cols-[1.3fr_.7fr_.9fr_.6fr] items-center gap-2 border-b border-[#293c32]/6 px-4 py-3 text-xs"><span className="font-semibold text-[#495a50]">{row.name}</span><span>{row.pt}</span><span>{row.exam}</span><span className="w-fit rounded-lg bg-[#e7eee5] px-2 py-1 font-extrabold text-[#3e6b51]">{row.grade}</span></div>)}</div>;
}

function TransportDesk({ routeStop, onNextStop }: { routeStop: number; onNextStop: () => void }) {
  const stops = ["School Gate", "Market Circle", "Lake Road", "Green Park"];
  return <div className="grid gap-3 sm:grid-cols-[1fr_1fr]"><div className="relative min-h-[190px] overflow-hidden rounded-2xl bg-[#e9eee4] p-4"><svg viewBox="0 0 360 190" className="absolute inset-0 h-full w-full" aria-label="Illustrative bus route map"><path d="M28 148 C84 142 87 56 153 67 S226 155 315 36" fill="none" stroke="#9db39c" strokeWidth="5" strokeLinecap="round"/><path d="M28 148 C84 142 87 56 153 67 S226 155 315 36" fill="none" stroke="#4b795d" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round"/>{[[28,148],[105,92],[200,103],[315,36]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===routeStop?9:6} fill={i===routeStop?"#d3a747":"#fffefa"} stroke="#416d54" strokeWidth="3"/>)}<g transform={`translate(${[28,105,200,315][routeStop]-10} ${[148,92,103,36][routeStop]-28})`}><rect width="23" height="14" rx="5" fill="#263f35"/><circle cx="5" cy="15" r="2.5" fill="#32443a"/><circle cx="18" cy="15" r="2.5" fill="#32443a"/></g></svg><span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold text-[#53665a]">Route 04 · demo</span></div><div className="flex flex-col justify-between rounded-2xl border border-[#d4dfcf] bg-white/80 p-4"><div><div className="flex items-center justify-between"><p className="text-xs font-bold text-[#405449]">Green Line · Bus 08</p><span className="rounded-full bg-[#e6f1e5] px-2 py-1 text-[9px] font-bold text-[#4c815b]">MOVING · DEMO</span></div><p className="mt-3 font-display text-3xl font-extrabold text-[#2a5942]">28 <span className="text-sm text-[#7d8b80]">km/h</span></p><div className="mt-4 space-y-2">{stops.map((stop,i)=><div key={stop} className="flex items-center gap-2 text-[10px]"><span className={`h-2 w-2 rounded-full ${i<=routeStop?"bg-[#477957]":"bg-[#cbd5c8]"}`}/><span className={i===routeStop?"font-extrabold text-[#385e48]":"text-[#78857b]"}>{stop}</span><span className="ml-auto text-[#89958b]">{i<routeStop?"Passed":i===routeStop?"Now":`${(i-routeStop)*4+3} min`}</span></div>)}</div></div><button onClick={onNextStop} className="mt-4 rounded-xl bg-[#263f35] px-3 py-2.5 text-[10px] font-bold text-white">Simulate next stop</button></div></div>;
}

function SubstitutionDesk({ assigned, onAssign }: { assigned: boolean; onAssign: () => void }) {
  return <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-2xl border border-[#ecd9bd] bg-[#fff7e9] p-4"><p className="text-[9px] font-extrabold uppercase tracking-wide text-[#a17835]">Absent faculty</p><p className="mt-2 font-display text-base font-bold text-[#3c463b]">Ms. Kavita Sharma</p><p className="mt-1 text-[10px] text-[#7d867a]">Mathematics · Class VIII-A · Period 4</p></div><div className="flex justify-center text-[#a8b0a5]"><ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0"/></div><div className="rounded-2xl border border-[#d1dfd2] bg-[#f2f7f0] p-4"><p className="text-[9px] font-extrabold uppercase tracking-wide text-[#608169]">{assigned?"Substitute assigned":"Suggested substitute"}</p><p className="mt-2 font-display text-base font-bold text-[#3c463b]">{assigned?"Mr. Rohan Desai":"Mr. Rohan Desai"}</p><p className="mt-1 text-[10px] text-[#7d867a]">Available · no timetable conflict</p></div><button onClick={onAssign} disabled={assigned} className="rounded-xl bg-[#263f35] px-4 py-3 text-[10px] font-bold text-white disabled:bg-[#688474] sm:col-span-3">{assigned?"Assigned · DigiBoard preview synced ✓":"Assign substitute · demo action"}</button></div>;
}
