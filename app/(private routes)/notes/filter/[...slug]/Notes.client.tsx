'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesClient.module.css';
import Link from 'next/link';
import { fetchNotes, NoteHttpResponse } from '@/lib/api/clientApi';

interface NotesClientProps {
  tag: string | undefined;
}

export const NotesClient = ({ tag }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [noteQuery, setNoteQuery] = useState('');

  const { data, isLoading, isSuccess, isError } = useQuery<NoteHttpResponse>({
    queryKey: ['notes', currentPage, noteQuery, tag],
    queryFn: () => fetchNotes(currentPage, noteQuery, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Ooops... Something went wrong');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [data, isSuccess]);

  const handleSearchQueryChange = useDebouncedCallback((query: string) => {
    setNoteQuery(query);
    setCurrentPage(1);
  }, 300);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <Link href={'/notes/action/create'} className={css.button}>
          Create note
        </Link>

        <SearchBox setNoteQuery={handleSearchQueryChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {isLoading && <BeatLoader color="#0d6efd" size={20} />}

      {data && data.notes.length > 0 && <NoteList data={data.notes} />}
      <Toaster />
    </div>
  );
};
