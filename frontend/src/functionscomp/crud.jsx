import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // i18next hook'unu içe aktar
import { customStyles } from './dataTableStyles';
import './styles.css';

const Fetch = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [books, setBooks] = useState([]);
  const [patrons, setPatrons] = useState([]);
  const [patronMap, setPatronMap] = useState({});
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    overdue: ''
  });

  // Kitapları fetch etme
  useEffect(() => {
    fetch('http://localhost:8000/books')
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

  // Edit butonuna tıklandığında çalışacak fonksiyon
  const handleEdit = (row) => {
    setEditRow(row);
    setFormData({
      name: row.name,
      description: row.description,
      overdue: row.overdue
    });
  };

  // Delete butonuna tıklandığında çalışacak fonksiyon
  const handleDelete = (row) => {
    fetch(`http://localhost:8000/books/${row.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      setBooks(books.filter(book => book.id !== row.id));
    })
    .catch((error) => console.error("Error deleting book:", error));
  };

  // Form veri değişikliklerini işleyen fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Kaydet butonuna tıklandığında çalışacak fonksiyon
  const handleSave = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `http://localhost:8000/books/${editRow.id}`,
      data: {
        name: formData.name,
        description: formData.description,
        overdue: formData.overdue
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Server response:', response.data);
      setBooks(books.map(book => book.id === editRow.id ? response.data : book));
      setEditRow(null);
      setFormData({
        name: '',
        description: '',
        overdue: '',
      });
    })
    .catch(error => {
      const errorMessage = `An error occurred while updating the book with ID ${editRow.id}.\nError: ${error.response?.data || error.message}`;
      console.error(errorMessage);
      alert(t('fetch.error_occurred')); // Çeviri ekle
    });
  };

  // Tablo sütunları
  const columns = [
    {
      name: 'Book ID',
      selector: row => row.id,
      sortable: true
    },
    {
      name: t('fetch.name'), // Çeviri ekle
      selector: row => row.name,
      sortable: true
    },
    {
      name: t('fetch.description'), // Çeviri ekle
      selector: row => row.description,
      sortable: true
    },
    {
      name: t('fetch.overdue'), // Çeviri ekle
      selector: row => row.overdue,
      sortable: true
    },
    {
      name: t('fetch.owner'), // Çeviri ekle
      selector: row => patronMap[row.owner] || ' ',
      sortable: true
    },
    {
      name: ' ',
      cell: row => (
        <div style={{ display: 'flex', gap: '10px', color: '#028090' }}>
          <button className="crudButton" onClick={() => handleEdit(row)}>
            {t('fetch.edit')} {/* Çeviri ekle */}
          </button>
          <button className="crudButton" onClick={() => handleDelete(row)}>
            {t('fetch.delete')} {/* Çeviri ekle */}
          </button>
        </div>
      ),
      width: '200px',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div className="container">
      <label htmlFor="name" className="label">{t('fetch.list_all_books')}</label> {/* Çeviri ekle */}

      {/* Form alanları */}
      {editRow && (
        <div className="form-container">
          <form onSubmit={handleSave} className="form">
            <label htmlFor="name">
              {t('fetch.name')}:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('fetch.name')} // Çeviri ekle
                className="input"
                required
              />
            </label>
            <label htmlFor="description">
              {t('fetch.description')}:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('fetch.description')} // Çeviri ekle
                className="input"
                required
              />
            </label>
            <label htmlFor="overdue">
              {t('fetch.overdue')}:
              <input
                type="text"
                name="overdue"
                value={formData.overdue}
                onChange={handleInputChange}
                placeholder={t('fetch.overdue')} // Çeviri ekle
                className="input"
                required
              />
            </label>
            <button type="submit" className="button">
              {t('fetch.save')} {/* Çeviri ekle */}
            </button>
          </form>
        </div>
      )}

      {/* Tablo */}
      <div className="table-container">
        <div className="table-wrapper">
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
    </div>
  );
};

export default Fetch;
