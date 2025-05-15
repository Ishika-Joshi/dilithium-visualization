function Process({ onBack }) {
  return (
    <>
      <h2>Process Page</h2>
      <p>Content for process goes here.</p>
      <button className="back-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
        &#8592; Back
      </button>
    </>
  );
}

export default Process;