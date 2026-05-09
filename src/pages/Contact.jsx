export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl pb-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl mb-6">Contact Us</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Need help with a chit group, payment, auction, or account? Reach the MjChits support team for customer service, branch assistance, agent coordination, and business enquiries.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Support phone</h3>
            <p className="text-slate-600">+91 9999 000 111</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
            <p className="text-blue-600 hover:underline">mjchitspvltd@gmail.com</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Head office</h3>
            <p className="text-slate-600">Hyderabad, Telangana, India</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Service hours</h3>
            <p className="text-slate-600">Monday to Saturday, 10 AM to 6 PM</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send an enquiry</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
