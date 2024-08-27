import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import './styles.css';
import { customStyles } from './dataTableStyles';

const CheckedOutBooks = () => {
  const [books, setBooks] = useState([]);
  const [patrons, setPatrons] = useState([]);
  const [patronMap, setPatronMap] = useState({});

  const { t } = useTranslation(); // useTranslation hook'unu kullan

  useEffect(() => {
    fetch('http://localhost:8000/books/checkedout')
      .then((res) => res.json())
      .then((data) => {
        if (data.books && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error("Data does not contain a 'books' array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/patrons')
      .then((res) => res.json())
      .then((data) => {
        if (data.patrons && Array.isArray(data.patrons)) {
          setPatrons(data.patrons);
          const map = data.patrons.reduce((acc, patron) => {
            acc[patron.id] = patron.name;
            return acc;
          }, {});
          setPatronMap(map);
        } else {
          console.error("Data does not contain a 'patrons' array:", data);
        }
      })
      .catch((error) => console.error("Error fetching patron data:", error));
  }, []);

  const handleClearPatron = (bookId) => {
    fetch(`http://localhost:8000/books/returnbook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(updatedBook => {
      setBooks(books.map(book => book.id === bookId ? updatedBook : book));
    })
    .catch(error => console.error('Error updating book:', error));
    window.location.reload();
  };

  const columns = [
    {
      name: t('checkedoutbooks.book_id'), // Çeviri ekle
      selector: row => row.id,
      sortable: true
    },
    {
      name: t('checkedoutbooks.name'), // Çeviri ekle
      selector: row => row.name,
      sortable: true
    },
    {
      name: t('checkedoutbooks.description'), // Çeviri ekle
      selector: row => row.description,
      sortable: true
    },
    {
      name: t('checkedoutbooks.overdue'), // Çeviri ekle
      selector: row => row.overdue,
      sortable: true
    },
    {
      name: t('checkedoutbooks.owner'), // Çeviri ekle
      selector: row => row.owner ? patronMap[row.owner] : ' ',
      sortable: true
    },
    {
      name: t('checkedoutbooks.action'), // Çeviri ekle
      cell: row => (
        <button
          className="tableButton"
          onClick={() => handleClearPatron(row.id)}
        >
          {t('checkedoutbooks.clear_patron')} {/* Çeviri ekle */}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <label htmlFor="name" className="label">{t('checkedoutbooks.checked_out_books')}</label> {/* Çeviri ekle */}
      <DataTable
        columns={columns}
        data={books}
        fixedHeader
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default CheckedOutBooks;
