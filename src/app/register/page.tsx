"use client";
import cn from "classnames";
import { SquarePen } from "lucide-react";
import { PageTitle } from "@/components/common";
import { RegisterForm } from "@/components/form";

export default function Register() {
  return (
    <div className={cn("lg:flex-1")}>
      <PageTitle title="Kayıt Ol" icon={SquarePen} />
      <RegisterForm />
    </div>
  );
}
