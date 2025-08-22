import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addYears } from "@/utils/date";

export async function GET() {
  const data = await prisma.asn.findMany({
    orderBy: { updatedAt: "desc" }
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    nama,
    nomorPegawai,
    tmtPns,
    riwayatTmtKgb,
    riwayatTmtPangkat,
    jadwalKgbBerikutnya,
    jadwalPangkatBerikutnya
  } = body ?? {};

  if (!nama || !nomorPegawai) {
    return NextResponse.json({ error: "nama dan nomorPegawai wajib diisi" }, { status: 400 });
  }

  const computedKgb = jadwalKgbBerikutnya ?? addYears(riwayatTmtKgb, 2);
  const computedPangkat = jadwalPangkatBerikutnya ?? addYears(riwayatTmtPangkat, 4);

  try {
    const created = await prisma.asn.create({
      data: {
        nama,
        nomorPegawai,
        tmtPns: tmtPns ? new Date(tmtPns) : null,
        riwayatTmtKgb: riwayatTmtKgb ? new Date(riwayatTmtKgb) : null,
        riwayatTmtPangkat: riwayatTmtPangkat ? new Date(riwayatTmtPangkat) : null,
        jadwalKgbBerikutnya: computedKgb,
        jadwalPangkatBerikutnya: computedPangkat
      }
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Gagal membuat data" }, { status: 500 });
  }
}
