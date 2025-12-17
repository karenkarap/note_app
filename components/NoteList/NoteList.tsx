import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

import Link from 'next/link';
import { deleteNote } from '@/lib/api/clientApi';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

interface NoteListProps {
  data: Note[];
}

function NoteList({ data }: NoteListProps) {
  const [deletingNote, setDeletingNote] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    setDeletingNote(id);
    mutate(id);
  };

  return (
    <ul className={css.list}>
      {data.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.details} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button onClick={() => handleDelete(note.id)} className={css.button}>
              {isPending && note.id === deletingNote ? (
                <BeatLoader size={10} color="white" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
