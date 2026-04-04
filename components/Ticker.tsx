"use client";
import { motion } from "framer-motion";

export default function Ticker() {
  return (
    <div style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', overflow: 'hidden', padding: '8px 0', borderBottom: '1px solid #7a081a' }}>
      <motion.div
        className="font-bebas"
        style={{ display: 'flex', whiteSpace: 'nowrap', fontSize: '20px', letterSpacing: '4px' }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        <span>
          ◆ FORENSIC ANALYSIS SYSTEM ONLINE ◆ ASPHYXIA · FIREARM INJURIES · BLUNT FORCE · SHARP FORCE · THERMAL · POISONING · NATURAL DISEASE ◆ AI-POWERED MEDICO-LEGAL CLASSIFICATION ◆ EDUCATIONAL USE ONLY ◆ &nbsp;
        </span>
        <span>
          ◆ FORENSIC ANALYSIS SYSTEM ONLINE ◆ ASPHYXIA · FIREARM INJURIES · BLUNT FORCE · SHARP FORCE · THERMAL · POISONING · NATURAL DISEASE ◆ AI-POWERED MEDICO-LEGAL CLASSIFICATION ◆ EDUCATIONAL USE ONLY ◆
        </span>
      </motion.div>
    </div>
  );
}
