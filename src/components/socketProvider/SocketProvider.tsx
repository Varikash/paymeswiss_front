'use client';

import { useSocketIntegration } from "@/hooks/useSocketIntegration";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  useSocketIntegration();
  return <>{children}</>;
}