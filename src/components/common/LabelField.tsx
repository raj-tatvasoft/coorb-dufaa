import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";
import { useField } from "formik";

const LabelField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, lbl, variableStyle } = props;
  const [field] = useField(name);

  return (
    <div className="fieldWrapper">
      {!variableStyle?.hideLabel && <label>{t(lbl ? lbl : name)}</label>}
      {variableStyle?.isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: field.value }}></div>
      ) : (
        <>{field.value}</>
      )}
    </div>
  );
};

export default LabelField;
