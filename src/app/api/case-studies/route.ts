import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const industry = searchParams.get("industry");

    const where: Record<string, unknown> = {};

    // Public users only see published case studies
    const session = await getServerSession(authOptions);
    if (!session) {
      where.published = true;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (industry) {
      where.clientIndustry = { contains: industry };
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      clientIndustry,
      challenge,
      strategy,
      results,
      coverImage,
      metrics,
      featured,
      published,
    } = body;

    if (!title || !clientIndustry || !challenge || !strategy || !results) {
      return NextResponse.json(
        { error: "Title, industry, challenge, strategy, and results are required" },
        { status: 400 }
      );
    }

    const slug = customSlug || slugify(title);

    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A case study with this slug already exists" },
        { status: 409 }
      );
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientIndustry,
        challenge,
        strategy,
        results,
        coverImage: coverImage || null,
        metrics: metrics || null,
        featured: featured || false,
        published: published || false,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
