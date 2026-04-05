"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ReportPanelProps {
  report: string;
}

export default function ReportPanel({ report }: ReportPanelProps) {
  const [displayedText, setDisplayedText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(report.slice(0, i));
      i+=2; // Type faster
      if (i > report.length) clearInterval(interval);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 15);
    return () => clearInterval(interval);
  }, [report]);

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="font-bebas" style={{ color: 'var(--accent-primary)', fontSize: '28px', marginTop: '16px', marginBottom: '8px', letterSpacing: '3px' }}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="font-bebas" style={{ color: 'var(--accent-secondary)', fontSize: '20px', marginTop: '12px', marginBottom: '6px' }}>{line.replace('### ', '')}</h3>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '4px', paddingLeft: '16px' }}>
          <span style={{ color: 'var(--accent-primary)' }}>▸</span>
          <span>{parseBold(line.replace(/^[-*]\s/, ''))}</span>
        </div>;
      }
      if (line.trim() === '') {
        return <div key={idx} style={{ height: '8px' }} />;
      }
      return <div key={idx} style={{ marginBottom: '8px' }}>{parseBold(line)}</div>;
    });
  };

  const parseBold = (text: string) => {
    // Regex to split by **...**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return <span key={i} style={{ color: '#fff', fontWeight: 'bold' }}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
      style={{
        backgroundColor: '#050508',
        border: '1px solid var(--border-light)',
        marginTop: '20px',
        position: 'relative',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.5)'
      }}
    >
      <div className="evidence-tape" />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-dark)', paddingBottom: '10px' }}>
          <h2 className="font-bebas" style={{ fontSize: '32px', color: 'var(--text-bright)', margin: 0 }}>FORENSIC ANALYSIS REPORT</h2>
          <div className="font-mono" style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '4px 12px', fontSize: '14px', fontWeight: 'bold' }}>
            CLASSIFIED
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          style={{ 
            maxHeight: '500px', 
            overflowY: 'auto', 
            paddingRight: '10px',
            fontFamily: 'var(--font-barlow)',
            fontSize: '18px',
            lineHeight: '1.6'
          }}
        >
          {renderFormattedText(displayedText)}
          {displayedText.length < report.length && (
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{ display: 'inline-block', width: '8px', height: '18px', backgroundColor: 'var(--accent-primary)', marginLeft: '4px', verticalAlign: 'middle' }}
            />
          )}
        </div>

        <div className="font-mono" style={{ gap: '10px', marginTop: '20px', borderTop: '1px solid var(--border-dark)', paddingTop: '10px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-primary)' }}>
          <span>SARVAM AI · FORENSIC ENGINE</span>
          <span style={{ color: 'var(--accent-secondary)' }}>⚠ EDUCATIONAL PURPOSES ONLY — NOT FOR USE IN ACTUAL FORENSIC INVESTIGATIONS</span>
        </div>
      </div>
    </motion.div>
  );
}
