import { Link } from "react-router-dom";

export default function FormLogin() {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="example@email.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="*****"
          />
        </div>
        <Link to="/daftar" className="btn btn-primary w-100">
          Daftar
        </Link>
        {/* <button type="submit" className="btn btn-primary w-100">
          Submit
        </button> */}
        <p className="text-center mt-3">
          Tidak punya akun?{" "}
          <Link to="/daftar" className="text-primary">
            Daftar
          </Link>
        </p>
      </form>
    </>
  );
}
