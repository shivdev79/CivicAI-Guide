import GuideWizard from '../components/GuideWizard';

export default function Guide() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Personalized Guide</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Tell us about yourself and we will instantly generate a tailored roadmap of the election process just for you.
        </p>
      </div>

      <GuideWizard />
    </div>
  );
}
