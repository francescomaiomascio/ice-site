import { Section } from "@/components/layout/Section";

export default function WritingPage() {
  return (
    <Section id="writing" className="section--writing" withFooter>
      <div className="preview-section">
        <header className="preview-header">
          <h1>Writing</h1>
        </header>
        <div className="preview-body">
          <p className="muted">Notes, essays, and governance thinking.</p>
        </div>
      </div>
    </Section>
  );
}
