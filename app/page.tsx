"use client";
import { useState } from "react";
import Header from "../components/Header";
import Ticker from "../components/Ticker";
import StatusBar from "../components/StatusBar";
import EvidenceSubmission from "../components/EvidenceSubmission";
import AnalysisPanel from "../components/AnalysisPanel";
import ReportPanel from "../components/ReportPanel";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<"idle" | "scanning" | "analyzing" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<string | null>(null);

  const handleImageLoad = (base64: string) => {
    setImage(base64);
    setAnalysisState("idle");
    setReport(null);
    setProgress(0);
  };

  const handleClear = () => {
    setImage(null);
    setAnalysisState("idle");
    setReport(null);
    setProgress(0);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setAnalysisState("scanning");
    setReport(null);

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        startAnalysis();
      }
    }, 150);
  };

  const startAnalysis = async () => {
    setAnalysisState("analyzing");
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      
      const data = await res.json();
      
      if (data.report) {
        setReport(data.report);
      } else {
        setReport("## SYSTEM ERROR\nUnable to generate report: " + (data.error || "Unknown Error"));
      }
    } catch (err: any) {
      setReport("## SYSTEM ERROR\nAPI connection failed: " + err.message);
    } finally {
      setAnalysisState("complete");
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Ticker />
      <StatusBar />

      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '40px' }} className="main-grid">
          <EvidenceSubmission 
            image={image} 
            onImageLoad={handleImageLoad} 
            onClear={handleClear}
            onAnalyze={handleAnalyze}
            isProcessing={analysisState === "scanning" || analysisState === "analyzing"}
          />
          <AnalysisPanel 
            state={analysisState} 
            progress={progress} 
          />
        </div>

        {report && (
          <ReportPanel report={report} />
        )}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </main>
  );
}
