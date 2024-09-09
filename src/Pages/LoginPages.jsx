import { useEffect } from "react";
import FormLogin from "../Components/Auth/Fragments/FormLogin";
import { Helmet } from "react-helmet-async";
import AuthLayout from "../Components/Auth/Layouts/AuthLayout";

export default function LoginPages() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-md-6 col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <AuthLayout judul="CISEA ENHANCEMENT">
                    <FormLogin />
                  </AuthLayout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
