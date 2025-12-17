import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';
import Container from '@/components/Container/Container';

export const metadata: Metadata = {
  title: 'New note',
  description: 'Create new note',
  openGraph: {
    title: 'New note',
    description: 'Create new note',
    url: 'https://08-zustand-tau-eight.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notes application',
      },
    ],
  },
};

const page = () => {
  return (
    <main className={css.main}>
      <section className={css.section}>
        <Container>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </Container>
      </section>
    </main>
  );
};

export default page;
