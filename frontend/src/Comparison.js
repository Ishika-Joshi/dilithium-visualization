import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        <>
          <div className="comparison-output-row">
            {variants.map((variant, idx) => (
              <div className="comparison-output-col" key={variant.name}>
                <h3>{variant.name}</h3>
                <p><strong>Keygen Time:</strong> {variant.keygen_time.toFixed(6)}s</p>
                <p><strong>Keygen Cycles:</strong> {variant.keygen_cycles.toLocaleString()}</p>
                <p><strong>Public Key Size:</strong> {variant.pk_size} bytes</p>
                <p><strong>Private Key Size:</strong> {variant.sk_size} bytes</p>
                <p><strong>Signing Time:</strong> {variant.signing_time.toFixed(6)}s</p>
                <p><strong>Signing Cycles:</strong> {variant.signing_cycles.toLocaleString()}</p>
                <p><strong>Signature Size:</strong> {variant.sig_size} bytes</p>
                <p><strong>Verification Time:</strong> {variant.verification_time.toFixed(6)}s</p>
                <p><strong>Verification Cycles:</strong> {variant.verification_cycles.toLocaleString()}</p>
                <p><strong>Verification:</strong> {variant.is_valid ? 'Valid' : 'Invalid'}</p>
              </div>
            ))}
          </div>

          {/* Bar Graph for Time and Size Comparison */}
          <div
            style={{
              maxWidth: 1100,
              minWidth: 750,
              margin: '2.5rem auto',
              background: '#23272f',
              borderRadius: '10px',
              padding: '2.5rem'
            }}
          >
            <Bar
              data={{
                labels: variants.map(v => v.name),
                datasets: [
                  {
                    label: 'Keygen Time (s)',
                    data: variants.map(v => v.keygen_time),
                    backgroundColor: 'rgba(33, 150, 243, 0.7)',
                  },
                  {
                    label: 'Signing Time (s)',
                    data: variants.map(v => v.signing_time),
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                  },
                  {
                    label: 'Verification Time (s)',
                    data: variants.map(v => v.verification_time),
                    backgroundColor: 'rgba(255, 193, 7, 0.7)',
                  },
                  {
                    label: 'Public Key Size (bytes)',
                    data: variants.map(v => v.pk_size),
                    backgroundColor: 'rgba(244, 67, 54, 0.7)',
                    yAxisID: 'y1',
                  },
                  {
                    label: 'Private Key Size (bytes)',
                    data: variants.map(v => v.sk_size),
                    backgroundColor: 'rgba(156, 39, 176, 0.7)',
                    yAxisID: 'y1',
                  },
                  {
                    label: 'Signature Size (bytes)',
                    data: variants.map(v => v.sig_size),
                    backgroundColor: 'rgba(0, 188, 212, 0.7)',
                    yAxisID: 'y1',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Dilithium Variant Comparison (Time & Size)' },
                },
                scales: {
                  y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Time (seconds)' },
                    min: 0,
                    max: 1,
                    ticks: {
                      stepSize: 0.1,
                    },
                  },
                  y1: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Size (bytes)' },
                    min: 0,
                    max: 5000, // Adjust this max value to fit your data range
                    ticks: {
                      stepSize: 500,
                    },
                    grid: { drawOnChartArea: false },
                  },
                },
              }}
              height={520} // Increased height for better readability
            />
          </div>
        </>
      )}
      <br />
      <button className="back-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
        &#8592; Back
      </button>
    </>
  );
}

export default Comparison;