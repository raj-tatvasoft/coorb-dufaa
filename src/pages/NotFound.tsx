import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="notFound">
      <h4>{t("notFound")}</h4>
    </div>
  );
};
