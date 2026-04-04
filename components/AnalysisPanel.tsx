"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnalysisPanelProps {
  state: "idle" | "scanning" | "analyzing" | "complete";
  progress?: number; 
}

const CATEGORIES = [
  { name: "ASPHYXIA", desc: "Ligature, Hanging, Suffocation" },
  { name: "FIREARM", desc: "Entry/Exit, Stippling" },
  { name: "BLUNT FORCE", desc: "Abrasions, Contusions, Lacerations" },
  { name: "SHARP FORCE", desc: "Incised, Stab, Chop Wounds" },
  { name: "THERMAL", desc: "Burns, Scalds, Electrical" },
  { name: "NATURAL", desc: "Atherosclerosis, Hemorrhage" },
  { name: "POSTMORTEM", desc: "Livor, Rigor, Putrefaction" },
  { name: "TOXICOLOGY", desc: "CO, Corrosives, Arsenic" },
];

export default function AnalysisPanel({ state, progress = 0 }: AnalysisPanelProps) {
  
  if (state === "idle" || state === "complete") {
    return (
      <div style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 className="font-bebas" style={{ fontSize: '28px', color: 'var(--text-bright)', marginBottom: '16px' }}>FORENSIC CATEGORIES</h2>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', flex: 1, alignContent: 'start' }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              style={{ padding: '12px', backgroundColor: 'rgba(26, 26, 46, 0.4)', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--accent-primary)', display: 'flex', flexDirection: 'column' }}
            >
              <div className="font-bebas" style={{ fontSize: '20px', color: 'var(--text-bright)' }}>{cat.name}</div>
              <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-primary)', marginTop: '4px' }}>{cat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (state === "scanning") {
    const steps = [
      "LOADING IMAGE DATA",
      "PATTERN RECOGNITION",
      "WOUND CLASSIFICATION",
      "POSTMORTEM ANALYSIS",
      "GENERATING REPORT"
    ];
    const currentStepIndex = Math.min(Math.floor(progress / 20), 4);

    return (
      <div style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.h2 
          animate={{ opacity: [1, 0.5, 1] }} 
          transition={{ duration: 1, repeat: Infinity }}
          className="font-bebas" style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '24px', textAlign: 'center' }}
        >
          ⬤ SCANNING EVIDENCE...
        </motion.h2>
        
        <div style={{ position: 'relative', width: '100%', height: '8px', backgroundColor: 'var(--border-dark)', marginBottom: '32px' }}>
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 0 10px var(--accent-secondary)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, idx) => (
            <div key={idx} className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: idx <= currentStepIndex ? 'var(--status-green)' : 'var(--text-primary)', opacity: idx <= currentStepIndex ? 1 : 0.4 }}>
              <div>{idx <= currentStepIndex ? '☑' : '☐'}</div>
              <div>{step}</div>
            </div>
          ))}
        </div>
        <div className="font-mono" style={{ textAlign: 'right', marginTop: '16px', fontSize: '24px', color: 'var(--accent-secondary)' }}>
          {Math.floor(progress)}%
        </div>
      </div>
    );
  }

  if (state === "analyzing") {
    return (
      <div style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ width: '80px', height: '80px', border: '4px solid transparent', borderTop: '4px solid var(--accent-primary)', borderBottom: '4px solid var(--accent-secondary)', borderRadius: '50%', marginBottom: '32px' }}
        />
        <h2 className="font-bebas" style={{ fontSize: '28px', color: 'var(--text-bright)', marginBottom: '16px' }}>◈ AI FORENSIC PATHOLOGY ENGINE ACTIVE</h2>
        <div className="font-mono" style={{ fontSize: '14px', marginBottom: '8px' }}>Consulting Forensic Medicine knowledge base...</div>
        <div className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-secondary)' }}>Classifying injury patterns · Determining manner of death</div>
      </div>
    );
  }

  return null;
}
