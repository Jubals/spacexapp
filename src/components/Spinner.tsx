export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '5rem' }}>
      <div className="spinner-border" role="status"  style={{ borderTopColor: '#3498db' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
