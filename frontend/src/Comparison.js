import { useState } from 'react';

function Comparison({ onBack }) {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState('');
  const [variants, setVariants] = useState(null);

  const handleProcess = async () => {
    setOutput('Processing...');
    setVariants(null);
    try {
      const response = await fetch('http://localhost:5000/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setVariants(data);
      setOutput('');
    } catch (err) {
      setOutput('Error processing request.');
    }
  };

  return (
    <>
      <h2>Comparison of Dilithium Varients</h2>
      <p className="comparison-desc">
        A comparison of different Dilithium variants highlighting the time taken for key generation, signing, and signature verification, along with their respective key and signature sizes.
      </p>
      <div className="input-row">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="comparison-input"
        />
        <button
          className="process-btn"
          onClick={handleProcess}
          disabled={!message.trim()}
        >
          Compare
        </button>
      </div>
      {output && (
        <div style={{ marginTop: '1rem', textAlign: 'left', color: 'red' }}>{output}</div>
      )}
      {variants && (
        <div className="comparison-output-row">
          {variants.map((variant, idx) => (
            <div className="comparison-output-col" key={variant.name}>
              <h3>{variant.name}</h3>
              <p><strong>Keygen Time:</strong> {variant.keygen_time.toFixed(6)}s</p>
              <p><strong>Public Key Size:</strong> {variant.pk_size} bytes</p>
              <p><strong>Private Key Size:</strong> {variant.sk_size} bytes</p>
              <p><strong>Signing Time:</strong> {variant.signing_time.toFixed(6)}s</p>
              <p><strong>Signature Size:</strong> {variant.sig_size} bytes</p>
              <p><strong>Verification Time:</strong> {variant.verification_time.toFixed(6)}s</p>
              {/* <p><strong>Verification:</strong> {variant.is_valid ? 'Valid' : 'Invalid'}</p> */}
            </div>
          ))}
        </div>
      )}
      <br />
      <button className="back-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
        &#8592; Back
      </button>
    </>
  );
}

export default Comparison;