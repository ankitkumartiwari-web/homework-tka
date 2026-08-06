import { Button } from '../components/Button';
import { PageHeader } from '../components/PageHeader';

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Not found"
        title="This homework page does not exist"
        description="The route is generated from the homework data file, so check the subject, day, or homework slug."
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Button to="/">Back Home</Button>
      </section>
    </>
  );
}
