import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us - StoreGram',
};

export default function About() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '4rem 0' }}>
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>
            About StoreGram
          </h1>
          
          <div className="card" style={{ padding: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              StoreGram was founded with a simple mission: to empower creators by providing them with unlimited cloud storage and a transparent, fair way to monetize their content. We believe that if you create value and drive traffic, you should be rewarded for it.
            </p>
            
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Our Vision</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We envision a world where file sharing is not just a utility, but an ecosystem. StoreGram gives publishers the tools they need to upload massive files, share them seamlessly across the web (including Telegram and Discord), and earn revenue from every legitimate view or download.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Why Choose Us?</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li><strong>Unlimited Storage:</strong> Never worry about running out of space for your videos, files, and archives.</li>
              <li><strong>Live View Count:</strong> See exactly how your links are performing in real-time.</li>
              <li><strong>Fair Monetization:</strong> Get paid competitive CPM rates for your traffic, with low minimum payout thresholds.</li>
              <li><strong>Fast Delivery:</strong> Our global CDN ensures that your audience gets high-speed downloads and buffer-free video streaming.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
