import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{ padding: '6rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,160,254,0.15) 0%, rgba(0,0,0,0) 70%)',
            zIndex: -1
          }}></div>

          <div className="container animate-fade-in">
            <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Secure File Sharing <br /> & Monetization Platform
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Upload your files, share them securely with passwords, and earn money for every view. Premium storage that pays you back.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/publisher" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Start Earning Now
              </Link>
              <Link href="/contact" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              <div className="card">
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  ☁️
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fast & Secure Storage</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Upload your files to our enterprise-grade cloud storage. Built on edge infrastructure for lightning fast uploads and downloads worldwide.
                </p>
              </div>

              <div className="card">
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  💰
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Monetize Every View</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Share your links and get paid for valid views. The more engaging your content is, the more you earn. Real-time tracking and payouts.
                </p>
              </div>

              <div className="card">
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  🔒
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Advanced Protection</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Password protect your links, organize files into folders, and securely revoke access at any time. You are always in control of your data.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} StoreGram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
