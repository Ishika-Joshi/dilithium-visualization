import React, { useState } from 'react';

const variants = ["Dilithium2", "Dilithium3", "Dilithium5"];

function Process({ onBack }) {
  const [variant, setVariant] = useState(variants[0]);
  const [keys, setKeys] = useState(null);
  const [keygenInfo, setKeygenInfo] = useState(null);

  const [signMsg, setSignMsg] = useState('');
  const [signSk, setSignSk] = useState('');
  const [signature, setSignature] = useState('');
  const [signInfo, setSignInfo] = useState(null);

  const [verifyMsg, setVerifyMsg] = useState('');
  const [verifySig, setVerifySig] = useState('');
  const [verifyPk, setVerifyPk] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  // Key Generation
  const handleGenerate = async () => {
    const res = await fetch('http://localhost:5000/api/process/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant }),
    });
    const data = await res.json();
    setKeys(data);
    setKeygenInfo(data);
    setSignSk(data.private_key);
    setVerifyPk(data.public_key);
  };

  // Signing
  const handleSign = async () => {
    const res = await fetch('http://localhost:5000/api/process/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant, message: signMsg, private_key: signSk }),
    });
    const data = await res.json();
    setSignature(data.signature);
    setSignInfo(data);
    setVerifySig(data.signature);
    setVerifyMsg(signMsg);
  };

  // Verification
  const handleVerify = async () => {
    const res = await fetch('http://localhost:5000/api/process/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant,
        message: verifyMsg,
        signature: verifySig,
        public_key: verifyPk
      }),
    });
    const data = await res.json();
    setVerifyResult(data);
  };

  return (
    <div className="process-container">
      <h2>Dilithium Step-by-Step Process</h2>

      {/* Step 1: Variant Selection & Key Generation */}
      <div className="process-section">
        <label>
          Select Dilithium Variant:
          <select value={variant} onChange={e => setVariant(e.target.value)}>
            {variants.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <button onClick={handleGenerate}>Generate Keys</button>
        {keys && (
          <div className="key-output-row">
            <div>
              <label>Public Key:</label>
              <textarea value={keys.public_key} readOnly rows={3} />
              <div>Size: {keygenInfo.pk_size} bytes</div>
            </div>
            <div>
              <label>Private Key:</label>
              <textarea value={keys.private_key} readOnly rows={3} />
              <div>Size: {keygenInfo.sk_size} bytes</div>
            </div>
            <div>
              <div>Keygen Time: {keygenInfo.keygen_time.toFixed(6)}s</div>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Signing */}
      <div className="process-section">
        <label>Message to Sign:</label>
        <input value={signMsg} onChange={e => setSignMsg(e.target.value)} />
        <label>Private Key:</label>
        <textarea value={signSk} onChange={e => setSignSk(e.target.value)} rows={3} />
        <button onClick={handleSign} disabled={!signMsg || !signSk}>Sign</button>
        {signature && (
          <div>
            <label>Signature:</label>
            <textarea value={signature} readOnly rows={3} />
            <div>Signing Time: {signInfo.signing_time.toFixed(6)}s</div>
            <div>Signature Size: {signInfo.sig_size} bytes</div>
          </div>
        )}
      </div>

      {/* Step 3: Verification */}
      <div className="process-section">
        <label>Message to Verify:</label>
        <input value={verifyMsg} onChange={e => setVerifyMsg(e.target.value)} />
        <label>Signature:</label>
        <textarea value={verifySig} onChange={e => setVerifySig(e.target.value)} rows={3} />
        <label>Public Key:</label>
        <textarea value={verifyPk} onChange={e => setVerifyPk(e.target.value)} rows={3} />
        <button onClick={handleVerify} disabled={!verifyMsg || !verifySig || !verifyPk}>Verify</button>
        {verifyResult && (
          <div>
            <div>
              Verification: <strong style={{color: verifyResult.is_valid ? 'limegreen' : 'red'}}>
                {verifyResult.is_valid ? 'Valid' : 'Invalid'}
              </strong>
            </div>
            <div>Verification Time: {verifyResult.verification_time.toFixed(6)}s</div>
          </div>
        )}
      </div>

       <button className="back-btn" onClick={onBack}>&#8592; Back</button>
       
    </div>
  );
}

export default Process;