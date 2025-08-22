"use client";
import { useEffect, useState } from "react";
import { toISODateInput, addYears } from "@/utils/date";

export type Asn = {
  id?: number;
  nama: string;
  nomorPegawai: string;
  tmtPns?: string | null;
  riwayatTmtKgb?: string | null;
  riwayatTmtPangkat?: string | null;
  jadwalKgbBerikutnya?: string | null;
  jadwalPangkatBerikutnya?: string | null;
};

export default function AsnForm({
  initial,
  onDone
}: { initial?: Partial<Asn>; onDone?: () => void }) {
  const [form, setForm] = useState<Asn>({
    id: initial?.id,
    nama: initial?.nama ?? "",
    nomorPegawai: initial?.nomorPegawai ?? "",
    tmtPns: initial?.tmtPns ? toISODateInput(initial.tmtPns) : "",
    riwayatTmtKgb: initial?.riwayatTmtKgb ? toISODateInput(initial.riwayatTmtKgb) : "",
    riwayatTmtPangkat: initial?.riwayatTmtPangkat ? toISODateInput(initial.riwayatTmtPangkat) : "",
    jadwalKgbBerikutnya: initial?.jadwalKgbBerikutnya ? toISODateInput(initial.jadwalKgbBerikutnya) : "",
    jadwalPangkatBerikutnya: initial?.jadwalPangkatBerikutnya ? toISODateInput(initial.jadwalPangkatBerikutnya) : ""
  });

  useEffect(() => {
    // Auto-compute schedules when riwayat fields change (2 yrs KGB, 4 yrs Pangkat)
    if (form.riwayatTmtKgb && !initial?.jadwalKgbBerikutnya) {
      const d = addYears(form.riwayatTmtKgb, 2);
      setForm((f) => ({ ...f, jadwalKgbBerikutnya: toISODateInput(d ?? undefined) }));
    }
    if (form.riwayatTmtPangkat && !initial?.jadwalPangkatBerikutnya) {
      const d = addYears(form.riwayatTmtPangkat, 4);
      setForm((f) => ({ ...f, jadwalPangkatBerikutnya: toISODateInput(d ?? undefined) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.riwayatTmtKgb, form.riwayatTmtPangkat]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tmtPns: form.tmtPns || null,
      riwayatTmtKgb: form.riwayatTmtKgb || null,
      riwayatTmtPangkat: form.riwayatTmtPangkat || null,
      jadwalKgbBerikutnya: form.jadwalKgbBerikutnya || null,
      jadwalPangkatBerikutnya: form.jadwalPangkatBerikutnya || null
    };
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/asn/${form.id}` : `/api/asn`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.error || "Gagal menyimpan data");
      return;
    }
    onDone?.();
  };

  const Field = ({ label, name, type="text" }:{label:string; name: keyof Asn; type?: string}) => (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-700">{label}</span>
      <input
        type={type}
        value={(form[name] as string) ?? ""}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full rounded-lg border px-3 py-2 outline-none ring-2 ring-transparent focus:ring-indigo-200"
      />
    </label>
  );

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nama" name="nama" />
        <Field label="Nomor Pegawai" name="nomorPegawai" />
        <Field label="TMT PNS" name="tmtPns" type="date" />
        <Field label="Riwayat TMT KGB" name="riwayatTmtKgb" type="date" />
        <Field label="Riwayat TMT Pangkat" name="riwayatTmtPangkat" type="date" />
        <Field label="Jadwal KGB Berikutnya" name="jadwalKgbBerikutnya" type="date" />
        <Field label="Jadwal Kenaikan Pangkat Berikutnya" name="jadwalPangkatBerikutnya" type="date" />
      </div>
      <div className="flex justify-end gap-2">
        <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Simpan</button>
      </div>
    </form>
  );
}
