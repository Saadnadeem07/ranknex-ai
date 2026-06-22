import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCloudinary, CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cloudinary = getCloudinary();
    if (!cloudinary) {
      return NextResponse.json(
        { error: "Media uploads are not configured (missing CLOUDINARY_* env vars)." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG, AVIF, MP4, WebM, MOV." },
        { status: 400 }
      );
    }

    const isVideo = file.type.startsWith("video/");
    // NOTE: Vercel serverless functions cap request bodies at ~4.5MB. For large
    // media (especially video), a client-side direct upload to Cloudinary (an
    // unsigned upload preset) should be used instead of this passthrough route.
    const maxSize = (isVideo ? 50 : 8) * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${isVideo ? 50 : 8}MB limit` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: CLOUDINARY_FOLDER, resource_type: "auto" },
          (error, res) => {
            if (error || !res) reject(error || new Error("No response"));
            else resolve(res);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(
      { url: result.secure_url, path: result.public_id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
