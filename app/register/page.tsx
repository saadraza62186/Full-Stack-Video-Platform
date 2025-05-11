import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json();
        if (!res.ok){
            setError("Registation Failed");
        }

        router.push("/login");

    } catch (error) {
        setError("Registration Failed");
    }


  };

  return <div></div>;
};

export default Register;
