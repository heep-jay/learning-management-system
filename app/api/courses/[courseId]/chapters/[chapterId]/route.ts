import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();
    const tokenId = process.env.MUX_TOKEN_ID!;
    const secretKey = process.env.MUX_TOKEN_SECRET!;
    const { video } = new Mux({ tokenId, tokenSecret: secretKey });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    // todo MUX VIDEO
    if (values.videoUrl) {
      const existinMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });
      if (existinMuxData) {
        await video.assets.delete(existinMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existinMuxData.id,
          },
        });
      }
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
