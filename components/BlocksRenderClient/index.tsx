"use client";
import Image from "next/image";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import "./style.css";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <div className="blocksRenderer">
      <BlocksRenderer
        content={content}
        blocks={{
          image: ({ image }) => {
            return (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || ""}
              />
            );
          },
        }}
      />
    </div>
  );
}