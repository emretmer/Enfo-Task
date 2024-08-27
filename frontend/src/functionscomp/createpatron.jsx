import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // i18next hook'unu içe aktar
import './styles.css';

const CreatePatrons = () => {
  const { t } = useTranslation(); // useTranslation hook'unu kullan
  const [formData, setFormData] = useState({
    name: '',
    description: ''
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
    e.preventDefault(); // Formun varsayılan submit davranışını önler

    try {
      const response = await axios.post('http://localhost:8000/patrons/', {
        name: formData.name,
        description: formData.description
      });
      
      console.log('Patron created:', response.data);
      // Başarıyla ekleme işleminden sonra yapılacak işlemler
      setFormData({
        name: '',
        description: ''
      });
      
    } catch (error) {
      console.error('Error creating patron:', error);
      alert(t('createPatron.error_occurred')); // Çeviri ekle
    }
  };

  return (
    <div className="formWrapper"> {/* Formu ortalamak ve genişliğini ayarlamak için */}
      <label htmlFor="name" className="formTitle">{t('createPatron.create_patron')}</label> {/* Çeviri ekle */}
      <div className="formContainer">
        <form onSubmit={handleSave}>
          <div className="formGroup">
            <div className="inputContainer">
              <label htmlFor="name" className="formLabel">
                {t('createPatron.name')}:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('createPatron.name_placeholder')} 
                className="formInput"
                required
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="description" className="formLabel">
                {t('createPatron.description')}:
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('createPatron.description_placeholder')}
                className="formInput"
                required
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="formButton">
                {t('createPatron.save')} {/* Çeviri ekle */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatrons;
