import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
    </svg>
  );
}

export default function Community() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentName, setCurrentName] = useState("User");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUser(user);
      const { data: profile } = await supabase
        .from("profiles").select("name").eq("id", user.id).maybeSingle();
      setCurrentName(profile?.name || user.user_metadata?.name || user.email?.split("@")[0] || "User");
    }
    loadUser();
  }, []);

  useEffect(() => {
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100)
      .then(({ data, error }) => {
        if (error) { toast.error("Failed to load messages."); return; }
        setMessages(data || []);
      });
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("community-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        setMessages((prev) => {
          if (prev.find((m) => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages" }, (payload) => {
        setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !currentUser) return;
    setSending(true);
    setInput("");
    const { error } = await supabase.from("messages").insert({
      user_id: currentUser.id,
      sender_name: currentName,
      body: trimmed,
    });
    if (error) { toast.error("Failed to send."); setInput(trimmed); }
    setSending(false);
    inputRef.current?.focus();
  }

  async function handleUnsend(messageId) {
    // Optimistically remove from UI immediately
    setMessages((prev) => prev.filter((m) => m.id !== messageId));

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId)
      .eq("user_id", currentUser.id);

    if (error) {
      console.error("Unsend error:", error);
      toast.error(`Could not unsend: ${error.message}`);
      // Refetch to restore correct state
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(100);
      if (data) setMessages(data);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(e); }
  }

  // Group messages by date
  const grouped = messages.reduce((acc, msg) => {
    const label = formatDate(msg.created_at);
    if (!acc[label]) acc[label] = [];
    acc[label].push(msg);
    return acc;
  }, {});

  const initials = (name) => name?.[0]?.toUpperCase() || "U";

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 dark:backdrop-blur-md shadow-sm dark:shadow-none">

      {/* ── Header ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-neutral-800/70 px-5 py-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-md font-semibold leading-none text-slate-900 dark:text-white">Community Chat</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          Live
        </span>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
        {Object.keys(grouped).length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400 dark:text-neutral-600">No messages yet. Say hello 👋</p>
          </div>
        )}

        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            {/* Date divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-neutral-800" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-600">{date}</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-neutral-800" />
            </div>

            <div className="space-y-0.5">
              {msgs.map((msg, i) => {
                const isOwn = msg.user_id === currentUser?.id;
                const prevMsg = msgs[i - 1];
                const nextMsg = msgs[i + 1];
                const isSameSenderAsPrev = prevMsg?.user_id === msg.user_id;
                const isSameSenderAsNext = nextMsg?.user_id === msg.user_id;
                const isGroupStart = !isSameSenderAsPrev;
                const isGroupEnd = !isSameSenderAsNext;

                // Rounding: vary corners based on position in group
                const ownRadius = `rounded-2xl ${isGroupStart ? "" : "rounded-tr-md"} ${isGroupEnd ? "" : "rounded-br-md"}`;
                const otherRadius = `rounded-2xl ${isGroupStart ? "" : "rounded-tl-md"} ${isGroupEnd ? "" : "rounded-bl-md"}`;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"} ${isGroupStart ? "mt-4" : "mt-0.5"}`}
                  >
                    {/* Avatar */}
                    <div className="w-7 shrink-0">
                      {isGroupEnd && !isOwn && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 dark:bg-neutral-700 text-[10px] font-semibold text-slate-600 dark:text-neutral-300">
                          {initials(msg.sender_name)}
                        </div>
                      )}
                    </div>

                    {/* Bubble + meta */}
                    <div className={`flex max-w-sm flex-col gap-0.5 ${isOwn ? "items-end" : "items-start"}`}>
                      {isGroupStart && !isOwn && (
                        <span className="pl-1 text-[11px] font-medium text-slate-500 dark:text-neutral-400">{msg.sender_name}</span>
                      )}

                      <div className="group flex items-end gap-1.5">
                        {/* Unsend button + timestamp — own messages */}
                        {isOwn && (
                          <div className="mb-0.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleUnsend(msg.id)}
                              title="Unsend"
                              className="rounded-md p-0.5 text-slate-400 dark:text-neutral-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <span className="text-[10px] text-slate-400 dark:text-neutral-600">
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                        )}

                        <div
                          className={`px-3 py-1.5 text-[13.5px] leading-snug break-words ${
                            isOwn
                              ? `bg-blue-600 text-white ${ownRadius}`
                              : `bg-slate-100 dark:bg-neutral-800/90 text-slate-800 dark:text-neutral-100 ${otherRadius}`
                          }`}
                        >
                          {msg.body}
                        </div>

                        {/* Timestamp on other side */}
                        {!isOwn && isGroupEnd && (
                          <span className="mb-0.5 text-[10px] text-slate-400 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            {formatTime(msg.created_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="shrink-0 border-t border-slate-200 dark:border-neutral-800/70 px-4 py-3">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 dark:border-neutral-700/60 bg-slate-100 dark:bg-neutral-800/60 px-3.5 py-2 transition-all focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message the community..."
              className="flex-1 bg-transparent text-[13.5px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 outline-none"
              autoComplete="off"
              maxLength={500}
            />
            {input.length > 420 && (
              <span className="shrink-0 text-[10px] text-slate-400 dark:text-neutral-600">{500 - input.length}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <SendIcon />
          </button>
        </form>
      </div>

    </div>
  );
}
