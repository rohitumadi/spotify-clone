import AccountContent from "@/components/AccountContent";
import Header from "@/components/Header";

export default function Account() {
  return (
    <div className="bg-neutral-900 overflow-auto overflow-y-auto rounded-lg h-full w-full">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Account</h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
}
