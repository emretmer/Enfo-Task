import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from './dataTableStyles';
import './styles.css';
import { useTranslation } from 'react-i18next'; // i18next hook'unu içe aktar

const CheckingOutBooks = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [books, setBooks] = useState([]);
  const [patrons, setPatrons] = useState([]);
  const [patronMap, setPatronMap] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedPatron, setSelectedPatron] = useState('');

  // Kitapları fetch etme
  useEffect(() => {
    fetchBooks();
  }, []);

  // Patronları fetch etme
  useEffect(() => {
    fetchPatrons();
  }, []);

  // Kitapları yeniden fetch etme
  const fetchBooks = () => {
    fetch('http://localhost:8000/books/')
      .then((res) => res.json())
      .then((data) => {
        if (data.books && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error("Data does not contain a 'books' array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Patronları yeniden fetch etme
  const fetchPatrons = () => {
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
  };

  // Seçilen kitapları güncelleme işlevi
  const handleAssignPatron = () => {
    selectedBooks.forEach(bookId => {
      fetch(`http://localhost:8000/books/checkoutbook/${bookId}/${selectedPatron}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(() => {
        // İşlemden sonra kitapları tekrar fetch et
        fetchBooks();
      })
      .catch(error => console.error('Error updating book:', error));
    });
    window.location.reload();
  };

  // Checkbox değişimini yönetme
  const handleCheckboxChange = (bookId) => {
    setSelectedBooks(prevSelectedBooks =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter(id => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  // Patron seçim değişimini yönetme
  const handlePatronChange = (event) => {
    setSelectedPatron(event.target.value);
  };

  // Tablo sütunları
  const columns = [
    {
      name: t('checkingOutBooks.select'), // Çeviri ekle
      cell: row => (
        <input
          type="checkbox"
          checked={selectedBooks.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '100px',
    },
    {
      name: t('checkingOutBooks.book_id'), // Çeviri ekle
      selector: row => row.id,
      sortable: true
    },
    {
      name: t('checkingOutBooks.name'), // Çeviri ekle
      selector: row => row.name,
      sortable: true
    },
    {
      name: t('checkingOutBooks.description'), // Çeviri ekle
      selector: row => row.description,
      sortable: true,
    },
    {
      name: t('checkingOutBooks.overdue'), // Çeviri ekle
      selector: row => row.overdue,
      sortable: true
    },
    {
      name: t('checkingOutBooks.owner'), // Çeviri ekle
      selector: row => patronMap[row.owner] || ' ',
      sortable: true
    }
  ];

  return (
    <div>
      <label htmlFor="name" className="label">{t('checkingOutBooks.check_out_books')}</label> {/* Çeviri ekle */}
      <div className="controlGroup">
        <select className="select" onChange={handlePatronChange} value={selectedPatron}>
          <option value="">{t('checkingOutBooks.select_owner')}</option> {/* Çeviri ekle */}
          {patrons.map(patron => (
            <option key={patron.id} value={patron.id}>
              {patron.name}
            </option>
          ))}
        </select>
        
        <button className="checkoutbutton" onClick={handleAssignPatron} disabled={!selectedPatron || selectedBooks.length === 0}>
          {t('checkingOutBooks.assign_owner')} {/* Çeviri ekle */}
        </button>
      </div>
      <DataTable
        columns={columns}
        data={books}
        fixedHeader
        pagination
        customStyles={customStyles} // Ortak stilleri buraya ekliyoruz
      />
    </div>
  );
};

export default CheckingOutBooks;
