import { Section } from "@/components/layout/Section";

export default function StatusPage() {
  return (
    <Section id="status" className="section--status" withFooter>
      <div className="preview-section">
        <header className="preview-header">
          <h1>Status</h1>
        </header>
        <div className="preview-body">
          <p className="muted">Operational status and signals are published here.</p>
        </div>
      </div>
    </Section>
  );
}
