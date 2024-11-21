import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";

const LabelField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, lbl, variableStyle } = props;

  return (
    <div className="fieldWrapper">
      {variableStyle?.htmlLabel ? (
        <div dangerouslySetInnerHTML={{ __html: variableStyle?.htmlLabel }} />
      ) : (
        <label>{t(lbl ? lbl : name)}</label>
      )}
    </div>
  );
};

export default LabelField;
