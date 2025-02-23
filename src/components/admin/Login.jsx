import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Github } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGithub, loading, error } = useAuth();

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      navigate("/admin/blog");
    } catch (err) {
      console.error("Failed to sign in with GitHub:", err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-neutral-100 mb-6">Admin Login</h2>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4">{error}</div>}

        <button onClick={handleGithubLogin} disabled={loading} className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded py-3 px-4 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          <Github size={20} />
          {loading ? "Signing in..." : "Sign in with GitHub"}
        </button>
      </div>
    </div>
  );
};

export default Login;
