export default function Services() {
  const services = [
    {
      title: "Chit group enrollment",
      description: "Customers can join available chit groups based on value, installment amount, tenure, and eligibility.",
    },
    {
      title: "KYC assistance",
      description: "Aadhaar, PAN, address, and member information can be collected and verified through structured workflows.",
    },
    {
      title: "Payment collection",
      description: "Online and field collection records help members receive receipts and track outstanding balances.",
    },
    {
      title: "Auction participation",
      description: "Auction schedules, bidding activity, winners, and dividend calculations are organized for easier tracking.",
    },
    {
      title: "Receipts and statements",
      description: "Members and agents can access payment references, collection records, and status updates when needed.",
    },
    {
      title: "Notifications",
      description: "Payment reminders, group updates, auction alerts, and support messages keep users informed.",
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-16 pb-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl mb-6">
          Chit fund services designed for clarity at every step.
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          From customer onboarding to auction records and receipts, MjChits supports the full lifecycle of a chit group.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <div key={svc.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{svc.title}</h3>
            <p className="text-slate-600 leading-relaxed">{svc.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-blue-50 rounded-2xl p-10 border border-blue-100 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">A connected operating model.</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          Customers get visibility, agents get collection tools, and admins get controls for chits, auctions, payments, reports, and support activity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-white px-4 py-2 rounded-full text-blue-800 font-medium border border-blue-200">Customer app access</span>
          <span className="bg-white px-4 py-2 rounded-full text-blue-800 font-medium border border-blue-200">Agent collection flow</span>
          <span className="bg-white px-4 py-2 rounded-full text-blue-800 font-medium border border-blue-200">Admin monitoring</span>
          <span className="bg-white px-4 py-2 rounded-full text-blue-800 font-medium border border-blue-200">Branch support desk</span>
        </div>
      </section>
    </div>
  );
}
