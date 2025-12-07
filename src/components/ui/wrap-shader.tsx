// src/components/ui/wrap-shader.tsx
import React from "react";
import { Warp } from "@paper-design/shaders-react";

type Props = { children: React.ReactNode };

export default function WarpShaderBackground({ children }: Props) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh", // single key
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Warp
          style={{ width: "100%", height: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            "hsl(200, 100%, 20%)",
            "hsl(160, 100%, 75%)",
            "hsl(180, 90%, 30%)",
            "hsl(170, 100%, 80%)",
          ]}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100dvh", // single key
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: 16,
        }}
      >
        {children}
      </div>
    </main>
  );
}
