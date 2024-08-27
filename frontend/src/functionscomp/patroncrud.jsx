import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next'; // i18next hook'unu içe aktar
import { customStyles } from './dataTableStyles';
import './styles.css';

const Patrons = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [patrons, setPatrons] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '-' // Varsayılan değer olarak "-" ekleniyor
  });

  // Patronları fetch etme
  useEffect(() => {
    fetch('http://localhost:8000/patrons')
      .then((res) => res.json())
      .then((data) => {
        if (data.patrons && Array.isArray(data.patrons)) {
          setPatrons(data.patrons);
        } else {
          console.error("Data does not contain a 'patrons' array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Tablo sütunları
  const columns = [
    {
      name: t('patrons.patron_id'), // Çeviri ekle
      selector: row => row.id,
      sortable: true
    },
    {
      name: t('patrons.name'), // Çeviri ekle
      selector: row => row.name,
      sortable: true
    },
    {
      name: t('patrons.surname'), // Çeviri ekle
      selector: row => row.description || '-', // Varsayılan değer olarak "-" ekleniyor
      sortable: true
    },
    {
      name: ' ',
      cell: row => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="crudButton" onClick={() => handleEdit(row)}>{t('patrons.edit')}</button> {/* Çeviri ekle */}
          <button className="crudButton" onClick={() => handleDelete(row)}>{t('patrons.delete')}</button> {/* Çeviri ekle */}
        </div>
      ),
      width: '200px',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  // Edit butonuna tıklandığında çalışacak fonksiyon
  const handleEdit = (row) => {
    setEditRow(row);
    setFormData({
      name: row.name,
      description: row.description || '-' // Varsayılan değeri ayarla
    });
  };

  // Delete butonuna tıklandığında çalışacak fonksiyon
  const handleDelete = (row) => {
    fetch(`http://localhost:8000/patrons/${row.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      setPatrons(patrons.filter(patron => patron.id !== row.id));
    })
    .catch((error) => console.error("Error deleting patron:", error));
  };

  // Form veri değişikliklerini işleyen fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Kaydet butonuna tıklandığında çalışacak fonksiyon
  const handleSave = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/patrons/${editRow.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description
      }),
    })
    .then(response => response.json())
    .then(data => {
      setPatrons(patrons.map(patron => patron.id === editRow.id ? data : patron));
      setEditRow(null);
      setFormData({
        name: '',
        description: '-' // Varsayılan değeri sıfırla
      });
    })
    .catch(error => {
      console.error('Error updating patron:', error);
      alert(t('patrons.error_update')); // Çeviri ekle
    });
  };

  return (
    <div className="container">
      <label htmlFor="name" className="label">{t('patrons.list_label')}</label> {/* Çeviri ekle */}
      {/* Form alanları */}
      {editRow && (
        <div className="form-container">
          <form onSubmit={handleSave} className="form">
            <label htmlFor="name">{t('patrons.name_label')}:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('patrons.name_placeholder')} // Çeviri ekle
                className="input"
                required
              />
            </label>
            <label htmlFor="description">{t('patrons.surname_label')}:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('patrons.surname_placeholder')} // Çeviri ekle
                className="input"
                required
              />
            </label>
            <button type="submit" className="button">
              {t('patrons.save')} {/* Çeviri ekle */}
            </button>
          </form>
        </div>
      )}
      <div className="table-container">
        <DataTable
          columns={columns}
          data={patrons}
          fixedHeader
          pagination
          defaultSortAsc={false}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default Patrons;
