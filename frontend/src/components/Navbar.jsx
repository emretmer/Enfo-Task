import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'; // Dil değiştirici bileşenini içe aktar

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <Link to="/" style={styles.navbarLogo}>{t('navbar.logo')}</Link>
        <ul style={styles.navbarMenu}>
          <li><Link to="/create-book" style={styles.navbarLink}>{t('navbar.createBook')}</Link></li>
          <li><Link to="/create-patron" style={styles.navbarLink}>{t('navbar.createPatron')}</Link></li>
          <li><Link to="/" style={styles.navbarLink}>{t('navbar.listAllBooks')}</Link></li>
          <li><Link to="/patrons" style={styles.navbarLink}>{t('navbar.listPatrons')}</Link></li>
          <li><Link to="/overdued-books" style={styles.navbarLink}>{t('navbar.listOverduedBooks')}</Link></li>
          <li><Link to="/checkedout-books" style={styles.navbarLink}>{t('navbar.listCheckedOutBooks')}</Link></li>
          <li><Link to="/checkingout-books" style={styles.navbarLink}>{t('navbar.checkingOutBooks')}</Link></li>
        </ul>
        <LanguageSwitcher /> {/* Dil değiştirici bileşenini Navbar'ın yanına ekle */}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2f4f4f',
    color: 'white',
    padding: '5px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // alignItems yeniden 'center' yapıldı
    maxWidth: '80%',
    margin: '0 auto',
    padding: '0 20px',
    width: '100%',
  },
  navbarLogo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navbarMenu: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
  },
  navbarLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px', // Tüm yönlerde padding ayarlandı
    transition: 'color 0.3s ease',
  },
  navbarLinkHover: {
    textDecoration: 'underline',
  }
};

export default Navbar;
