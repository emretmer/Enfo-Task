import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={styles.switcher}>
      <button onClick={() => handleLanguageChange('tr')} style={styles.button}>
        <img src="/images/flags/tr.png" alt="Türkçe" style={styles.icon} />
      </button>
      <button onClick={() => handleLanguageChange('en')} style={styles.button}>
        <img src="/images/flags/en.png" alt="English" style={styles.icon} />
      </button>
      <button onClick={() => handleLanguageChange('fr')} style={styles.button}>
        <img src="/images/flags/fr.png" alt="French" style={styles.icon} />
      </button>
    </div>
  );
};

const styles = {
  switcher: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0px', // Dilerseniz diğer stilleri burada ayarlayabilirsiniz
  },
  button: {
    margin: '10px', // Butonlar arasında boşluk yok
    padding: '0', // Butonun iç paddingi yok
    backgroundColor: 'transparent', // Buton arka plan rengi yok
    border: 'none', // Buton kenarlıklarını kaldırma
    cursor: 'pointer', // Butona tıklanabilirlik işareti
    display: 'flex', // Bayrak ve buton konumlandırması için
  },
  icon: {
    width: '35px', // Bayrağın genişliği
    height: '20px', // Bayrağın yüksekliği
  },
};

export default LanguageSwitcher;
