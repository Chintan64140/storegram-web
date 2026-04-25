import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'DMCA / Copyright - StoreGram',
};

export default function DMCA() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '4rem 0' }}>
        <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>
            DMCA Policy
          </h1>
          
          <div className="card" style={{ padding: '2rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              StoreGram respects the intellectual property of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, we will respond expeditiously to claims of copyright infringement committed using the StoreGram service.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Filing a DMCA Notice</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through StoreGram by completing a DMCA Notice of Alleged Infringement.
            </p>
            
            <p style={{ marginBottom: '1.5rem' }}>
              Your notice must include the following information:
            </p>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li style={{ marginBottom: '0.5rem' }}>Identification of the copyrighted work claimed to have been infringed.</li>
              <li style={{ marginBottom: '0.5rem' }}>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, along with the exact URL(s).</li>
              <li style={{ marginBottom: '0.5rem' }}>Information reasonably sufficient to permit StoreGram to contact you, such as an address, telephone number, and an email address.</li>
              <li style={{ marginBottom: '0.5rem' }}>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              <li style={{ marginBottom: '0.5rem' }}>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            </ol>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Contact Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Please send your complete DMCA Notice to our designated Copyright Agent at:<br /><br />
              <strong>Email:</strong> dmca@storegram.com
            </p>
            
            <p style={{ fontSize: '0.875rem', marginTop: '2rem', fontStyle: 'italic' }}>
              Note: We reserve the right to terminate accounts of repeat infringers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
