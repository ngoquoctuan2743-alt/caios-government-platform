"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { sendMessage, type SendMessageResult } from "./actions";
import { initializeCase, type CaseSummary } from "./case-init";
import { CaseSummaryCard } from "./case-summary-card";
import { AiTurnMeta } from "./ai-turn-meta";

interface Message {
  id: string;
  role: "citizen" | "assistant";
  content: string;
  /** Only ever populated with fields `sendMessage` already returns -- see ai-turn-meta.tsx. */
  meta?: SendMessageResult;
}

export function ConversationView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "citizen", content: trimmed },
    ]);
    setInput("");
    setError(null);
    setIsThinking(true);

    try {
      let activeCase = caseSummary;
      if (!activeCase) {
        activeCase = await initializeCase(trimmed);
        setCaseSummary(activeCase);
      }

      const result = await sendMessage(activeCase.id, trimmed);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: result.content, meta: result },
      ]);
    } catch {
      setError("Something went wrong on our end. Please try again.");
    } finally {
      setIsThinking(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  }

  const showEmptyState = messages.length === 0 && !isThinking;

  return (
    <div className="flex h-[calc(100vh-13rem)] min-h-[26rem] flex-col">
      {caseSummary && <CaseSummaryCard summary={caseSummary} />}
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI assistant"
        className="flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-4"
      >
        {showEmptyState ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message}
                isGroupStart={index === 0 || messages[index - 1].role !== message.role}
              />
            ))}
            {isThinking && <TypingIndicator />}
          </div>
        )}
        <div ref={scrollAnchorRef} />
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={() => setError(null)}>
            Dismiss
          </Button>
        </div>
      )}

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isThinking}
          rows={1}
          placeholder="Describe what you need help with..."
          aria-label="Message"
          className="max-h-32 min-h-10 flex-1 resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <Button onClick={() => void handleSend()} disabled={isThinking || !input.trim()} data-icon="inline-end">
          Send
          <Send className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="size-6 text-primary" />
      </div>
      <p className="text-base font-medium">What do you need help with today?</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Tell me in your own words — for example, &quot;my ID card is expiring next month.&quot;
      </p>
    </div>
  );
}

function ChatBubble({ message, isGroupStart }: { message: Message; isGroupStart: boolean }) {
  const isCitizen = message.role === "citizen";
  return (
    <div className={cn("flex items-end gap-2", isCitizen ? "flex-row-reverse" : "flex-row", !isGroupStart && "mt-1")}>
      <div className="w-8 shrink-0 self-end">
        {isGroupStart && (
          <Avatar size="sm">
            <AvatarFallback className={isCitizen ? "bg-secondary" : "bg-primary/10"}>
              {isCitizen ? (
                <User className="size-3.5 text-secondary-foreground" />
              ) : (
                <Bot className="size-3.5 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className={cn("flex min-w-0 max-w-[75%] flex-col gap-1.5", isCitizen ? "items-end" : "items-start")}>
        <div
          className={cn(
            "whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed",
            isCitizen ? "bg-primary text-primary-foreground" : "bg-background ring-1 ring-foreground/10"
          )}
        >
          {message.content}
        </div>
        {message.meta && <AiTurnMeta meta={message.meta} />}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" aria-label="Assistant is thinking">
      <div className="w-8 shrink-0">
        <Avatar size="sm">
          <AvatarFallback className="bg-primary/10">
            <Bot className="size-3.5 animate-pulse text-primary" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-2 rounded-2xl bg-background px-4 py-3 ring-1 ring-foreground/10">
        <span className="text-xs text-muted-foreground">Thinking</span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
        </span>
      </div>
    </div>
  );
}
