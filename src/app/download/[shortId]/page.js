import Navbar from '@/components/Navbar';
import { Download, Eye, Clock, Shield } from 'lucide-react';

export default function DownloadPage({ params }) {
  // In a real app, you would fetch data using params.shortId
  const fileName = "Avengers_Endgame_1080p.mp4";
  const fileSize = "2.4 GB";
  const uploader = "PublisherBrand";

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '4rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container animate-fade-in" style={{ width: '100%', maxWidth: '800px' }}>
          
          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent-primary)' }}>
              <Download size={40} />
            </div>
            
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', wordBreak: 'break-all' }}>
              {fileName}
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Uploaded by <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{uploader}</span>
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <HardDrive size={18} /> {fileSize}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Clock size={18} /> Added 2 days ago
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                <Shield size={18} /> Scanned Safe
              </div>
            </div>

            <button className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem', width: '100%', maxWidth: '400px' }}>
              <Download size={24} /> Download File
            </button>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
              By downloading this file, you agree to our Terms of Service.
            </p>
          </div>

        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {uploader} via StoreGram.</p>
        </div>
      </footer>
    </div>
  );
}

// Dummy HardDrive icon since I forgot to import it in the top block
const HardDrive = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
)
