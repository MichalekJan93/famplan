import React, { useEffect, useState } from "react";

import MenuAppView from "./MenuAppView/MenuAppView";
import HeaderAppView from "./HeaderAppView/HeaderAppView";
import Calendar from "./Calendar/Calendar";
import Dashboard from "./Dashboard/Dashboard";
import FamilyPlans from "./FamilyPlans/FamilyPlans";
import ShoppingList from "./ShoppingList/ShoppingList";

import "./AppView.css";
import { useTranslation } from "react-i18next";

const AppView = ({ showComponent }) => {
  const { t } = useTranslation();

  const [component, setComponent] = useState(<Dashboard />);
  const [title, setTitle] = useState(t("components.dashboard"));

  useEffect(() => {
    if (showComponent === "Dashboard") {
      setComponent(<Dashboard />);
      setTitle(t("components.dashboard"))
    } else if (showComponent === "Calendar") {
        setComponent(<Calendar />);
        setTitle(t("components.calendar"))
    } else if (showComponent === "FamilyPlans") {
        setComponent(<FamilyPlans />);
        setTitle(t("components.familyPlans"))
    } else if (showComponent === "ShoppingList") {
        setComponent(<ShoppingList />);
        setTitle(t("components.shoppingList"))
    } else {
        return;
    }
  }, [showComponent, t]);

  return (
    <div className="app-view anop">
      <MenuAppView />
      <HeaderAppView title={title} />
      {component}
    </div>
  );
};

export default AppView;
