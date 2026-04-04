"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const [caseId, setCaseId] = useState("CS-000000");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setCaseId("CS-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
    setDateStr(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid var(--border-dark)', position: 'relative' }}
    >
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent-primary)', transformOrigin: 'left' }}
      />
      
      <div style={{ flex: 1, display: 'flex' }}>
        <div className="font-mono" style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '4px 10px', fontSize: '12px' }}>
          [CLASSIFIED — FORENSIC DIVISION]
        </div>
      </div>

      <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="font-bebas glitch-hover" style={{ margin: 0, fontSize: '48px', color: 'var(--text-bright)' }}>
          FORENSIC AI
        </h1>
        <div className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-secondary)' }}>
          // AUTOMATED MEDICO-LEGAL ANALYSIS SYSTEM v2.0
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <div className="font-mono" style={{ border: '1px solid var(--border-light)', padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
          CASE <span style={{ color: 'var(--accent-secondary)', marginLeft: '6px' }}>{caseId}</span>
        </div>
        <div className="font-mono" style={{ border: '1px solid var(--border-light)', padding: '4px 10px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
          {dateStr}
        </div>
        <div className="font-mono" style={{ border: '1px solid var(--accent-primary)', padding: '4px 10px', fontSize: '12px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center' }}>
          OPERATOR: AUTO
        </div>
      </div>
    </motion.header>
  );
}
