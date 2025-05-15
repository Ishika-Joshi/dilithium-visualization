import { useState } from 'react';

function Comparison({ onBack }) {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState('');

  // Placeholder for your processing logic
  const handleProcess = () => {
    // Replace this with your actual processing function
    const result = `Processed: ${message}`;
    setOutput(result);
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
        <div style={{ marginTop: '1rem' }}>
          <strong>Output:</strong> {output}
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