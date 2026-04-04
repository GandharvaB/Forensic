"use client";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

interface EvidenceSubmissionProps {
  image: string | null;
  onImageLoad: (base64: string) => void;
  onClear: () => void;
  onAnalyze: () => void;
  isProcessing: boolean;
}

export default function EvidenceSubmission({ image, onImageLoad, onClear, onAnalyze, isProcessing }: EvidenceSubmissionProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageLoad(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [isProcessing, onImageLoad]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', borderTop: '2px solid var(--accent-primary)', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="font-bebas" style={{ fontSize: '28px', color: 'var(--text-bright)', marginBottom: '16px' }}>EVIDENCE SUBMISSION</h2>
      
      {!image ? (
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          style={{ 
            flex: 1, 
            border: isDragOver ? '2px solid var(--accent-primary)' : '2px dashed var(--accent-primary)',
            boxShadow: isDragOver ? '0 0 15px rgba(200, 16, 46, 0.5)' : 'none',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: isDragOver ? 'rgba(200, 16, 46, 0.05)' : 'transparent',
            minHeight: '300px'
          }}
          onClick={() => {
            if (!isProcessing) {
              document.getElementById('file-upload')?.click();
            }
          }}
        >
          <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFile(e.target.files[0]);
            }
          }} />
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔬</div>
          <div className="font-mono" style={{ fontSize: '14px', marginBottom: '8px' }}>DRAG & DROP SPECIMEN HERE</div>
          <button className="font-bebas" disabled={isProcessing} style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: '18px', letterSpacing: '2px' }}>
            ATTACH SPECIMEN
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '300px' }}
        >
          {/* Image Container with Corner brackets */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', border: '1px solid var(--border-dark)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, borderTop: '2px solid var(--accent-primary)', borderLeft: '2px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderTop: '2px solid var(--accent-primary)', borderRight: '2px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 20, height: 20, borderBottom: '2px solid var(--accent-primary)', borderLeft: '2px solid var(--accent-primary)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 20, height: 20, borderBottom: '2px solid var(--accent-primary)', borderRight: '2px solid var(--accent-primary)', zIndex: 10 }} />
            
            <img src={image} alt="Evidence Uploaded" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', zIndex: 5 }} />

            <div className="font-mono" style={{ position: 'absolute', top: 10, right: -10, backgroundColor: 'var(--accent-secondary)', color: '#000', padding: '2px 8px', transform: 'rotate(15deg)', fontSize: '10px', fontWeight: 'bold', boxShadow: '2px 2px 5px rgba(0,0,0,0.5)', zIndex: 20 }}>
              EVIDENCE
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button 
              className="font-bebas" 
              onClick={onAnalyze}
              disabled={isProcessing}
              style={{ flex: 1, padding: '12px', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: '20px', letterSpacing: '2px', position: 'relative', overflow: 'hidden' }}
            >
              {isProcessing ? 'PROCESSING...' : 'ANALYZE'}
            </button>
            <button 
              className="font-mono" 
              onClick={onClear}
              disabled={isProcessing}
              style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', cursor: isProcessing ? 'not-allowed' : 'pointer' }}
            >
              CLEAR
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
