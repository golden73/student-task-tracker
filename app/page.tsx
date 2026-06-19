'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <main>
        <section className='hero'>
          <h1><span>Master Your Day</span> with Task Track</h1>
          <p>Elevate your professional workflow with a disciplined, high-performance task environment...</p>
          <div className='btn-group'>
            <button className='btn-primary' onClick={() => router.push('/dashboard')}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={() => setShowVideo(true)}>Watch Demo</button>
          </div>
        </section>

        <section className="features">
          <h2>Why Task Track?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Unified Dashboard</h3>
              <p>Monitor your progress at a glance with real-time stats.</p>
            </div>
            <div className="feature-card">
              <h3>Priority Focus</h3>
              <p>Categorize tasks by urgency to tackle what matters most.</p>
            </div>
            <div className="feature-card">
              <h3>Smart Tracking</h3>
              <p>Stay on top of your game with automated status updates.</p>
            </div>
          </div>
        </section>
        
        <section className='footer'>
          <p>Constantly Evolving.</p>
        </section>

        {showVideo && (
          <div className="modal-overlay" onClick={() => setShowVideo(false)}>
            <div className="modal-content">
              <video width="100%" controls autoPlay>
                <source src="./public/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </main>
    </>
  );
}