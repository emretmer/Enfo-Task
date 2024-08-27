import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';

const CreateBooks = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    overdue: ''
  });

  // Form veri değişikliklerini işleyen fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Kaydet butonuna tıklandığında çalışacak fonksiyon
  const handleSave = async (e) => {
    e.preventDefault(); // Formun varsayılan submit işlemini engelle

    try {
      const response = await fetch('http://localhost:8000/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          overdue: formData.overdue
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Book created:', data);

      // Formu temizle
      setFormData({
        name: '',
        description: '',
        overdue: ''
      });
      
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="formWrapper">
      <label htmlFor="name" className="formTitle">{t('createBook.create_a_book')}</label> {/* Çeviri ekle */}
      
      <div className="formContainer">
        <form onSubmit={handleSave}>
          <div className="formGroup">
            <div className="inputContainer">
              <label htmlFor="name" className="formLabel">{t('createBook.name')}:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('createBook.name_placeholder')}
                className="formInput"
                required
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="description" className="formLabel">{t('createBook.description')}:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('createBook.description_placeholder')}
                className="formInput"
                required
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="overdue" className="formLabel">{t('createBook.overdue')}:</label>
              <input
                type="text"
                name="overdue"
                value={formData.overdue}
                onChange={handleInputChange}
                placeholder={t('createBook.overdue_placeholder')}
                className="formInput"
                required
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="formButton">
                {t('createBook.save')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;