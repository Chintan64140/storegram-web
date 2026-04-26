export const metadata = {
  title: 'Terms of Service - StoreGram',
};

export default function Terms() {
  return (
      <main style={{ flex: 1, padding: '4rem 0' }}>
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Terms of Service
          </h1>
          
          <div className="card" style={{ padding: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Last Updated: April 25, 2026
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Terms</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              By accessing the website at StoreGram, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Acceptable Use</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              StoreGram is a platform for creators to share legitimate files. You agree not to:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Upload malicious software, viruses, or disruptive code.</li>
              <li>Upload illegal content or content that violates intellectual property rights.</li>
              <li>Attempt to manipulate the view count or earnings system through bots, proxies, or artificial traffic generation.</li>
              <li>Use the service for any unlawful purpose.</li>
            </ul>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Publisher Earnings & Payments</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              StoreGram tracks valid views to calculate publisher earnings. We reserve the right to audit traffic and disqualify views that we determine to be fraudulent or artificial. Payouts are subject to a minimum threshold and can be requested via the publisher dashboard. StoreGram reserves the right to suspend accounts and withhold payments for terms violations.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Disclaimer</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              The materials on StoreGram&apos;s website are provided on an &apos;as is&apos; basis. StoreGram makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>
        </div>
      </main>
  );
}
