"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthPageClient from "@/app/components/ui/AuthPageClient";
import { getRequest } from "@/app/utils/api";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await getRequest("users");

        if (res?.status === 200) {
          router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkAuth();
  }, [router]);

  return <AuthPageClient />;
}
