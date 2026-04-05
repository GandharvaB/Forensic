"use client";
import { motion } from "framer-motion";

export default function StatusBar() {
  return (
    <div className="font-mono" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px 0', borderBottom: '1px solid var(--border-dark)', fontSize: '12px', color: 'var(--status-cyan)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <motion.div 
          animate={{ opacity: [1, 0.4, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-green)', boxShadow: '0 0 8px var(--status-green)' }} 
        />
        SYSTEM STATUS: <span style={{ color: 'var(--text-bright)' }}>ONLINE</span>
      </div>
      <div>|</div>
      <div>ENGINE: <span style={{ color: 'var(--text-bright)' }}>SARVAM AI</span></div>
      <div>|</div>
      <div>KNOWLEDGE BASE: <span style={{ color: 'var(--text-bright)' }}>LOADED</span></div>
      <div>|</div>
      <div style={{ color: 'var(--accent-secondary)' }}>⚠ EDUCATIONAL USE ONLY</div>
    </div>
  );
}
