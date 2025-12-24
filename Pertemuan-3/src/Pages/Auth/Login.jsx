import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Pages/Layouts/Utils/Context/AuthContext";

import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";
import Link from "@/Pages/Layouts/Components/Link";

import {
  toastSuccess,
  toastError,
} from "@/Pages/Layouts/Utils/Helpers/ToastHelpers";
import { login } from "@/Pages/Layouts/Utils/Apis/AuthApi";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(form.email, form.password);
      setUser(result);
      toastSuccess("Login berhasil!");
    } catch (err) {
      toastError(err.message || "Email atau password salah!");
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>

          <Link href="#" className="text-sm">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link href="#">Daftar</Link>
      </p>

    </Card>
  );
};

export default Login;
