import React from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const nav = [
  ["homepage", "Home", Home],
  ["tasks", "Tasks", ListChecks],
  ["property", "Property", LayoutDashboard],
  ["order", "Order", ShoppingCart],
  ["client comments", "Client Comments", MessageSquare],
  ["shipping", "Shipping", Upload],
  ["mailbox", "Mailbox", Inbox],
  ["sms", "SMS", MessageSquare],
  ["phone", "Phone", Phone],
  ["invoicing", "Invoicing", FileText],
  ["Docs", "Docs", FileText],
  ["events", "Events", Bell],
  ["files", "Files", FileText],
  ["finder", "Finder", Search],
  ["caller", "Caller", Phone],
  ["checker", "Checker", CircleHelp],
  ["bylaw", "Bylaw", FileText],
  ["status", "Status", SlidersHorizontal],
];

const rows = [
  { id: "PLT-10482", client: "Client User", origin: "Association Online", rush: "Standard", trial: "No", prepayment: "Yes", status: "In Progress" },
  { id: "PLT-10481", client: "Client User", origin: "HomeWiseDocs", rush: "Rush", trial: "No", prepayment: "Yes", status: "Waiting" },
  { id: "PLT-10480", client: "Client User", origin: "CondoCerts", rush: "Standard", trial: "Yes", prepayment: "No", status: "Complete" },
  { id: "PLT-10479", client: "Client User", origin: "GetDocsNow", rush: "Rush", trial: "No", prepayment: "Yes", status: "In Progress" },
  { id: "PLT-10478", client: "Client User", origin: "CiraNet", rush: "Standard", trial: "No", prepayment: "Yes", status: "Complete" },
];

function App() {
  const [page, setPage] = React.useState("homepage");
  const [query, setQuery] = React.useState("");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const filtered = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  return (
    <div className="app">
      <aside className={"sidebar " + (sidebarOpen ? "sidebar--open" : "")}>
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <strong>Rexera</strong>
            <span>Workflow</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="eyebrow">WORKSPACE</span>
          <nav>
            {nav.map(([key, label, Icon]) => (
              <button
                key={key}
                className={"nav-item " + (page === key ? "nav-item--active" : "")}
                onClick={() => {
                  setPage(key);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={17} strokeWidth={1.9} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="nav-item"><Settings size={17} /><span>Settings</span></button>
          <div className="profile">
            <div className="avatar">KP</div>
            <div className="profile-copy">
              <strong>Rexera User</strong>
              <span>Human-in-Loop</span>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="breadcrumb">
            <span>Rexera</span><span className="slash">/</span><strong>{nav.find((n) => n[0] === page)?.[1] ?? "Workflow"}</strong>
          </div>
          <div className="top-actions">
            <label className="search">
              <Search size={17} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
              <kbd>⌘K</kbd>
            </label>
            <button className="icon-button"><Bell size={18} /></button>
            <button className="avatar avatar-button">KP</button>
          </div>
        </header>

        <section className="content">
          {page === "homepage" ? (
            <>
              <div className="hero">
                <div>
                  <p className="eyebrow">REXERA WORKFLOW</p>
                  <h1>Order workflow</h1>
                  <p className="hero-copy">Track platform activity, client requests, and document work from one place.</p>
                </div>
                <div className="hero-actions">
                  <button className="secondary"><SlidersHorizontal size={16} /> Filters</button>
                  <button className="primary"><Sparkles size={16} /> New workflow</button>
                </div>
              </div>

              <div className="summary-grid">
                {[
                  ["Active Tasks", "18", "Across current workload"],
                  ["Waiting", "7", "Awaiting external response"],
                  ["Rush", "5", "Orders with rush handling"],
                  ["Completed", "42", "Recently finished"],
                ].map(([label, value, copy]) => (
                  <article className="metric" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{copy}</small>
                  </article>
                ))}
              </div>

              <section className="panel">
                <div className="panel-head">
                  <div>
                    <p className="eyebrow">ORDER QUEUE</p>
                    <h2>Current workflow</h2>
                  </div>
                  <div className="panel-tools">
                    {selected.length > 0 && (
                      <button className="secondary small">Mark Selected Tasks Complete ({selected.length})</button>
                    )}
                    <button className="icon-button"><MoreHorizontal size={18} /></button>
                  </div>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Platform ID</th>
                        <th>Client User</th>
                        <th>Origin</th>
                        <th>Rush</th>
                        <th>Trial</th>
                        <th>Prepayment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggle(row.id)} />
                          </td>
                          <td><strong>{row.id}</strong></td>
                          <td>{row.client}</td>
                          <td>{row.origin}</td>
                          <td><span className={"pill " + (row.rush === "Rush" ? "pill--warm" : "")}>{row.rush}</span></td>
                          <td>{row.trial}</td>
                          <td>{row.prepayment}</td>
                          <td><span className={"status status--" + row.status.toLowerCase().replaceAll(" ", "-")}>{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="panel-foot">
                  <span>{filtered.length} results</span>
                  <span>Mock/local data</span>
                </div>
              </section>
            </>
          ) : (
            <section className="placeholder">
              <div className="placeholder-icon"><LayoutDashboard size={22} /></div>
              <p className="eyebrow">REXERA WORKFLOW</p>
              <h1>{nav.find((n) => n[0] === page)?.[1]}</h1>
              <p>This page is scaffolded in the shared desktop shell. The original page information and table structure will be wired here next.</p>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
