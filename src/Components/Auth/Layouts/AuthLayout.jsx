export default function AuthLayout(props) {
  const { children, judul } = props;
  return (
    <div className="d-flex align-items-center justify-content-center bg-light">
      <div className="w-100" style={{ maxWidth: '24rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)' }}>
        <div className="p-4">
          <h1 className="h4 font-weight-bold text-center text-dark">
            {judul}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
