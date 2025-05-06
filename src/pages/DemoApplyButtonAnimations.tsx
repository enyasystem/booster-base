import { Sparkles } from 'lucide-react';

const DemoApplyButtonAnimations = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400, margin: '2rem auto' }}>
    <button className="demo-apply-pulse bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Pulse
    </button>
    <button className="demo-apply-glow bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Glow/Shadow Fade
    </button>
    <button className="demo-apply-color-shift text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2" style={{ background: 'linear-gradient(90deg, #2563eb, #6366f1)' }}>
      <Sparkles /> Color Shift
    </button>
    <button className="demo-apply-slide-in bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Slide In/Pop In
    </button>
    <button className="demo-apply-wiggle bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Wiggle/Shake (hover me)
    </button>
    <button className="demo-apply-underline bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Underline Sweep (hover me)
    </button>
    <button className="demo-apply-icon-pulse bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
      <Sparkles /> Icon Pulse
    </button>
  </div>
);

export default DemoApplyButtonAnimations;
