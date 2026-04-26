export const metadata = {
  title: 'Privacy Policy - StoreGram',
};

export default function Privacy() {
  return (
      <main style={{ flex: 1, padding: '4rem 0' }}>
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          
          <div className="card" style={{ padding: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Last Updated: April 25, 2026
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Your privacy is important to us. It is StoreGram&apos;s policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, and other sites we own and operate.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Log Data</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Personal Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              We may ask for personal information which may include one or more of the following:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Name</li>
              <li>Email</li>
              <li>Payment/Billing Information</li>
            </ul>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Security of Your Personal Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
            </p>
          </div>
        </div>
      </main>
  );
}
