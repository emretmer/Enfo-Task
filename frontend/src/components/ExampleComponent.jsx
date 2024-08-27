import React from 'react';
import { useTranslation } from 'react-i18next';

const ExampleComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
    </div>
  );
};

export default ExampleComponent;
