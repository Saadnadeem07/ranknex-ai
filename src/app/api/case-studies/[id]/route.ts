import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const caseStudy = await prisma.caseStudy.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session && !caseStudy.published) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("Error fetching case study:", error);
    return NextResponse.json(
      { error: "Failed to fetch case study" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      clientIndustry,
      challenge,
      strategy,
      results,
      coverImage,
      metrics,
      featured,
      published,
    } = body;

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.caseStudy.findUnique({
        where: { slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "A case study with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(clientIndustry !== undefined && { clientIndustry }),
        ...(challenge !== undefined && { challenge }),
        ...(strategy !== undefined && { strategy }),
        ...(results !== undefined && { results }),
        ...(coverImage !== undefined && { coverImage }),
        ...(metrics !== undefined && { metrics }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
      },
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    await prisma.caseStudy.delete({ where: { id } });

    return NextResponse.json({ message: "Case study deleted successfully" });
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
