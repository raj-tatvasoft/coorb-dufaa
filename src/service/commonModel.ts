export interface Variable {
  id: string;
  tokenId: number;
  i18nName: string;
  type: number;
  comboListName: string;
  required: number;
  hidden: number;
  readOnly: number;
  i18nGroupName: string;
  mimeType: string;
  jdbcType: number;
  auditable: number;
  exitClassId: string;
  exitClassDataId: string;
  instanceId: string;
  textValue: string;
  numericValue: string | number;
  displayOrder: number;
}

export interface IGenericFieldProps extends Partial<Variable> {
  lbl?: string;
  name: string;

  hideHelp?: boolean;
  placeholder?: string;
  fieldType?: "text" | "textarea" | "password";
  variant?: "text" | "outlined" | "contained";
  valRegex?: RegExp;
  options?: { value: string | number; label: string | number }[];
  hideClr?: boolean;
  fetchOpt?: boolean;
  startIcon?: string;
  endIcon?: string;
  variableStyle?: any;
  className?: string;
  showLbl?: boolean;
}

export interface IObject {
  [key: string]: any;
}

export interface ISelectOpt {
  value: string | number;
  label: string | number;
}
