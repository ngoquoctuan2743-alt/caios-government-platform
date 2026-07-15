import { ConversationView } from "./conversation-view";

export default function NewCaseConversationPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Start a new case</h1>
        <p className="text-muted-foreground">
          Tell the assistant what you need, and it will guide you from there.
        </p>
      </div>
      <ConversationView />
    </div>
  );
}
