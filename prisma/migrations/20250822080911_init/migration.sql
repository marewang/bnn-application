-- CreateTable
CREATE TABLE "Asn" (
  "id" SERIAL PRIMARY KEY,
  "nama" TEXT NOT NULL,
  "nomorPegawai" TEXT NOT NULL,
  "tmtPns" TIMESTAMP(3),
  "riwayatTmtKgb" TIMESTAMP(3),
  "riwayatTmtPangkat" TIMESTAMP(3),
  "jadwalKgbBerikutnya" TIMESTAMP(3),
  "jadwalPangkatBerikutnya" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Asn_nomorPegawai_key" ON "Asn"("nomorPegawai");
