import './App.css';
import React from "react";
import { Trans, useTranslation } from "react-i18next";

function App() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("cs")}>CZ</button>
        <button onClick={() => changeLanguage("sk")}>SK</button>
        <Trans i18nKey="components.calendar">
        Defaultni text
        </Trans>
        <p>{t("components.calendar")}</p>
      </header>
    </div>
  );
}

export default App;
