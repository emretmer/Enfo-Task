import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next'; // i18next hook'unu içe aktar
import { customStyles } from './dataTableStyles';
import './styles.css';

const OverduedBooks = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [books, setBooks] = useState([]);
  const [patrons, setPatrons] = useState([]);
  const [patronMap, setPatronMap] = useState({});

  // Kitapları fetch etme
  useEffect(() => {
    fetch('http://localhost:8000/books/overdued')
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

  // Patronları fetch etme
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

  // Tablo sütunları
  const columns = [
    {
      name: t('overdued_books.book_id'), // Çeviri ekle
      selector: row => row.id,
      sortable: true
    },
    {
      name: t('overdued_books.name'), // Çeviri ekle
      selector: row => row.name,
      sortable: true
    },
    {
      name: t('overdued_books.description'), // Çeviri ekle
      selector: row => row.description,
      sortable: true
    },
    {
      name: t('overdued_books.overdue'), // Çeviri ekle
      selector: row => row.overdue,
      sortable: true
    },
    {
      name: t('overdued_books.owner'), // Çeviri ekle
      selector: row => patronMap[row.owner] || t('overdued_books.unknown'), // Çeviri ekle
      sortable: true
    }
  ];

  return (
    <div className="container">
      <label htmlFor="name" className="label">{t('overdued_books.label')}</label> {/* Çeviri ekle */}
      <div className="table-container">
        <DataTable
          columns={columns}
          data={books}
          fixedHeader
          pagination
          defaultSortAsc={false}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default OverduedBooks;
