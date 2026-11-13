"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, FileText, LayoutDashboard, PenLine, Plus, Send, Sparkles } from "lucide-react";

type Brand = "Little People" | "EPath";
type Status = "Bản nháp" | "Chờ duyệt" | "Đã duyệt" | "Đã lên lịch";

type Post = { id: number; title: string; brand: Brand; channel: string; status: Status; date: string };

const initialPosts: Post[] = [
  { id: 1, title: "ESL Vocabulary Activities", brand: "Little People", channel: "Facebook", status: "Chờ duyệt", date: "14/11/2026" },
  { id: 2, title: "Halloween at EPath", brand: "EPath", channel: "Facebook", status: "Đã duyệt", date: "15/11/2026" },
  { id: 3, title: "HighScope Monthly Showcase", brand: "Little People", channel: "Facebook", status: "Bản nháp", date: "Chưa lên lịch" },
];

export default function Home() {
  const [posts, setPosts] = useState(initialPosts);
  const [brand, setBrand] = useState<Brand>("Little People");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<Status>("Bản nháp");
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const counts = useMemo(() => ({
    total: posts.length,
    draft: posts.filter((p) => p.status === "Bản nháp").length,
    review: posts.filter((p) => p.status === "Chờ duyệt").length,
    scheduled: posts.filter((p) => p.status === "Đã lên lịch").length,
  }), [posts]);

  function saveDraft() {
    if (!title.trim() || !caption.trim()) return;
    setPosts((current) => [{ id: Date.now(), title: title.trim(), brand, channel: "Facebook", status, date: "Chưa lên lịch" }, ...current]);
    setTitle("");
    setCaption("");
    setStatus("Bản nháp");
    setActiveTab("Nội dung");
  }

  const navItems = [
    { label: "Tổng quan", icon: LayoutDashboard },
    { label: "Nội dung", icon: FileText },
    { label: "Lịch đăng", icon: CalendarDays },
    { label: "Duyệt bài", icon: CheckCircle2 },
  ];

  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-5 md:block">
          <div className="mb-10">
            <div className="text-xl font-bold tracking-tight text-slate-900">bluz<span className="text-indigo-600">.</span>studio</div>
            <div className="mt-1 text-xs text-slate-500">CONTENT MANAGEMENT</div>
          </div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace</div>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => setActiveTab(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${activeTab === label ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
                <Icon size={17} /> {label}
              </button>
            ))}
          </nav>
          <div className="mt-10 rounded-2xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} className="text-indigo-600" /> AI Writing</div>
            <p className="text-xs leading-5 text-slate-500">Trợ lý soạn nội dung theo từng thương hiệu sẽ được tích hợp ở bước tiếp theo.</p>
          </div>
          <div className="mt-8 text-xs text-slate-400">MVP • Version 0.1.0</div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">
            <div>
              <div className="text-sm text-slate-500">Workspace / {activeTab}</div>
              <h1 className="mt-1 text-xl font-bold text-slate-900">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 sm:inline">Bluz Workspace</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">B</div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl space-y-6 p-5 md:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Content overview</h2>
                <p className="mt-1 text-sm text-slate-500">Theo dõi nội dung và quy trình xuất bản của các fanpage.</p>
              </div>
              <button onClick={() => setActiveTab("Tạo bài viết")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><Plus size={16} /> Tạo bài viết</button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Tổng bài viết", value: counts.total, icon: FileText },
                { label: "Bản nháp", value: counts.draft, icon: PenLine },
                { label: "Chờ duyệt", value: counts.review, icon: Clock3 },
                { label: "Đã lên lịch", value: counts.scheduled, icon: CalendarDays },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-sm text-slate-500"><span>{label}</span><Icon size={18} /></div>
                  <div className="mt-3 text-3xl font-bold text-slate-900">{value}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div><h3 className="font-bold text-slate-900">Nội dung gần đây</h3><p className="mt-1 text-xs text-slate-500">Dữ liệu minh họa cho giao diện ban đầu</p></div>
                  <button onClick={() => setActiveTab("Nội dung")} className="text-sm font-semibold text-indigo-600">Xem tất cả</button>
                </div>
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center">
                      <div className="min-w-0"><div className="truncate text-sm font-semibold text-slate-800">{post.title}</div><div className="mt-1 text-xs text-slate-500">{post.brand} · {post.channel} · {post.date}</div></div>
                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${post.status === "Đã duyệt" ? "bg-emerald-50 text-emerald-700" : post.status === "Chờ duyệt" ? "bg-amber-50 text-amber-700" : post.status === "Đã lên lịch" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{post.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4"><h3 className="font-bold text-slate-900">Tạo nội dung nhanh</h3><p className="mt-1 text-xs text-slate-500">Tạo bản nháp để đưa vào quy trình duyệt.</p></div>
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-600">Thương hiệu</label>
                  <select value={brand} onChange={(e) => setBrand(e.target.value as Brand)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400">
                    <option>Little People</option><option>EPath</option>
                  </select>
                  <label className="block text-xs font-semibold text-slate-600">Tiêu đề nội bộ</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ví dụ: ESL Vocabulary Activities" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                  <label className="block text-xs font-semibold text-slate-600">Nội dung bài viết</label>
                  <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={5} placeholder="Nhập nội dung tiếng Việt hoặc tiếng Anh..." className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-400" />
                  <label className="block text-xs font-semibold text-slate-600">Trạng thái ban đầu</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400">
                    <option>Bản nháp</option><option>Chờ duyệt</option>
                  </select>
                  <button onClick={saveDraft} disabled={!title.trim() || !caption.trim()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"><Send size={15} /> Lưu nội dung</button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 p-5">
              <div className="flex items-start gap-3"><Sparkles size={19} className="mt-0.5 text-indigo-600" /><div><h3 className="text-sm font-bold text-slate-900">Các tích hợp sẽ triển khai tiếp theo</h3><p className="mt-1 text-sm leading-6 text-slate-600">Database để lưu nội dung lâu dài · AI hỗ trợ viết và dịch · Quy trình duyệt bài · Kết nối Metricool để xem fanpage và lên lịch xuất bản. Hiện tại nút lưu chỉ lưu dữ liệu trong phiên trình duyệt, chưa đăng Facebook.</p></div></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
